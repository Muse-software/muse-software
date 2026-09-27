import assert from 'node:assert/strict';
import {mkdirSync, writeFileSync} from 'node:fs';
import AxeBuilder from '@axe-core/playwright';
import {launchBrowser} from './browser-runtime.mjs';

const base=(process.env.MUSE_TEST_URL||'http://127.0.0.1:3103').replace(/\/$/,'');
const out='test-results/public';mkdirSync(out,{recursive:true});
const browser=await launchBrowser();const results=[];
try {
 if(!process.argv.includes('--secondary-only'))for(const locale of ['en','ar'])for(const width of [320,390,1440]){
  const context=await browser.newContext({viewport:{width,height:900},reducedMotion:'reduce'});
  const page=await context.newPage();const errors=[],mutations=[];
  page.on('pageerror',e=>errors.push(e.message));
  await context.route('**/*',r=>{if(!['GET','HEAD','OPTIONS'].includes(r.request().method())){mutations.push(r.request().url());return r.abort();}return r.continue();});
  // Inspect user-activated external handoff without opening an app or sending anything.
  await page.addInitScript(()=>document.addEventListener('click',e=>{
   const a=e.target instanceof Element?e.target.closest('a'):null;
   if(a&&(a.href.startsWith('mailto:')||a.href.startsWith('https://wa.me/'))){e.preventDefault();document.documentElement.dataset.testHandoff=a.href;}
  },true));
  assert.equal((await page.goto(`${base}/${locale}`)).status(),200);await page.locator("main h1").waitFor();await page.evaluate(()=>document.fonts.ready);
  const overflow=async()=>assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,'horizontal overflow');await overflow();
  assert.equal(await page.locator('main h1').count(),1);assert.equal(await page.locator('form,input[type=email]').count(),0);
  const hero=page.locator('.mx-email-cta a');assert.equal(await hero.getAttribute('href'),`/${locale}/start`);
  if(locale==='ar')assert(await hero.evaluate(e=>getComputedStyle(e).fontFamily.includes('IBM')&&parseFloat(getComputedStyle(e).fontSize)>=18));
  await page.screenshot({path:`${out}/${locale}-${width}-hero.png`});
  const choices=page.locator('.mx-choices .mx-choice');await choices.nth(2).click();await page.waitForFunction(()=>document.querySelectorAll('.mx-choice')[2]?.getAttribute('aria-pressed')==='true');
  assert.equal(decodeURIComponent(await page.locator('.mx-goal-next a').getAttribute('href')),`/${locale}/start?intent=ai`);
  const faq=page.locator('.mx-faq-list summary').nth(1);await faq.press('Enter');assert.equal(await faq.locator('..').getAttribute('open'),'');await faq.press('Enter');assert.equal(await faq.locator('..').getAttribute('open'),null);
  if(width<800){await page.locator('.dir-menu-toggle').click();assert.equal(await page.locator('main').getAttribute('inert'),'');await page.keyboard.press('Escape');assert.equal(await page.locator('.dir-menu-toggle').getAttribute('aria-expanded'),'false');}
  const social=page.locator('.dir-socials a');assert.equal(await social.count(),3);
  assert.deepEqual(await social.evaluateAll(xs=>xs.map(x=>x.href)),['https://www.instagram.com/muse_software/','https://www.linkedin.com/company/musesoftware/','https://x.com/muse_software']);
  await page.locator('.dir-whatsapp').click();assert.equal(await page.locator('html').getAttribute('data-test-handoff'),'https://wa.me/966592731040');
  await page.locator('.dir-footer').screenshot({path:`${out}/${locale}-${width}-footer.png`});
  const axe=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();assert.deepEqual(axe.violations.map(x=>({id:x.id,nodes:x.nodes.map(n=>n.target)})),[]);
  await page.locator('.mx-services-head>a').click();await page.waitForURL(`${base}/${locale}/services`);await page.locator('main h1').waitFor();await overflow();
  assert.equal(await page.locator('.dir-page-cta a').getAttribute('href'),`/${locale}/start`);
  await page.goto(`${base}/${locale}/start`);await page.locator('.inquiry-layout[data-ready=true]').waitFor();await overflow();assert.equal(await page.locator('.intent-options input').count(),4);
  await page.screenshot({path:`${out}/${locale}-${width}-contact.png`});
  assert.deepEqual(errors,[]);assert.deepEqual(mutations,[]);results.push({locale,width,pass:true});console.log(`PASS ${locale} ${width}: enquiry entry/WhatsApp, social, chooser, FAQ, menu, form shell, accessibility`);await context.close();
 }
 const context=await browser.newContext();
 for(const path of ['/en/archive','/ar/archive/signal','/en/newsletter','/ar/newsletter'])assert.equal((await context.request.get(`${base}${path}`)).status(),404,path);
 for(const path of ['/api/leads','/api/get-started','/api/contact','/api/subscribe'])assert([404,405].includes((await context.request.post(`${base}${path}`,{data:{}})).status()),`Retired endpoint accepted request: ${path}`);
 const sitemap=await(await context.request.get(`${base}/sitemap.xml`)).text();assert(!/archive|newsletter|directions/.test(sitemap));
 const page=await context.newPage();const secondaryErrors=[];page.on('pageerror',e=>secondaryErrors.push(e.message));
 for(const locale of ['en','ar']){
  for(const path of ['about','careers','careers/business-developer','privacy','terms']){
   assert.equal((await page.goto(`${base}/${locale}/${path}`)).status(),200,path);await page.locator('main h1').waitFor();
   assert.equal(await page.locator('form').count(),0);assert.equal(await page.locator('html').getAttribute('lang'),locale);
  }
  await page.goto(`${base}/${locale}/services`);const detail=page.locator(`main a[href^="/${locale}/services/"]`).first();const detailUrl=await detail.getAttribute('href');await detail.click();await page.waitForURL(`${base}${detailUrl}`);await page.locator('main h1').waitFor();assert.match(new URL(page.url()).pathname,/services\/[^/]+$/);
  for(const [from,to] of [['contact','start'],['directions/mosaic','']]){await page.goto(`${base}/${locale}/${from}`);assert.equal(new URL(page.url()).pathname,`/${locale}${to?'/'+to:''}`);}
  await page.goto(`${base}/${locale}/start`);await page.getByRole('link',{name:locale==='en'?'التبديل إلى العربية':'Switch to English'}).first().click();await page.waitForURL(`${base}/${locale==='en'?'ar':'en'}/start`);assert.equal(await page.locator('html').getAttribute('dir'),locale==='en'?'rtl':'ltr');
 }
 assert.deepEqual(secondaryErrors,[]);
 const og=await context.request.get(`${base}/opengraph-image`);assert.equal(og.status(),200);assert.match(og.headers()['content-type'],/image\/png/);
 console.log('PASS secondary pages, service detail, language switch, redirects, social image, retired routes/APIs and public sitemap');await context.close();
}finally{writeFileSync(`${out}/${process.argv.includes('--secondary-only')?'secondary-results':'results'}.json`,JSON.stringify(results,null,2));await browser.close();}
