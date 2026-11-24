/* НӘТИЖЕЛЕР — мұғалім портфолиосы. Жаңа сурет қосу үшін RES тізіміне жол қосыңыз. */
(function(){
const RES=[
 ['r01','lesson','«Нефронның құрылысы мен қызметі» сабағы — реабсорбция кезеңі'],
 ['r02','lesson','Топтық жұмыс: «Дәрігерлер» тобы PISA тапсырмасын қорғайды'],
 ['r15','lesson','«Адам қаңқасының құрылысы. Тірек-қимыл жүйесі» сабағы'],
 ['r16','lesson','Цифрлық құралдармен сабақ: оқушылар ноутбукпен жұмыс істейді'],
 ['r17','lesson','Сабақтан кейінгі естелік: «ЖИ тапсырмасы»'],
 ['r08','lesson','LearningApps интерактивті тапсырмасы: «Қай теңге қай жылы шықты?»'],
 ['r07','award','«Практикалық жұмыстар – 2026» аудандық байқауы — Мақтау қағаздары'],
 ['r09','award','Қазалы аудандық білім бөлімі, Тамыз конференциясы — Алғыс хат'],
 ['r14','award','Диплом'],
 ['r05','award','Алғыс хат табыстау сәті'],
 ['r13','award','Ата-аналарды педагогикалық қолдау орталығы — Алғыс хат'],
 ['r10','award','Сертификат табыстау салтанаты'],
 ['r11','award','Сертификат'],
 ['r04','ai','«Жасанды интеллект мүмкіндіктері»: иттің ішкі құрылысы инфографикасы'],
 ['r03','ai','ЖИ көмегімен жасалған бейне: биология сабағы'],
 ['r06','ai','ЖИ бейне: зертханалық зерттеулер мен биотехнология'],
 ['r12','ai','ЖИ арт-QR визиткалары']];
const CAT={all:'Барлығы',lesson:'📚 Сабақтан сәттер',award:'🏅 Марапаттар',ai:'🤖 ЖИ шығармашылығы'};
const box=document.querySelector('#resGal'),fl=document.querySelector('#resFilt');if(!box)return;
const cnt=k=>RES.filter(r=>r[1]===k).length;
document.querySelector('#resStats').innerHTML=[['award','Марапат'],['lesson','Сабақтан сәт'],['ai','ЖИ жұмысы']].map(([k,l])=>`<div><b>${cnt(k)}</b><span>${l}</span></div>`).join('');
fl.innerHTML=Object.entries(CAT).map(([k,l],i)=>`<button class="${i?'':'on'}" data-k="${k}">${l}${k==='all'?'':` <small>${cnt(k)}</small>`}</button>`).join('');
let list=RES;
function draw(k){list=k==='all'?RES:RES.filter(r=>r[1]===k);box.innerHTML=list.map((r,i)=>`<figure class="resi" data-i="${i}"><img src="img/res/t${r[0].slice(1)}.jpg" alt="${r[2]}" loading="lazy"><figcaption><span class="rescat c-${r[1]}">${CAT[r[1]]}</span>${r[2]}</figcaption></figure>`).join('');
 box.querySelectorAll('.resi').forEach(f=>f.onclick=()=>open(+f.dataset.i))}
fl.querySelectorAll('button').forEach(b=>b.onclick=()=>{fl.querySelectorAll('button').forEach(x=>x.classList.toggle('on',x===b));draw(b.dataset.k)});
const lb=document.querySelector('#resLb');let at=0;
function open(i){at=(i+list.length)%list.length;const r=list[at];lb.querySelector('img').src=`img/res/${r[0]}.jpg`;lb.querySelector('p').innerHTML=`<span class="rescat c-${r[1]}">${CAT[r[1]]}</span> ${r[2]} <small>${at+1} / ${list.length}</small>`;lb.classList.add('on')}
lb.querySelector('.lbx').onclick=()=>lb.classList.remove('on');lb.onclick=e=>{if(e.target===lb)lb.classList.remove('on')};
lb.querySelector('.lbp').onclick=e=>{e.stopPropagation();open(at-1)};lb.querySelector('.lbn').onclick=e=>{e.stopPropagation();open(at+1)};
addEventListener('keydown',e=>{if(!lb.classList.contains('on'))return;if(e.key==='Escape')lb.classList.remove('on');if(e.key==='ArrowLeft')open(at-1);if(e.key==='ArrowRight')open(at+1)});
draw('all');
})();
