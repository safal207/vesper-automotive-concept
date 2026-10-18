import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import * as study from '../dist/study.js';

const html=fs.readFileSync(new URL('../dist/index.html',import.meta.url),'utf8');
const elements=[];
class Element {
  constructor(attrs={}){this.attrs=attrs;this.style={};this.dataset={};this.listeners={};this.textContent='';this.classList={add(){},remove(){}};for(const [key,value]of Object.entries(attrs)){if(key.startsWith('data-'))this.dataset[key.slice(5).replace(/-([a-z])/g,(_,x)=>x.toUpperCase())]=value;}}
  setAttribute(key,value){this.attrs[key]=String(value)}
  addEventListener(event,fn){this.listeners[event]=fn}
  click(){this.listeners.click?.()}
}
for(const match of html.matchAll(/<[a-z][^>]*>/g)){
  const attrs=Object.fromEntries([...match[0].matchAll(/([\w-]+)="([^"]*)"/g)].map(m=>[m[1],m[2]]));
  elements.push(new Element(attrs));
}
const one=id=>{const element=elements.find(e=>e.attrs.id===id);assert.ok(element,`Missing #${id}`);return element;};
const all=key=>elements.filter(e=>e.attrs[key]!==undefined);
const button=(key,value)=>all(key).find(e=>e.attrs[key]===value);
let blob,download;
const context=vm.createContext({...study,Blob,URL:{createObjectURL(value){blob=value;return 'blob:study'},revokeObjectURL(){}},setTimeout(){},document:{
  querySelector(selector){assert.ok(selector.startsWith('#'));return one(selector.slice(1))},
  querySelectorAll(selector){return all(selector.slice(1,-1))},
  createElement(tag){assert.equal(tag,'a');download=new Element();return download;}
}});
const app=fs.readFileSync(new URL('../dist/app.js',import.meta.url),'utf8');
assert.match(app,/from '\.\/study\.js\?v=3'/);
vm.runInContext(app.replace(/^import [^\n]+\n/,''),context);
const unchanged=JSON.stringify(one('process-original').style);
assert.equal(one('process-result').style.filter,'none');
assert.equal(one('process-result').style.transform,'scale(1)');
button('data-process-step','color').click();
assert.equal(one('process-result').style.filter,study.finishes.bronze.filter);
assert.equal(one('process-result').style.transform,'scale(1)');
assert.equal(button('data-finish','bronze').attrs['aria-pressed'],'true');
assert.equal(one('process-filter').textContent,study.finishes.bronze.filter);
button('data-process-step','detail').click();
assert.equal(one('process-result').style.transform,'scale(2.05)');
assert.equal(one('process-result').style.transformOrigin,'83% 54%');
assert.equal(one('detail-image').style.transform,'scale(2.05)');
assert.equal(button('data-view','light').attrs['aria-pressed'],'true');
button('data-finish','cool').click();
assert.equal(one('process-result').style.filter,study.finishes.cool.filter);
assert.equal(one('process-result').style.transform,'scale(2.05)');
assert.ok(all('data-process-step').every(e=>e.attrs['aria-pressed']==='false'));
assert.equal(one('process-title').textContent,'Ваш вариант / из ателье');
button('data-view','canopy').click();
assert.equal(one('process-result').style.transform,'scale(2.25)');
assert.equal(one('process-result').style.transformOrigin,'61% 32%');
for(const id of ['save','process-save']){
  one(id).click();
  const data=JSON.parse(await blob.text());
  assert.equal(data.cssFilter,study.finishes.cool.filter);
  assert.equal(data.scale,2.25);
  assert.equal(data.transformOrigin,'61% 32%');
  assert.equal(data.sourceImage,'assets/vesper-hero.webp');
  assert.equal(download.download,'vesper-my-study.json');
}
button('data-process-step','source').click();
assert.equal(one('process-result').style.filter,'none');
assert.equal(one('process-result').style.transform,'scale(1)');
assert.equal(button('data-view','silhouette').attrs['aria-pressed'],'true');
assert.equal(JSON.stringify(one('process-original').style),unchanged,'Original image must remain unchanged');
assert.throws(()=>study.stateAtStep('missing'),RangeError);
console.log('PASS: source → color → detail → custom → source; unchanged original; synchronized atelier; exact exported parameters.');
console.log('LIMIT: DOM harness checks behavior, not browser pixels or CSS rendering.');
