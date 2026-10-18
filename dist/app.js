import {finishes,views,steps,stateAtStep,createStudyExport} from './study.js?v=3';

let finish='silver',view='silhouette',activeStep='source';
const q=s=>document.querySelector(s);

function update(){
  const f=finishes[finish],v=views[view];
  q('#car').style.filter=f.filter;
  for(const selector of ['#detail-image','#process-result']){
    const picture=q(selector);
    picture.style.filter=f.filter;
    picture.style.transform=`scale(${v.scale})`;
    picture.style.transformOrigin=v.origin;
  }
  q('#finish-name').textContent=f.name;
  q('#finish-description').textContent=f.description;
  q('#view-label').textContent=v.title;
  q('#detail-copy').textContent=v.copy;
  document.querySelectorAll('[data-finish]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.finish===finish));
  document.querySelectorAll('[data-view]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.view===view));
  document.querySelectorAll('[data-process-step]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.processStep===activeStep));
  q('#process-title').textContent=activeStep?steps[activeStep].title:'Ваш вариант / из ателье';
  q('#process-copy').textContent=activeStep?steps[activeStep].copy:'Сравните свой вариант справа с неизменным исходником слева. Цвет и кадрирование синхронизированы с ателье; параметры ниже показывают точные изменения.';
  q('#process-filter').textContent=f.filter;
  q('#process-scale').textContent=`${v.scale.toLocaleString('ru-RU')}×`;
  q('#process-origin').textContent=v.origin;
  q('#result-label').textContent=`${f.name} · ${v.title.slice(5)}`;
  q('#process-result').alt=`Текущий результат: ${f.name}, ${v.title.slice(5)}, масштаб ${v.scale}`;
}

document.querySelectorAll('[data-finish]').forEach(b=>b.addEventListener('click',()=>{finish=b.dataset.finish;activeStep=null;update()}));
document.querySelectorAll('[data-view]').forEach(b=>b.addEventListener('click',()=>{view=b.dataset.view;activeStep=null;update()}));
document.querySelectorAll('[data-process-step]').forEach(b=>b.addEventListener('click',()=>{
  activeStep=b.dataset.processStep;
  ({finish,view}=stateAtStep(activeStep));
  update();
}));

function save(){
  const u=URL.createObjectURL(new Blob([JSON.stringify(createStudyExport(finish,view),null,2)],{type:'application/json'}));
  const a=document.createElement('a');a.href=u;a.download='vesper-my-study.json';a.click();
  setTimeout(()=>URL.revokeObjectURL(u),1500);
  q('#notice').textContent='Настройки этюда сохранены в JSON';q('#notice').classList.add('show');
  setTimeout(()=>q('#notice').classList.remove('show'),3500);
}
q('#save').addEventListener('click',save);
q('#process-save').addEventListener('click',save);
update();
