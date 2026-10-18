export const finishes={silver:{name:'Champagne silver',description:'Тёплые отражения на серебристой поверхности.',filter:'none'},bronze:{name:'Satin bronze',description:'Медные полутона и мягкий закатный свет.',filter:'sepia(.7) saturate(.85) brightness(.88)'},graphite:{name:'Obsidian graphite',description:'Глубокий графит с тонкой линией отражений.',filter:'grayscale(.85) brightness(.65) contrast(1.15)'},cool:{name:'Glacier metal',description:'Холодный металл в спокойном голубом свете.',filter:'sepia(.16) hue-rotate(160deg) saturate(.55)'}};
export const views={silhouette:{title:'01 / Общий силуэт',scale:1,origin:'70% 55%',copy:'Низкая линия крыши и широкие задние плечи соединены одним непрерывным объёмом.'},canopy:{title:'02 / Стеклянная крыша',scale:2.25,origin:'61% 32%',copy:'Стеклянная поверхность продолжает линию кузова. Визуальный ритм сохраняется от передней стойки до задней кромки.'},light:{title:'03 / Световая подпись',scale:2.05,origin:'83% 54%',copy:'Янтарная полоса связывает задние плечи и подчёркивает ширину. Один акцент собирает всю композицию.'}};
export const steps={
  source:{finish:'silver',view:'silhouette',title:'01 / Исходный рендер',copy:'Справа — тот же исходник без обработки. Сравните общий силуэт, затем нажмите «Цвет»: изменятся оттенок и яркость, а композиция останется прежней.'},
  color:{finish:'bronze',view:'silhouette',title:'02 / Цветовой этюд',copy:'Добавили сепию, уменьшили насыщенность и яркость. Геометрия автомобиля не меняется. Переключайте покрытия в ателье, чтобы сравнить другие варианты.'},
  detail:{finish:'bronze',view:'light',title:'03 / Акцент на детали',copy:'Сохранили цветовой этюд и приблизили световую подпись в 2,05 раза. Это кадрирование одного изображения. Вернитесь к исходнику, чтобы увидеть, откуда взят фрагмент.'}
};
export function stateAtStep(step){const selected=steps[step];if(!selected)throw new RangeError('Unknown study step');return {finish:selected.finish,view:selected.view};}
export function createStudyExport(finish,view){
  const f=finishes[finish],v=views[view];
  if(!f||!v)throw new RangeError('Unknown study selection');
  return {project:'VESPER / 01',type:'fictional visual study',finish:f.name,detail:v.title,cssFilter:f.filter,scale:v.scale,transformOrigin:v.origin,sourceImage:'assets/vesper-hero.webp',comparisonAspectRatio:'1672 / 941',source:'https://github.com/safal207/vesper-automotive-concept'};
}
