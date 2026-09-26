export default function MaterialStudy({form="mark"}:{form?:"mark"|"website"|"product"|"workflow"}) {
    const filled = (x:number,y:number) => {
      if(form === "website") return x===0 || x===7 || y===0 || y===7 || y===2 || (y>3 && x<4);
      if(form === "workflow") return (x<3&&y<3) || (x>2&&x<6&&y>2&&y<6) || (x>5&&y>5);
      if(form === "product") return Math.abs(x-3.5)+Math.abs(y-3.5)<=4 && Math.abs(x-3.5)+Math.abs(y-3.5)>=2;
      return x<2 || x>5 || (y<4 && (x===y+1 || x===6-y));
    };
    return <div className={`material-study study-mosaic study-mosaic-${form}`} aria-hidden="true"><svg className="mx-inner-mark" viewBox="0 0 160 160" fill="currentColor">{Array.from({length:64},(_,i)=>{const x=i%8,y=Math.floor(i/8);return filled(x,y) ? <rect key={i} x={x*20+1} y={y*20+1} width="17" height="17" opacity={.55+((x*7+y*3)%5)/10}/> : null;})}</svg></div>;
}
