import assert from 'node:assert/strict';
import {mkdirSync} from 'node:fs';
import {launchBrowser} from './browser-runtime.mjs';
const base=process.env.MUSE_TEST_URL || 'http://127.0.0.1:3103';
const browser=await launchBrowser();mkdirSync('test-results/swipe',{recursive:true});
try {
 for(const locale of ['en','ar']) for(const width of [320,390]) {
  const context=await browser.newContext({viewport:{width,height:900},hasTouch:true,isMobile:true,reducedMotion:'reduce'});
  const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.addInitScript(()=>{window.handoffs=[];document.addEventListener('click',e=>{const a=e.target.closest?.('a');if(a&&(a.href.startsWith('mailto:')||new URL(a.href).pathname.endsWith('/start'))){e.preventDefault();window.handoffs.push(a.href)};},true)});
  await page.goto(`${base}/${locale}`);const panel=page.locator('.mx-intent-panel');await panel.scrollIntoViewIfNeeded();
  const cdp=await context.newCDPSession(page);
  const active=()=>page.locator('.mx-choice').evaluateAll(items=>items.findIndex(i=>i.getAttribute('aria-pressed')==='true'));
  async function drag(dx,dy=0,target=panel){
   await target.scrollIntoViewIfNeeded();const r=await target.boundingBox();const x=r.x+r.width/2-dx/2,y=r.y+r.height/2-dy/2;
   await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x,y,id:1}]});
   for(let i=1;i<=8;i++) await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:x+dx*i/8,y:y+dy*i/8,id:1}]});
   await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});
  }
  const forward=locale==='ar'?140:-140;
  await drag(-forward);assert.equal(await active(),0,'start boundary');
  await drag(forward);assert.equal(await active(),1,'swipe advances');
  await drag(forward);assert.equal(await active(),2,'second swipe advances');
  assert.equal(await page.locator('.mx-goal-next a').getAttribute('href'),`/${locale}/start?intent=ai`);
  await drag(forward);assert.equal(await active(),2,'end boundary');
  await drag(-forward);assert.equal(await active(),1,'reverse swipe');
  await page.locator('.mx-choice').first().tap();assert.equal(await active(),0,'tap immediately after swipe');
  await drag(forward,0,page.locator('.mx-choices'));assert.equal(await active(),1,'swipe across selector without stray tap');
  await drag(forward,0,page.locator('.mx-goal-next a'));assert.equal(await active(),2,'swipe across CTA');assert.deepEqual(await page.evaluate(()=>window.handoffs),[],'swipe must not follow CTA');
  await drag(-20);assert.equal(await active(),2,'short drag ignored');
  await panel.scrollIntoViewIfNeeded();const before=await page.evaluate(()=>scrollY);await drag(0,-120);assert.equal(await active(),2,'vertical gesture does not select');assert((await page.evaluate(()=>scrollY))>before+30,'native vertical scroll remains');
  await panel.scrollIntoViewIfNeeded();const r=await panel.boundingBox();await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:r.x+r.width/2,y:r.y+100,id:1}]});await cdp.send('Input.dispatchTouchEvent',{type:'touchCancel',touchPoints:[]});assert.equal(await active(),2,'cancelled gesture ignored');
  await page.locator('.mx-choice').first().tap();assert.equal(await active(),0);
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
  assert.deepEqual(errors,[]);await panel.screenshot({path:`test-results/swipe/${locale}-${width}.png`});
  console.log(`PASS ${locale} ${width}: swipe both ways, boundaries, selector/CTA gestures, taps, scroll, cancellation`);await context.close();
 }
} finally {await browser.close();}
