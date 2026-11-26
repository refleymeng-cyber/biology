// 9-сынып биология зертханалық жұмыстары (3D)
import {pourMany,dripMany,rowTubes,clock,tbl,xs} from './lab3d_defs.js';
import {chart,eyeV,microSteps,micro,mkSlide,device,sign,rng,r1} from './lab3d_defs2.js';

/* ---------- көмекшілер ---------- */
function panel(html){const el=document.createElement('div');el.className='l3panel';el.innerHTML=html;document.querySelector('#l3view').appendChild(el);return el}
// уақыт бойынша санау (тыныс, пульс): оқушы әр соққыда батырманы басады
function countTask(A,{title,emoji,per15,onBeat}){return new Promise(res=>{const auto=!A.LB.manual;const P=panel(`<b>${title}</b><div class="cnt"><span class="ct">15</span> с</div><div class="cv">Саналды: <b>0</b></div><button class="cb">${emoji} +1</button><small>Әр ${emoji==='❤'?'соққыда':'дем алғанда'} батырманы бас</small>`);let n=0,left=15,beat=0;
 const b=P.querySelector('.cb');b.onclick=()=>{n++;P.querySelector('.cv b').textContent=n;b.classList.add('hit');setTimeout(()=>b.classList.remove('hit'),120)};
 const per=15/per15;let tb=0;const f=(t,dt)=>{left-=dt*(auto?6:1);tb+=dt*(auto?6:1);while(tb>=per){tb-=per;beat++;onBeat&&onBeat();if(auto){n++}}P.querySelector('.ct').textContent=Math.max(0,Math.ceil(left));P.querySelector('.cv b').textContent=n;if(left<=0){A.LB.anim.splice(A.LB.anim.indexOf(f),1);P.remove();res({n,real:per15})}};A.LB.anim.push(f)})}
function holdTask(A,{title,btn,onTick,until}){return new Promise(res=>{const P=panel(`<b>${title}</b><button class="cb">${btn}</button><small>Батырманы басып тұр</small>`);const b=P.querySelector('.cb');let on=!A.LB.manual;b.onpointerdown=e=>{e.preventDefault();on=true;b.classList.add('hit')};b.onpointerup=b.onpointerleave=()=>{on=false;b.classList.remove('hit')};
 const f=(t,dt)=>{if(on)onTick(dt);if(until()){A.LB.anim.splice(A.LB.anim.indexOf(f),1);P.remove();res()}};A.LB.anim.push(f)})}
const grp=(A,...m)=>{const g=new A.THREE.Group();m.forEach(x=>g.add(x));return g};
const at=(m,x,y,z)=>{m.position.set(x,y,z);return m};
function thermo(A,t0=20){const g=new A.THREE.Group();const gl=A.mesh(new A.THREE.CylinderGeometry(.045,.045,1.6,14),new A.THREE.MeshPhysicalMaterial({color:0xffffff,transparent:true,opacity:.35,roughness:.05}));gl.position.y=.8;gl.renderOrder=3;g.add(gl);const bulb=A.mesh(new A.THREE.SphereGeometry(.07,14,10),A.M(0xdc2626));g.add(bulb);
 const col=A.mesh(new A.THREE.CylinderGeometry(.02,.02,1,8),A.M(0xdc2626,{emissive:0x7f1d1d}));col.geometry.translate(0,.5,0);col.position.y=.05;g.add(col);const set=T=>{col.scale.y=Math.max(.02,(T-0)/40*1.45)};set(t0);return{obj:g,set,top:1.6}}
function human(A){const g=new A.THREE.Group();const skin=A.M(0xe8b48f,{roughness:.6}),shirt=A.M(0x16a34a,{roughness:.6}),pants=A.M(0x1e3a5f,{roughness:.7});
 const legs=new A.THREE.Group();[-1,1].forEach(s=>legs.add(at(A.mesh(new A.THREE.CapsuleGeometry(.1,.75,6,10),pants),s*.13,.48,0)));g.add(legs);
 const up=new A.THREE.Group();up.position.y=.95;g.add(up);const chest=A.mesh(new A.THREE.CapsuleGeometry(.24,.45,8,16),shirt);chest.position.y=.38;up.add(chest);[-1,1].forEach(s=>{const a=A.mesh(new A.THREE.CapsuleGeometry(.07,.6,6,10),shirt);a.position.set(s*.33,.35,0);a.rotation.z=s*.12;up.add(a)});
 const head=A.mesh(new A.THREE.SphereGeometry(.17,20,16),skin);head.position.y=.95;up.add(head);const hair=A.mesh(new A.THREE.SphereGeometry(.175,20,16,0,6.3,0,1.4),A.M(0x2b1d16));hair.position.y=.98;up.add(hair);
 [-1,1].forEach(s=>{const e=A.mesh(new A.THREE.SphereGeometry(.022,8,6),A.M(0x111111));e.position.set(s*.06,.97,.155);up.add(e)});return{obj:g,chest,up,legs}}

/* ===== 1. Микроскоп және жасуша ===== (L_onion қолданылады) */

/* ===== 2. Өсімдік және жануар жасушалары ===== */
function cellCmp(A){return eyeV(A,(c,W,st,R)=>{if(st.slide==='onp'){c.lineWidth=2.4;for(let r=-1;r<9;r++)for(let k=-1;k<6;k++){const x=k*90+(r%2?45:0)-20,y=r*48;c.fillStyle='rgba(230,205,150,.55)';c.strokeStyle='#8a5a1c';c.beginPath();c.rect(x+2,y+2,86,44);c.fill();c.stroke();c.fillStyle='rgba(240,230,205,.6)';c.beginPath();c.rect(x+12,y+9,60,30);c.fill();const nx=x+20+((r*5+k*3)%4)*14,ny=y+24;c.fillStyle='#6b3d0c';c.beginPath();c.ellipse(nx,ny,8,7,0,0,7);c.fill()}}
 else{for(let i=0;i<9;i++){const x=40+R()*340,y=40+R()*340,r=34+R()*10;c.fillStyle='rgba(147,197,253,.45)';c.strokeStyle='#1d4ed8';c.lineWidth=1.8;c.beginPath();for(let a=0;a<=12;a++){const t=a/12*6.28,rr=r*(.85+R()*.25);c[a?'lineTo':'moveTo'](x+Math.cos(t)*rr,y+Math.sin(t)*rr)}c.closePath();c.fill();c.stroke();c.fillStyle='#1e3a8a';c.beginPath();c.arc(x+(R()-.5)*8,y+(R()-.5)*8,8,0,7);c.fill()}}},{bg:st=>st.slide==='onp'?'#f6efdc':'#eef5ff'})}
const L_cells={id:'cells9',ic:'🔬',n:'Өсімдік және жануар жасушаларын салыстыру',gr:'9-сынып',goal:'Пияз қабығы мен ауыз қуысы эпителийінің препараттарын микроскоппен қарап, өсімдік және жануар жасушаларының ұқсастығы мен айырмашылығын анықтау.',eq:['Микроскоп','Пияз қабығы препараты (йод)','Ұрт эпителийі препараты (метилен көгі)'],view:[0,1,0,8,[0,.7,1]],
 setup(A){micro(A);mkSlide(A,'onp','Пияз қабығы',[.6,.05,1.6],0xd9a45b);mkSlide(A,'chk','Ұрт эпителийі',[1.8,.05,1.6],0x6366f1);A.LB.st={slide:'onp',mbase:2.4}},
 steps:[...microSteps({slide:'onp',draw:cellCmp,fz:56}).map((s,i)=>i===0?{...s,run:async A=>{Object.assign(A.LB.st,{slide:'onp',fz:56,focus:20,mag:10})}}:s),
 {t:'multi',text:'Пияз жасушасында не көрінеді?',options:['Тікбұрышты қалың жасуша қабырғасы','Ірі вакуоль','Ядро','Жасушалар бір-біріне тығыз жанасқан'],correct:[0,1,2,3]},
 {t:'drag',o:'chk',to:'micro',off:[.04,1.24,.15],r:.9,text:'Ұрт эпителийі препаратын үстелге ауыстыр',run:async A=>{await A.moveTo(A.LB.O.onp.obj,A.V3(.6,.05,1.6),.6,.5);A.LB.st.slide='chk';A.eyeRedraw()}},
 {t:'multi',text:'Тек өсімдік жасушасына тән белгілерді белгіле',options:['Целлюлозалы жасуша қабырғасы','Ірі орталық вакуоль','Пластидтер (хлоропласт)','Ядро','Цитоплазма','Плазмалық мембрана'],correct:[0,1,2]},
 {t:'choice',text:'Жануар жасушасының пішіні неге тұрақсыз (дөңгеленген)?',options:['Ядросы жоқ','Қатты жасуша қабырғасы жоқ, тек серпімді мембрана','Вакуолі көп','Хлоропласт бар'],correct:1,run:async A=>A.eyeClose()}],
 result:()=>tbl(['Белгі','Өсімдік жасушасы','Жануар жасушасы'],[['Жасуша қабырғасы','Бар (целлюлоза)','Жоқ'],['Вакуоль','Ірі, орталық','Ұсақ, уақытша'],['Пластидтер','Бар','Жоқ'],['Пішіні','Тұрақты (тікбұрыш)','Тұрақсыз'],['Қор заты','Крахмал','Гликоген'],['Ядро, мембрана, цитоплазма','Бар','Бар']]),
 obs:()=>'пияз жасушалары тікбұрышты, қалың қабырғалы, ірі вакуолі және йодпен боялған ядросы бар; эпителий жасушалары дөңгеленген, жұқа мембраналы, ортасында көк ядро',
 q:[['Өсімдік пен жануар жасушасына ортақ органоид:',['Хлоропласт','Митохондрия','Целлюлоза қабырғасы','Орталық вакуоль'],1,'Митохондрия барлық эукариоттарда бар.']]};

/* ===== 4. рН және фермент ===== */
const PH=[3,5,7,9],PHF=[.04,.2,.48,.24],PHC=[0xef4444,0xf59e0b,0x22c55e,0x3b82f6];
const L_ph={id:'ph9',ic:'🧪',n:'Ферменттердің белсенділігіне ортаның рН көрсеткішінің әсерін зерттеу',gr:'9-сынып',goal:'Картоп каталазасының H₂O₂-ны ыдырату белсенділігін рН 3, 5, 7, 9 буферлі ерітінділерде көбік биіктігі бойынша салыстыру.',eq:['4 пробирка','Буферлі ерітінділер (индикатормен)','H₂O₂ (3%)','Картоп сығындысы (каталаза)','Сызғыш'],view:[0,.9,.3,6,[0,.55,1]],
 setup(A){rowTubes(A,['h0','h1','h2','h3'],PH.map(p=>'рН '+p),0,0,PHC);['h0','h1','h2','h3'].forEach(n=>A.LB.O[n].liq.set(.2,0));A.add('h2o2',A.bottle('H₂O₂','3%',{color:0xeef8ff,ac:'#f472b6'}),'H₂O₂',[-2.6,0,-.6]);A.add('ext',A.beaker(.3,.55,{color:0xe9e3c2,level:.7}),'Картоп сығындысы',[2.6,0,-.6]);A.LB.O.ext.top=.55;A.LB.st={}},
 steps:[{t:'click',o:'h2o2',text:'Әр буферлі пробиркаға бірдей көлемде H₂O₂ құй',run:A=>pourMany(A,'h2o2',['h0','h1','h2','h3'],{to:.36})},
 {t:'click',o:'ext',text:'Әр пробиркаға 5 тамшыдан картоп сығындысын (каталаза) тамыз',run:A=>dripMany(A,'ext',['h0','h1','h2','h3'],{n:2,color:0xe9e3c2,onEach:async(n,i)=>{const T=A.LB.O[n];A.bubbles(T,{rate:4+PHF[i]*60,r:.018});await A.Foam(T).set(PHF[i],1.6)}})},
 {t:'wait',text:'2 минуттан кейін көбік биіктігін сызғышпен өлше',run:async A=>{await clock(A,'Реакция',2);A.data(tbl(['рН',...PH],[['Көбік, мм',...PHF.map(f=>Math.round(f*150))]])+chart([{pts:PH.map((p,i)=>[p,Math.round(PHF[i]*150)]),c:'#16a34a'}],{xl:'рН',yl:'Көбік биіктігі, мм',ymin:0,ymax:80}))}},
 {t:'input',text:'Каталазаның оптималды рН мәні қанша?',ans:7,tol:0},
 {t:'choice',text:'рН 3-те фермент белсенділігі неге күрт төмендеді?',options:['Субстрат таусылды','Қышқыл орта белсенді орталықтың құрылымын өзгертті (денатурация)','Температура төмендеді','Көбік тез жарылды'],correct:1}],
 result:()=>tbl(['рН','3','5','7','9'],[['Көбік, мм',...PHF.map(f=>Math.round(f*150))]])+chart([{pts:PH.map((p,i)=>[p,Math.round(PHF[i]*150)]),c:'#16a34a'}],{xl:'рН',yl:'мм',ymin:0,ymax:80}),
 obs:()=>'көбік биіктігі: рН 3 — 6 мм, рН 5 — 30 мм, рН 7 — 72 мм, рН 9 — 36 мм; ең жоғары белсенділік рН 7-де',
 q:[['Асқазан пепсинінің оптималды рН-ы шамамен:',['2','7','9','12'],0,'Әр ферменттің өз оптимумы бар.']]};

/* ===== 5. Амилазаның крахмалға әсері ===== */
const L_amst={id:'amst9',ic:'🍞',n:'Амилаза ферментінің крахмалға әсерін зерттеу',gr:'9-сынып',goal:'Сілекей амилазасының крахмалды мальтозаға дейін ыдыратуын йод және Бенедикт сынамалары арқылы дәлелдеу.',eq:['2 пробирка','1% крахмал','Сілекей','Су моншасы 37 °C','Тамшылатқыш тақта','Йод','Бенедикт реактиві'],view:[0,1,.2,7,[0,.6,1]],
 setup(A){rowTubes(A,['sA','sB'],['A: крахмал + су','B: крахмал + сілекей'],-1.6,.3);A.add('st',A.bottle('Крахмал','1%',{color:0xf4f6f8}),'Крахмал',[-4,0,-.7]);A.add('wat',A.bottle('H₂O','',{color:0xd6ecff}),'Су',[-4.4,0,.9]);A.add('sal',A.beaker(.25,.4,{color:0xf2f0e4,level:.6}),'Сілекей',[-.2,0,-1.1]);A.LB.O.sal.top=.4;
  A.add('bath',A.waterBath('37°C'),'Су моншасы 37 °C',[2.6,0,-.8]);A.add('iod',A.bottle('I₂','KI',{dark:1,color:0x8a4b0f,ac:'#fbbf24'}),'Йод',[4.6,0,1.2]);A.add('ben',A.bottle('Бенедикт','',{color:0x3a78d8,ac:'#38bdf8'}),'Бенедикт',[5.4,0,.4]);
  const tile=new A.THREE.Group();tile.add(A.mesh(new A.THREE.BoxGeometry(2,.08,.8),A.M(0xffffff,{roughness:.3})));const W=[];for(let r=0;r<2;r++)for(let k=0;k<5;k++){const w=A.mesh(new A.THREE.CylinderGeometry(.1,.1,.02,20),A.M(0xf1f5f9));w.position.set(-.8+k*.4,.05,-.2+r*.4);tile.add(w);W.push(w)}A.add('tile',{obj:tile},'Тамшылатқыш тақта (0–8 мин)',[1.4,.04,1.9]);A.LB.st={W}},
 steps:[{t:'click',o:'st',text:'Екі пробиркаға да 2 мл крахмал ерітіндісін құй',run:A=>pourMany(A,'st',['sA','sB'],{to:.25,color:0xf4f6f8})},
 {t:'click',o:'wat',text:'A пробиркаға 1 мл су қос (бақылау)',run:A=>A.drip('wat','sA',{n:2,color:0xd6ecff})},
 {t:'click',o:'sal',text:'B пробиркаға 1 мл сілекей қос',run:A=>A.drip('sal','sB',{n:2,color:0xf2f0e4})},
 {t:'click',o:'bath',text:'Пробиркаларды 37 °C су моншасына сал',run:async A=>{const p=A.wp(A.LB.O.bath.obj);await A.moveTo(A.LB.O.sA.obj,A.V3(p.x-.4,.15,p.z),.6,.6);await A.moveTo(A.LB.O.sB.obj,A.V3(p.x+.4,.15,p.z),.6,.6)}},
 {t:'wait',text:'Әр 2 минут сайын тамшыны йодпен тексер',run:async A=>{const W=A.LB.st.W;A.look(1.4,.4,1.9,3,[0,.9,.7]);const B=[0x1d1850,0x3b2a7a,0x8a4b6b,0xc27a3a,0xd8a24a];for(let k=0;k<5;k++){await Promise.all([A.tween(.35,q=>W[k].material.color.lerpColors(A.col(0xf1f5f9),A.col(0x1d1850),q)),A.tween(.35,q=>W[5+k].material.color.lerpColors(A.col(0xf1f5f9),A.col(B[k]),q))]);await A.wait(.15)}
  A.data(tbl(['Уақыт, мин','0','2','4','6','8'],[['A (су)','көк','көк','көк','көк','көк'],['B (сілекей)','көк','күлгін','қызғылт-қоңыр','сарғыш','сары']]))}},
 {t:'click',o:'ben',text:'Екі пробиркаға Бенедикт реактивін қосып, қыздыр',run:async A=>{await A.drip('ben','sA',{n:2,color:0x3a78d8});await A.drip('ben','sB',{n:2,color:0x3a78d8});await Promise.all([A.LB.O.sA.liq.color(0x5b8ee0,1),A.LB.O.sB.liq.color(0xd9862a,1.6),A.Precip(A.LB.O.sB,0xb8541f).set(.05,1.6)])}},
 {t:'choice',text:'B пробиркада Бенедикт реактиві қызғылт сары түс берді. Бұл нені дәлелдейді?',options:['Крахмал өзгермеді','Крахмал ыдырап, редуцирлеуші қант (мальтоза) түзілді','Ақуыз пайда болды','Йод қалды'],correct:1},
 {t:'choice',text:'Неліктен A пробирка қажет?',options:['Бақылау: крахмал судың әсерінен ыдырамайтынын көрсету','Әдемі болу үшін','Ферментті сақтау үшін','Қажет емес'],correct:0}],
 result:()=>tbl(['Сынама','A (су)','B (сілекей)'],[['Йод (8 мин)','Көк-қара — крахмал бар','Сары — крахмал жоқ'],['Бенедикт','Көк — қант жоқ','Қызғылт сары — мальтоза бар']]),
 obs:()=>'сілекей қосылған пробиркада йод түсі 8 минутта көктен сарыға ауысты, Бенедикт қызғылт сары тұнба берді; бақылауда йод көк, Бенедикт көк күйінде қалды',
 q:[['Амилаза крахмалды қандай затқа дейін ыдыратады?',['Глюкоза','Мальтоза','Сахароза','Фруктоза'],1,'Мальтоза — дисахарид.']]};

/* ===== 6. Мембрана арқылы тасымалдау (Висквинг түтігі) ===== */
const L_visk={id:'visk9',ic:'🫧',n:'Жасуша мембранасы арқылы заттардың тасымалдануын модельдеу',gr:'9-сынып',goal:'Диализдік (Висквинг) түтікті жасуша мембранасының моделі ретінде қолданып, кіші молекулалардың (йод, глюкоза) өтетінін, ірі молекулалардың (крахмал) өтпейтінін дәлелдеу.',eq:['Диализдік түтік','Крахмал + глюкоза ерітіндісі','Стакан, су','Йод','Бенедикт реактиві','Су моншасы'],view:[0,1,.2,7,[0,.6,1]],
 setup(A){const bk=A.beaker(.55,1,{color:0xd6ecff,level:.75});A.add('bk',bk,'Стакан (су)',[0,0,-.2]);const bag=new A.THREE.Group();const mem=A.mesh(new A.THREE.CylinderGeometry(.16,.16,.9,20,1,true),new A.THREE.MeshPhysicalMaterial({color:0xf5f0dc,transparent:true,opacity:.35,roughness:.4,side:2}));mem.position.y=.5;mem.renderOrder=3;bag.add(mem);const knot=A.mesh(new A.THREE.SphereGeometry(.07,10,8),A.M(0xe7dcc0));knot.position.y=.98;bag.add(knot);
  const BL=A.Liquid(bag,{r:.15,base:.06,hmax:.85,color:0xf7f7f2,level:0});A.add('bag',{obj:bag,liq:BL,top:.95},'Диализдік түтік',[-2.4,.02,1.2]);A.add('mix',A.bottle('Крахмал+','глюкоза',{color:0xf7f7f2}),'Крахмал + глюкоза',[-3.6,0,-.4]);A.add('iod',A.bottle('I₂','KI',{dark:1,color:0x8a4b0f,ac:'#fbbf24'}),'Йод',[1.6,0,-1.2]);
  A.add('tt',A.tube(),'Сынауық',[2.6,.04,1.2]);A.add('ben',A.bottle('Бенедикт','',{color:0x3a78d8,ac:'#38bdf8'}),'Бенедикт',[3.6,0,-.4]);A.LB.st={}},
 steps:[{t:'click',o:'mix',text:'Диализдік түтікке крахмал мен глюкоза ерітіндісін құй, ұшын байла',run:A=>A.pour('mix','bag',{to:.8,color:0xf7f7f2})},
 {t:'click',o:'iod',text:'Стакандағы суға йод ерітіндісін қос (сары-қоңыр түс)',run:async A=>{await A.drip('iod','bk',{n:3,color:0x8a4b0f});await A.LB.O.bk.liq.color(0xe6b45a,1.2)}},
 {t:'drag',o:'bag',to:'bk',off:[0,.05,0],r:.8,text:'Түтікті стаканға батыр'},
 {t:'wait',text:'20 минут күту',run:async A=>{await Promise.all([clock(A,'Диффузия',20),A.LB.O.bag.liq.color(0x1d1850,2.6)])}},
 {t:'click',o:'tt',text:'Стакандағы судан сынауыққа аздап алып, Бенедикт реактивімен тексер',run:async A=>{await A.drip('bk','tt',{n:3,color:0xe6b45a});await A.LB.O.tt.liq.set(.15,.5);await A.drip('ben','tt',{n:2,color:0x3a78d8});await A.LB.O.tt.liq.color(0xd9862a,1.6)}},
 {t:'multi',text:'Қай заттар мембрана моделі арқылы өтті?',options:['Йод (сырттан ішке)','Глюкоза (іштен сыртқа)','Крахмал','Су'],correct:[0,1,3]},
 {t:'choice',text:'Крахмал неге түтіктен шықпады?',options:['Ол еріген жоқ','Молекуласы ірі — мембрананың тесіктерінен өтпейді','Йод оны ұстап қалды','Түтік жабық'],correct:1}],
 result:()=>tbl(['Зат','Молекула өлшемі','Мембранадан өтті ме?','Дәлелі'],[['Йод','Кіші','Иә','Түтік ішіндегі ерітінді көк-қара түсті болды'],['Глюкоза','Кіші','Иә','Сырттағы су Бенедиктпен қызғылт сары түс берді'],['Крахмал','Ірі','Жоқ','Сырттағы су көгерген жоқ']]),
 obs:()=>'20 минуттан кейін түтіктің ішіндегі ерітінді көк-қара түске боялды, стакандағы су сары-қоңыр қалды; стакандағы су Бенедиктпен қызғылт сары түс берді',
 q:[['Бұл тәжірибе мембрананың қандай қасиетін көрсетеді?',['Толық өткізгіштік','Жартылай (таңдамалы) өткізгіштік','Өткізбейтіндік','Электр өткізгіштік'],1,'Кіші молекулалар өтеді, ірілері өтпейді.']]};

/* ===== 8. Транспирация (потометр) ===== */
const TR=[['Бөлме жағдайы',12],['Шам (жарық, жылу)',21],['Желдеткіш (жел)',28],['Полиэтилен қап (ылғал)',5]];
const L_trans={id:'trans9',ic:'🌱',n:'Өсімдіктердегі судың булануын (транспирацияны) зерттеу',gr:'9-сынып',goal:'Потометр көмегімен әртүрлі жағдайларда (жарық, жел, ылғалдылық) өсімдік өркенінің суды сіңіру (транспирация) жылдамдығын салыстыру.',eq:['Потометр','Өсімдік өркені','Шам','Желдеткіш','Полиэтилен қап','Секундомер'],view:[0,1.2,.2,7,[0,.4,1]],
 setup(A){const g=new A.THREE.Group();const cap=A.mesh(new A.THREE.CylinderGeometry(.03,.03,3,10),new A.THREE.MeshPhysicalMaterial({color:0xeaf6ff,transparent:true,opacity:.3,roughness:.05}));cap.rotation.z=Math.PI/2;cap.position.set(0,.3,.3);g.add(cap);const wat=A.mesh(new A.THREE.CylinderGeometry(.022,.022,3,8),A.M(0x9fd4ff,{transparent:true,opacity:.8}));wat.rotation.z=Math.PI/2;wat.position.copy(cap.position);g.add(wat);
  const bub=A.mesh(new A.THREE.SphereGeometry(.026,10,8),A.M(0xffffff,{roughness:.1}));bub.scale.x=1.8;bub.position.set(1.4,.3,.3);bub.visible=false;g.add(bub);const R=A.ruler(3);R.obj.rotation.z=-Math.PI/2;R.obj.position.set(-1.5,.2,.36);g.add(R.obj);
  const st=A.mesh(new A.THREE.CylinderGeometry(.05,.05,1.2,10),A.M(0xeaf6ff,{transparent:true,opacity:.35}));st.position.set(-1.6,.9,.3);g.add(st);const stem=A.mesh(new A.THREE.CylinderGeometry(.025,.03,1.4,8),A.M(0x3f7f26));stem.position.set(-1.6,2,.3);g.add(stem);
  for(let i=0;i<9;i++){const l=A.mesh(new A.THREE.SphereGeometry(.22,14,8),A.M(0x3aa64a,{roughness:.5,side:2}));l.scale.set(1,.12,.55);l.position.set(-1.6+(i%2?.24:-.24),1.6+i*.13,.3);l.rotation.z=(i%2?-1:1)*.5;g.add(l)}A.add('pot',{obj:g},'Потометр',[0,0,0]);A.LB.st={bub,rows:[]};
  A.add('lamp',A.lamp(),'Шам',[-4.2,0,.2]);const fan=new A.THREE.Group();const fb=A.mesh(new A.THREE.CylinderGeometry(.08,.12,1,10),A.M(0x334155));fb.position.y=.5;fan.add(fb);const bl=new A.THREE.Group();bl.position.set(0,1.05,0);for(let i=0;i<4;i++){const b=A.mesh(new A.THREE.BoxGeometry(.06,.4,.02),A.M(0x38bdf8));b.position.y=.2;const h=new A.THREE.Group();h.rotation.z=i*Math.PI/2;h.add(b);bl.add(h)}fan.add(bl);fan.rotation.y=Math.PI/2;A.add('fan',{obj:fan},'Желдеткіш',[-3.6,0,1.6]);A.LB.st.blade=bl;
  const bag=A.mesh(new A.THREE.ConeGeometry(.6,1.4,20,1,true),new A.THREE.MeshPhysicalMaterial({color:0xffffff,transparent:true,opacity:.25,side:2,roughness:.2}));bag.rotation.x=Math.PI;const bg=new A.THREE.Group();bg.add(bag);A.add('bag',{obj:bg},'Полиэтилен қап',[2.8,.7,1.6])},
 steps:(()=>{const run=i=>async A=>{const S=A.LB.st,b=S.bub;b.visible=true;b.position.x=1.4;const d=TR[i][1];await Promise.all([clock(A,TR[i][0]+' (5 мин)',5),A.tween(2.6,k=>b.position.x=1.4-d/100*k*3)]);S.rows.push([TR[i][0],d,r1(d/5)]);A.data(tbl(['Жағдай','5 мин ішінде, мм','мм/мин'],S.rows))};
 return[{t:'click',o:'pot',text:'Потометрдің капиллярына ауа көпіршігін енгіз, сызғыштың 0 белгісіне қой',run:async A=>{A.LB.st.bub.visible=true;A.look(0,.9,.3,4,[0,.3,1])}},
 {t:'wait',text:'Бөлме жағдайында 5 мин бойы көпіршіктің жылжуын өлше',run:run(0)},
 {t:'click',o:'lamp',text:'Шамды қосып, өлшеуді қайтала',run:async A=>{A.LB.O.lamp.on(1);await run(1)(A);A.LB.O.lamp.on(0)}},
 {t:'click',o:'fan',text:'Желдеткішті қосып, өлшеуді қайтала',run:async A=>{const f=(t,dt)=>A.LB.st.blade.rotation.z+=dt*20;A.LB.anim.push(f);await run(2)(A);A.LB.anim.splice(A.LB.anim.indexOf(f),1)}},
 {t:'click',o:'bag',text:'Өркенді полиэтилен қаппен жауып, өлшеуді қайтала',run:async A=>{await A.moveTo(A.LB.O.bag.obj,A.V3(-1.6,2.1,.3),.8,.6);await run(3)(A)}},
 {t:'input',text:'Желдеткіш кезіндегі транспирация жылдамдығы (мм/мин): 28 мм / 5 мин',ans:5.6,tol:.1,unit:'мм/мин'},
 {t:'choice',text:'Полиэтилен қап транспирацияны неге азайтты?',options:['Жарық азайды','Ауаның ылғалдылығы артып, су буының градиенті азайды','Температура төмендеді','Лептесіктер жабылды'],correct:1}]})(),
 result:()=>tbl(['Жағдай','мм / 5 мин','мм/мин'],TR.map(r=>[r[0],r[1],r1(r[1]/5)]))+chart([{pts:TR.map((r,i)=>[i,r[1]]),c:'#16a34a',bar:1}],{xl:'Жағдай',yl:'мм / 5 мин',xlab:['Бөлме','Шам','Жел','Қап'],ymin:0,ymax:32}),
 obs:()=>'көпіршік 5 минутта: бөлмеде 12 мм, шам астында 21 мм, желдеткішпен 28 мм, қаппен жапқанда 5 мм жылжыды',
 q:[['Транспирацияның өсімдік үшін маңызы:',['Суды және минералды заттарды жоғары көтеру, жапырақты салқындату','Фотосинтезді тоқтату','Тамырды өсіру','Гүлдеу'],0,'Сорғыш күш тудырады.']]};

/* ===== 10. Тыныс алуда энергияның бөлінуі ===== */
const L_therm={id:'therm9',ic:'🌡',n:'Тыныс алу кезінде энергияның бөлінуін модельдеу',gr:'9-сынып',goal:'Өніп келе жатқан және қайнатылған бұршақ дәндерін термостарда ұстап, тыныс алу кезінде жылу энергиясының бөлінуін дәлелдеу.',eq:['2 термос','Өніп келе жатқан бұршақ','Қайнатылған бұршақ','2 термометр','Мақта'],view:[0,1,.2,6.5,[0,.5,1]],
 setup(A){const mk=(n,l,x)=>{const T=A.beaker(.38,1.3,{color:0xffffff,level:0});const sh=A.mesh(new A.THREE.CylinderGeometry(.44,.44,1.32,24,1,true),A.M(n==='tA'?0x16a34a:0x0891b2,{side:2,roughness:.4}));sh.position.y=.66;T.obj.add(sh);A.add(n,T,l,[x,0,0])};mk('tA','A: өнген бұршақ',-1.1);mk('tB','B: қайнатылған бұршақ',1.1);
  const pile=(n,l,x,c)=>{const g=new A.THREE.Group();for(let i=0;i<24;i++){const b=A.blob(c,.06,i+3);b.position.set((Math.random()-.5)*.5,.06,(Math.random()-.5)*.4);g.add(b)}A.add(n,{obj:g},l,[x,0,2])};pile('pA','Өнген бұршақ',-1.6,0xc9b26a);pile('pB','Қайнатылған бұршақ',1.6,0xa8956a);
  A.add('thA',thermo(A),'Термометр A',[-3.2,0,-.6]);A.add('thB',thermo(A),'Термометр B',[3.2,0,-.6]);A.LB.st={}},
 steps:[...[['pA','tA','Өніп келе жатқан бұршақты A термосқа сал'],['pB','tB','Қайнатылған бұршақты B термосқа сал']].map(([p,t,txt])=>({t:'click',o:p,text:txt,run:async A=>{const g=A.LB.O[p].obj,q=A.wp(A.LB.O[t].obj);await A.moveTo(g,A.V3(q.x,1.6,q.z),.6,.5);g.scale.setScalar(.7);await A.moveTo(g,A.V3(q.x,.1,q.z),.5);A.LB.O[t].liq.set(.6,.3);A.LB.O[t].liq.m.color.set(0xc9b26a)}})),
 ...[['thA','tA'],['thB','tB']].map(([th,t])=>({t:'click',o:th,text:`Термометрді ${t==='tA'?'A':'B'} термосқа орнатып, мақтамен жап`,run:async A=>{const q=A.wp(A.LB.O[t].obj);await A.moveTo(A.LB.O[th].obj,A.V3(q.x,.35,q.z),.7,.8)}})),
 {t:'wait',text:'48 сағат күту',run:async A=>{await Promise.all([clock(A,'Күту (сағ)',48),A.tween(2.6,k=>A.LB.O.thA.set(20+7*k))]);A.data(tbl(['Термос','Бастапқы t, °C','48 сағ кейін, °C'],[['A (өнген)',20,27],['B (қайнатылған)',20,20]]))}},
 {t:'input',text:'A термостағы температура қанша градусқа көтерілді?',ans:7,tol:0,unit:'°C'},
 {t:'choice',text:'A термоста жылу қайдан пайда болды?',options:['Күн сәулесінен','Тірі дәндердің тыныс алуы кезінде органикалық заттардың тотығуынан','Термостың өзінен','Судан'],correct:1},
 {t:'choice',text:'B термоста температура неге өзгермеді?',options:['Дән аз','Қайнатылған дәндер өлі — ферменттер денатурацияланған, тыныс алу жоқ','Термометр бұзылған','Мақта жылуды өткізбеді'],correct:1}],
 result:()=>tbl(['Термос','Басында','48 сағ кейін','Қорытынды'],[['A — өнген бұршақ','20 °C','27 °C','Тыныс алу → жылу бөлінді'],['B — қайнатылған бұршақ','20 °C','20 °C','Тыныс алу жоқ']])+'<p class="muted">C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + энергия (АТФ + жылу)</p>',
 obs:()=>'48 сағаттан кейін өніп келе жатқан бұршақ салынған термоста температура 20-дан 27 °C-қа көтерілді, қайнатылған бұршақ термосында 20 °C күйінде қалды',
 q:[['Тыныс алу кезінде бөлінген энергияның бір бөлігі жылу ретінде, қалғаны қандай түрде жиналады?',['Глюкоза','АТФ','Крахмал','Оттек'],1,'АТФ — әмбебап энергия тасымалдаушы.']]};

/* ===== 11. Аэробты және анаэробты тыныс ===== */
const L_aer={id:'aero9',ic:'💨',n:'Аэробты және анаэробты тыныс алуды салыстыру',gr:'9-сынып',goal:'Ашытқыны оттегі бар (ауа үрленген) және оттегісіз (май қабатымен жабылған) жағдайда өсіріп, CO₂ бөліну жылдамдығын әк суы арқылы салыстыру.',eq:['2 колба','Глюкоза ерітіндісі','Ашытқы','Аквариум компрессоры','Өсімдік майы','Әк суы'],view:[0,1,.2,7.5,[0,.6,1]],
 setup(A){A.add('fA',A.flask(),'A: аэробты',[-1.2,0,0]);A.add('fB',A.flask(),'B: анаэробты',[1.2,0,0]);A.add('glu',A.beaker(.45,.9,{color:0xf3f6e0,level:.85}),'Глюкоза ерітіндісі',[-3.6,0,-.4]);A.LB.O.glu.mouth=.92;A.add('oil',A.bottle('Май','',{color:0xf5c542,ac:'#fbbf24'}),'Өсімдік майы',[3.4,0,-.9]);
  const pump=device(A,'OFF',0x334155);A.add('pump',pump,'Компрессор',[-3.4,0,1.6]);A.add('lA',A.tube({color:0xf4f8ff,level:.4}),'Әк суы A',[-.6,.04,1.8]);A.add('lB',A.tube({color:0xf4f8ff,level:.4}),'Әк суы B',[1.8,.04,1.8]);A.add('yst',A.bottle('Ашытқы','',{solid:1,color:0xd9b98a}),'Ашытқы',[3.6,0,1]);A.LB.st={}},
 steps:[{t:'click',o:'glu',text:'Екі колбаға да глюкоза ерітіндісін құй',run:A=>pourMany(A,'glu',['fA','fB'],{to:.35,color:0xf3f6e0})},
 {t:'click',o:'yst',text:'Екі колбаға да ашытқы сал',run:async A=>{await A.sprinkle('fA',0xd9b98a);await A.sprinkle('fB',0xd9b98a);A.LB.O.fA.liq.color(0xe8dcc0);A.LB.O.fB.liq.color(0xe8dcc0)}},
 {t:'click',o:'oil',text:'B колбадағы ерітіндінің бетіне май қабатын құй (оттегі кірмейді)',run:A=>A.pour('oil','fB',{to:.42,color:0xf5c542})},
 {t:'click',o:'pump',text:'Компрессорды қосып, A колбаға ауа үрле',run:async A=>{A.LB.O.pump.show('ON');A.bubbles(A.LB.O.fA,{rate:30,r:.03})}},
 {t:'wait',text:'Колбалардан шыққан газды әк суына өткізіп, лайлану уақытын белгіле',run:async A=>{await Promise.all([clock(A,'Бақылау',15),A.tween(1.2,k=>A.LB.O.lA.liq.m.color.lerpColors(A.col(0xf4f8ff),A.col(0xf2f2ec),k)).then(()=>A.wait(1)).then(()=>A.tween(1.2,k=>A.LB.O.lB.liq.m.color.lerpColors(A.col(0xf4f8ff),A.col(0xf2f2ec),k*.7)))]);A.LB.O.lA.liq.m.opacity=.98;
  A.data(tbl(['Колба','Әк суы лайланған уақыт','Температура өзгерісі','Иісі'],[['A (аэробты)','6 мин','+3 °C','Ашытқы'],['B (анаэробты)','14 мин','+1 °C','Спирт']]))}},
 {t:'choice',text:'Қай колбада CO₂ тезірек бөлінді?',options:['A — аэробты','B — анаэробты','Бірдей','Ешқайсысында'],correct:0},
 {t:'choice',text:'B колбадағы спирт иісі қай үдерістің дәлелі?',options:['Фотосинтез','Спирттік ашу (анаэробты тыныс)','Аэробты тыныс','Транспирация'],correct:1},
 {t:'input',text:'1 молекула глюкозадан аэробты тыныста ~38 АТФ, анаэробтыда 2 АТФ түзіледі. Аэробты тыныс неше есе тиімді?',ans:19,tol:0}],
 result:()=>tbl(['Көрсеткіш','Аэробты','Анаэробты (ашу)'],[['Оттегі','Қажет','Қажет емес'],['Өнімдері','CO₂ + H₂O','C₂H₅OH + CO₂'],['АТФ (1 глюкоза)','~38','2'],['Әк суы лайлануы','6 мин','14 мин'],['Жылу','+3 °C','+1 °C']]),
 obs:()=>'ауа үрленген колбадан шыққан газ әк суын 6 минутта, май қабатымен жабылған колбаныкі 14 минутта лайлады; анаэробты колбада спирт иісі шықты',
 q:[['Анаэробты тынысты қолданатын өндіріс:',['Нан пісіру, айран, шарап','Болат балқыту','Мұнай өңдеу','Шыны жасау'],0,'Ашу процестері.']]};

/* ===== 12. Тыныс алу жиілігі ===== */
const L_breath={id:'breath9',ic:'🫁',n:'Адамның тыныс алу жиілігін физикалық жүктемеге дейін және кейін анықтау',gr:'9-сынып',goal:'Тыныштықта және 20 рет отырып-тұрудан кейін тыныс алу жиілігін санап, физикалық жүктеменің тыныс алуға әсерін анықтау.',eq:['Секундомер','Оқушы (модель)','Кесте'],view:[0,1.1,0,5.8,[.2,.15,1]],
 setup(A){const H=human(A);A.add('man',H,'Оқушы',[0,0,0]);A.LB.st={H,rows:[]};const breath=(rate)=>{A.LB.st.rate=rate};breath(16);let ph=0;A.LB.anim.push((t,dt)=>{ph+=dt*A.LB.st.rate/60*6.283;const s=1+.06*Math.max(0,Math.sin(ph));H.chest.scale.set(s,1+.03*Math.max(0,Math.sin(ph)),s)})},
 steps:[{t:'click',o:'man',text:'Тыныштықта: 15 секунд ішінде оқушының дем алуын (кеуде көтерілуін) сана',run:async A=>{A.LB.st.rate=16;const r=await countTask(A,{title:'Тыныштықтағы тыныс',emoji:'🫁',per15:4});A.LB.st.rows.push(['Тыныштықта',r.n,r.n*4]);A.data(tbl(['Жағдай','15 с','1 мин'],A.LB.st.rows))}},
 {t:'click',o:'man',text:'Физикалық жүктеме: оқушыға 20 рет отырып-тұруды тапсыр',run:async A=>{const H=A.LB.st.H;await A.tween(3,k=>{const s=Math.abs(Math.sin(k*Math.PI*10));H.obj.position.y=-.35*s;H.legs.scale.y=1-.4*s})}},
 {t:'click',o:'man',text:'Жүктемеден кейін бірден: 15 секунд ішінде тынысты сана',run:async A=>{A.LB.st.rate=28;const r=await countTask(A,{title:'Жүктемеден кейінгі тыныс',emoji:'🫁',per15:7});A.LB.st.rows.push(['Жүктемеден кейін',r.n,r.n*4]);A.data(tbl(['Жағдай','15 с','1 мин'],A.LB.st.rows))}},
 {t:'input',text:'Жүктемеден кейінгі тыныс жиілігі (1 минутта) тыныштықтағыдан неше рет артық? (санаған мәндеріңнің айырмасы)',ans:A=>A.LB.st.rows[1][2]-A.LB.st.rows[0][2],tol:0},
 {t:'choice',text:'Жүктемеден кейін тыныс неге жиілейді?',options:['Өкпе кішірейеді','Бұлшықеттерге көп O₂ керек, қанда CO₂ көбейіп, сопақша мидағы тыныс орталығын қоздырады','Жүрек тоқтайды','Ауа азаяды'],correct:1}],
 result:A=>tbl(['Жағдай','15 с','1 мин'],A.LB.st.rows)+'<p class="muted">Қалыпты: жасөспірімде тыныштықта 16–20 рет/мин.</p>',
 obs:A=>A.LB.st.rows.map(r=>`${r[0]}: ${r[2]} рет/мин`).join('; '),
 q:[['Тыныс алу орталығы орналасқан:',['Мишық','Сопақша ми','Жұлын','Маңдай бөлігі'],1,'Оны қандағы CO₂ концентрациясы реттейді.']]};

/* ===== 13. Пульс ===== */
const L_pulse={id:'pulse9',ic:'❤️',n:'Жүрек соғу жиілігінің физикалық жүктемеге тәуелділігін зерттеу',gr:'9-сынып',goal:'Тыныштықта, 20 рет отырып-тұрудан кейін және 2 минут демалғаннан кейін пульсті санап, жүректің жүктемеге бейімделуін зерттеу.',eq:['Секундомер','Пульсометр','Оқушы (модель)'],view:[.1,1.1,.2,6.8,[0,.2,1]],
 setup(A){const H=human(A);A.add('man',H,'Оқушы',[-.9,0,0]);const D=device(A,'♥ --');A.add('hr',D,'Пульсометр',[1.2,0,.4]);const hrt=A.mesh(new A.THREE.SphereGeometry(.1,14,10),A.M(0xdc2626,{emissive:0x7f1d1d,emissiveIntensity:.6}));hrt.position.set(-.82,1.75,.25);A.LB.g.add(hrt);A.LB.st={H,hrt,rows:[]}},
 steps:(()=>{const meas=(title,per15,lab)=>async A=>{const h=A.LB.st.hrt;A.LB.O.hr.show('♥ ...');const r=await countTask(A,{title,emoji:'❤',per15,onBeat:()=>{h.scale.setScalar(1.6);A.tween(.25,k=>h.scale.setScalar(1.6-.6*k))}});A.LB.O.hr.show('♥ '+r.n*4);A.LB.st.rows.push([lab,r.n,r.n*4]);A.data(tbl(['Жағдай','15 с','1 мин'],A.LB.st.rows)+(A.LB.st.rows.length>1?chart([{pts:A.LB.st.rows.map((x,i)=>[i,x[2]]),c:'#dc2626'}],{xl:'Жағдай',yl:'соққы/мин',xlab:A.LB.st.rows.map(x=>x[0].split(' ')[0]),ymin:0,ymax:140}):''))};
 return[{t:'click',o:'hr',text:'Тыныштықта: 15 секунд ішінде пульсті сана',run:meas('Тыныштықтағы пульс',18,'Тыныштықта')},
 {t:'click',o:'man',text:'Оқушыға 20 рет отырып-тұруды тапсыр',run:async A=>{const H=A.LB.st.H;await A.tween(3,k=>{const s=Math.abs(Math.sin(k*Math.PI*10));H.obj.position.y=-.35*s;H.legs.scale.y=1-.4*s})}},
 {t:'click',o:'hr',text:'Жүктемеден кейін бірден пульсті сана',run:meas('Жүктемеден кейінгі пульс',30,'Жүктемеден кейін')},
 {t:'wait',text:'2 минут демалу',run:async A=>clock(A,'Демалу',2)},
 {t:'click',o:'hr',text:'2 минут демалғаннан кейін пульсті сана',run:meas('Демалыстан кейінгі пульс',21,'Демалыстан кейін')},
 {t:'choice',text:'Пульс тыныштықтағы мәнге тез оралса, бұл нені көрсетеді?',options:['Жүрек әлсіз','Жүрек-қан тамыр жүйесі жақсы жаттыққан','Тыныс алу бұзылған','Ешнәрсе'],correct:1},
 {t:'choice',text:'Жүктеме кезінде жүрек соғуы неге жиілейді?',options:['Бұлшықеттерге оттегі мен қоректік заттар көбірек жеткізу үшін','Қан азаяды','Өкпе тоқтайды','Ми ұйықтайды'],correct:0}]})(),
 result:A=>tbl(['Жағдай','15 с','1 мин'],A.LB.st.rows)+'<p class="muted">Қалыпты пульс: тыныштықта 60–80 соққы/мин.</p>',
 obs:A=>A.LB.st.rows.map(r=>`${r[0]}: ${r[2]} соққы/мин`).join('; '),
 q:[['Пульсті қай жерден санауға болады?',['Білек артериясы, ұйқы артериясы','Вена','Капилляр','Тері'],0,'Артерия қабырғасының тербелісі.']]};

/* ===== 14. Өкпенің тіршілік сыйымдылығы ===== */
const L_vc={id:'vc9',ic:'🎈',n:'Өкпенің тіршілік сыйымдылығын анықтау (модельдеу)',gr:'9-сынып',goal:'Терең дем алып, шарды бір демде үрлеу арқылы өкпенің тіршілік сыйымдылығын (ӨТС) анықтау және шардың диаметрі бойынша көлемін есептеу.',eq:['Үрлемелі шар','Сызғыш (40 см)','Калькулятор'],view:[0,1,.3,5,[0,.3,1]],
 setup(A){const B=A.balloon(0xe53950);B.obj.scale.setScalar(1.2);A.add('bal',B,'Шар',[0,0,0]);const R=A.ruler(2.2);A.add('rul',R,'Сызғыш',[-1,0,.2]);A.LB.st={s:.15}},
 steps:[{t:'click',o:'bal',text:'Терең дем алып, шарды бір демде толық үрле (батырманы демің біткенше басып тұр)',run:async A=>{const b=A.LB.O.bal.obj.userData.b;await holdTask(A,{title:'🎈 Шарды үрле',btn:'💨 Үрлеу',onTick:dt=>{A.LB.st.s=Math.min(1,A.LB.st.s+dt*.35);const s=.55+1.4*A.LB.st.s;b.scale.set(s,s*1.05,s);b.position.y=.15+.62*A.LB.st.s},until:()=>A.LB.st.s>=1});A.toast('Демің бітті — шардың ұшын қыс!')}},
 {t:'input',text:'Шардың диаметрін сызғышпен өлше (шар диаметрі 19 см деп ал)',ans:19,tol:0,unit:'см'},
 {t:'input',text:'Шардың көлемін есепте: V = πd³/6 (литрмен, 1 л = 1000 см³, екі ондық)',ans:Math.PI*19**3/6/1000,tol:.05,unit:'л'},
 {t:'choice',text:'Өкпенің тіршілік сыйымдылығы дегеніміз:',options:['Тыныс көлемі ғана','Тыныс көлемі + қосымша дем алу + қосымша дем шығару көлемдері','Қалдық ауа','Өлі кеңістік'],correct:1},
 {t:'choice',text:'ӨТС-ті арттырудың жолы:',options:['Темекі шегу','Жүзу, жүгіру сияқты тұрақты жаттығулар','Көп ұйықтау','Тәтті жеу'],correct:1}],
 result:()=>tbl(['Көрсеткіш','Мәні'],[['Шар диаметрі','19 см'],['V = πd³/6','≈ 3590 см³ = 3,59 л'],['Жасөспірімдер нормасы','2,5–4,5 л']]),
 obs:()=>'бір демде үрленген шардың диаметрі 19 см болды, көлемі V = πd³/6 ≈ 3,59 л',
 q:[['Өкпенің ішінде дем шығарғаннан кейін де қалатын ауа:',['Тыныс көлемі','Қалдық ауа','Тіршілік сыйымдылығы','Қосымша ауа'],1,'Ол ~1–1,5 л.']]};

/* ===== 15. Нефрон моделі ===== */
const L_neph={id:'neph9',ic:'🫘',n:'Зәр түзілу үдерісін нефрон моделі арқылы зерттеу',gr:'9-сынып',goal:'«Қан» қоспасын сүзгі (шумақ моделі) арқылы өткізіп, алғашқы зәрдің құрамын анықтау және кері сіңірілуді модельдеу.',eq:['«Қан» моделі (су + глюкоза + альбумин + қызыл бөлшектер)','Шұңғыл + сүзгі қағаз (шумақ)','Пробиркалар','Бенедикт реактиві','Биурет реактиві'],view:[0,1,.2,7,[0,.6,1]],
 setup(A){const bl=A.beaker(.4,.8,{color:0xb91c1c,level:.75});A.add('blood',bl,'«Қан» моделі',[-3.2,0,-.3]);A.LB.O.blood.top=.8;A.LB.O.blood.mouth=.8;A.add('fun',A.funnel(),'Сүзгі (шумақ моделі)',[0,1.48,-.2]);A.add('fil',A.tube(),'Сүзінді (алғашқы зәр)',[0,0,-.2]);
  A.add('t1',A.tube(),'1-сынама',[1.6,.04,1.2]);A.add('t2',A.tube(),'2-сынама',[2.3,.04,1.2]);A.add('ben',A.bottle('Бенедикт','',{color:0x3a78d8,ac:'#38bdf8'}),'Бенедикт',[3.4,0,-.6]);A.add('biu',A.bottle('Биурет','',{color:0x6d8fe0,ac:'#a78bfa'}),'Биурет реактиві',[4.2,0,.4]);A.LB.st={}},
 steps:[{t:'click',o:'blood',text:'«Қан» қоспасын сүзгісі бар шұңғылға құй (шумақтағы сүзілу)',run:async A=>{await A.pour('blood','fun',{color:0xb91c1c});await A.LB.O.fil.liq.set(.45,1.6);A.LB.O.fil.liq.m.color.set(0xfde9a8);const fp=A.wp(A.LB.O.fun.obj);const s=A.mesh(new A.THREE.CircleGeometry(.3,20),A.M(0xb91c1c,{side:2}));s.rotation.x=-Math.PI/2;s.position.set(fp.x,fp.y+.7,fp.z);A.LB.g.add(s)}},
 {t:'choice',text:'Сүзгіде қызыл бөлшектер қалды, ал сүзінді ашық сары. Бұл нені модельдейді?',options:['Қан жасушалары шумақтан өтпейді','Эритроциттер зәрге өтеді','Сүзгі бұзылды','Глюкоза жоғалды'],correct:0},
 {t:'click',o:'fil',text:'Сүзіндіден екі сынамаға құй',run:async A=>{await A.LB.O.t1.liq.set(.2,.6);A.LB.O.t1.liq.m.color.set(0xfde9a8);await A.LB.O.t2.liq.set(.2,.6);A.LB.O.t2.liq.m.color.set(0xfde9a8);await A.LB.O.fil.liq.set(.15,.6)}},
 {t:'click',o:'ben',text:'1-сынамаға Бенедикт реактивін тамызып, қыздыр (глюкозаға)',run:async A=>{await A.drip('ben','t1',{n:2,color:0x3a78d8});await A.LB.O.t1.liq.color(0xd9862a,1.6)}},
 {t:'click',o:'biu',text:'2-сынамаға биурет реактивін тамыз (нәруызға)',run:async A=>{await A.drip('biu','t2',{n:2,color:0x6d8fe0});await A.LB.O.t2.liq.color(0x8fb6f0,1.2)}},
 {t:'multi',text:'Алғашқы зәрде (сүзіндіде) не бар?',options:['Су','Глюкоза','Нәруыз (альбумин)','Эритроциттер','Тұздар'],correct:[0,1,4]},
 {t:'choice',text:'Қалыпты соңғы зәрде глюкоза неге болмайды?',options:['Ол шумақта сүзілмейді','Өзекшелерде толық кері сіңіріледі (реабсорбция)','Ол бауырда жиналады','Ол ыдырайды'],correct:1}],
 result:()=>tbl(['Зат','Қанда','Алғашқы зәрде','Соңғы зәрде'],[['Су','+','+','+ (аз)'],['Глюкоза','+','+','–'],['Нәруыз','+','–','–'],['Қан жасушалары','+','–','–'],['Мочевина, тұздар','+','+','+ (концентрлі)']]),
 obs:()=>'сүзгіде қызыл бөлшектер қалды, сүзінді ашық сары болды; сүзінді Бенедиктпен қызғылт сары (глюкоза бар), биурет реактивімен көк (нәруыз жоқ) түс берді',
 q:[['Тәулігіне түзілетін алғашқы зәр мөлшері:',['1,5 л','~150–180 л','10 л','500 л'],1,'Соңғы зәр ~1,5 л.']]};

/* ===== 16. Тұқымның өнуі ===== */
const GR=[['gA','A: құрғақ, 25 °C'],['gB','B: ылғал, 25 °C'],['gC','C: ылғал, 4 °C'],['gD','D: су астында, 25 °C']];
const L_germ={id:'germ9',ic:'🌱',n:'Тұқымның өнуіне қажетті жағдайларды зерттеу',gr:'9-сынып',goal:'Бұршақ тұқымдарын әртүрлі жағдайларда (су, жылу, ауа) ұстап, тұқымның өнуіне қажетті факторларды анықтау.',eq:['4 Петри табақшасы','Мақта','Бұршақ тұқымдары','Су','Тоңазытқыш','Қайнатылған су + май'],view:[0,1,.4,7,[0,.7,1]],
 setup(A){const p=xs(4,1.2,-.6);GR.forEach(([n,l],i)=>{const P=A.petri();const ct=A.mesh(new A.THREE.CylinderGeometry(.42,.42,.04,24),A.M(0xffffff,{roughness:1}));ct.position.y=.03;P.obj.add(ct);for(let k=0;k<10;k++){const s=A.blob(0xc9b26a,.045,k+i*10);s.position.set(-.28+(k%5)*.14,.07,-.08+Math.floor(k/5)*.16);P.obj.add(s)}P.surf=.06;A.add(n,P,l,[p[i],0,.4])});
  A.add('wat',A.bottle('H₂O','',{color:0xd6ecff}),'Су',[-3.8,0,-.8]);A.add('oil',A.bottle('Май','',{color:0xf5c542,ac:'#fbbf24'}),'Май',[-3,0,-1.4]);const fr=new A.THREE.Group();const fb=A.mesh(new A.THREE.BoxGeometry(1.3,1.6,1.2),A.M(0xf1f5f9,{roughness:.3}));fb.position.y=.8;fr.add(fb);const fd=A.mesh(new A.THREE.BoxGeometry(1.25,1.5,.04),A.M(0xe2e8f0));fd.position.set(0,.8,.62);fr.add(fd);A.add('fridge',{obj:fr},'Тоңазытқыш 4 °C',[4.2,0,-.6]);A.LB.st={}},
 steps:[{t:'click',o:'wat',text:'B және C табақшалардағы мақтаны сумен ылғалда',run:A=>dripMany(A,'wat',['gB','gC'],{n:3,color:0xd6ecff})},
 {t:'click',o:'wat',text:'D табақшадағы тұқымдарды қайнатылған сумен толық жап',run:async A=>{await A.drip('wat','gD',{n:4,color:0xd6ecff});const w=A.mesh(new A.THREE.CylinderGeometry(.44,.44,.08,24),A.M(0x9fd4ff,{transparent:true,opacity:.6}));w.position.y=.1;A.LB.O.gD.obj.add(w)}},
 {t:'click',o:'oil',text:'D табақшадағы судың бетіне май тамыз (ауа кірмейді)',run:async A=>{await A.drip('oil','gD',{n:2,color:0xf5c542});const o=A.mesh(new A.THREE.CylinderGeometry(.44,.44,.015,24),A.M(0xf5c542,{transparent:true,opacity:.7}));o.position.y=.145;A.LB.O.gD.obj.add(o)}},
 {t:'drag',o:'gC',to:'fridge',off:[0,.25,0],r:.9,text:'C табақшаны тоңазытқышқа қой'},
 {t:'wait',text:'5 күн күту',run:async A=>{const B=A.LB.O.gB.obj;const sp=[];B.children.filter(c=>c.geometry&&c.geometry.type==='SphereGeometry').slice(0,9).forEach(s=>{const r=A.mesh(new A.THREE.CylinderGeometry(.01,.008,1,6),A.M(0xfffbeb));r.position.copy(s.position);r.scale.y=.001;B.add(r);const l=A.mesh(new A.THREE.SphereGeometry(.035,8,6),A.M(0x4ade80));l.position.copy(s.position);l.scale.setScalar(.01);B.add(l);sp.push([r,l,s.position.clone()])});
  await Promise.all([clock(A,'Күту (күн)',5),A.tween(2.6,k=>sp.forEach(([r,l,p])=>{r.scale.y=.25*k;r.position.y=p.y+.125*k;l.scale.setScalar(.01+k);l.position.y=p.y+.25*k}))]);A.look(-.6,.4,.4,3.6,[0,1,.6]);A.data(tbl(['Табақша',...GR.map(g=>g[1].split(':')[0])],[['Өнген тұқым',0,'9/10',0,0]]))}},
 {t:'input',text:'B табақшадағы тұқымдардың өнгіштігі (%): 9 / 10 · 100%',ans:90,tol:0,unit:'%'},
 {t:'multi',text:'Тұқымның өнуіне қажетті жағдайлар:',options:['Су','Жылу','Оттегі (ауа)','Жарық (міндетті)','Топырақ (міндетті)'],correct:[0,1,2]}],
 result:()=>tbl(['Табақша','Су','Жылу','Ауа','Нәтиже'],[['A','–','+','+','Өнбеді'],['B (бақылау)','+','+','+','Өнді (90%)'],['C','+','–','+','Өнбеді'],['D','+','+','–','Өнбеді']]),
 obs:()=>'5 күннен кейін тек ылғал әрі жылы, ауасы бар B табақшада 10 тұқымның 9-ы өнді; құрғақ (A), суық (C) және ауасыз (D) табақшаларда тұқым өнбеді',
 q:[['Тұқым өнгенде оттегі не үшін қажет?',['Фотосинтез үшін','Тыныс алу арқылы энергия алу үшін','Суды сіңіру үшін','Түсін өзгерту үшін'],1,'Өскін тамыры мен бүршігі энергия жұмсайды.']]};

/* ===== 17. Табиғи сұрыпталу ===== */
function meadowTex(A){return A.canvasTex(512,512,(c,w,h)=>{c.fillStyle='#4d8a2a';c.fillRect(0,0,w,h);const R=rng(3);for(let i=0;i<2600;i++){c.fillStyle=['#3f7a22','#5c9a33','#6aa83c','#38701e'][i%4];c.save();c.translate(R()*w,R()*h);c.rotate(R()*3);c.fillRect(0,0,3,12+R()*10);c.restore()}})}
const L_sel={id:'select9',ic:'🦗',n:'Табиғи сұрыпталу үдерісін модельдеу',gr:'9-сынып',goal:'Жасыл шалғында жасыл және сары «шегірткелерді» жыртқыш құс рөлінде аулап, қорғаныштық түстің табиғи сұрыпталудағы рөлін модельдеу.',eq:['Жасыл шалғын моделі','Жасыл және сары «жәндіктер»','Секундомер'],view:[0,.5,.3,5.5,[0,1.4,.6]],
 setup(A){const m=A.mesh(new A.THREE.BoxGeometry(5.2,.06,3.2),new A.THREE.MeshStandardMaterial({map:meadowTex(A),roughness:.9}));const g=new A.THREE.Group();g.add(m);A.add('mead',{obj:g},null,[0,.03,.3]);A.LB.st={gen:[[20,20]],prey:[]};spawn(A,20,20)},
 steps:[1,2,3].map(k=>({t:'click',o:'mead',text:`${k}-ұрпақ: құс ретінде 12 секунд ішінде мүмкіндігінше көп «жәндікті» басып аула`,tip:'Көзге көбірек түсетінін аула — нағыз құс сияқты.',run:async A=>{await hunt(A);const[gn,yl]=A.LB.st.cnt;const tot=gn+yl;const g2=Math.round(gn/tot*40),y2=40-g2;A.LB.st.gen.push([g2,y2]);clear(A);spawn(A,g2,y2);const G=A.LB.st.gen;A.data(tbl(['Ұрпақ',...G.map((_,i)=>i)],[['Жасыл',...G.map(x=>x[0])],['Сары',...G.map(x=>x[1])]])+chart([{pts:G.map((x,i)=>[i,x[0]]),c:'#16a34a',name:'Жасыл'},{pts:G.map((x,i)=>[i,x[1]]),c:'#eab308',name:'Сары'}],{xl:'Ұрпақ',yl:'Даралар саны',ymin:0,ymax:40}))}})).concat([
 {t:'choice',text:'Ұрпақтан ұрпаққа қай түсті жәндіктердің үлесі артты?',options:['Сары','Жасыл (қорғаныштық түс)','Өзгерген жоқ','Екеуі де жойылды'],correct:1},
 {t:'choice',text:'Бұл сұрыпталудың қай түрі?',options:['Тұрақтандырушы','Қозғаушы (бағытталған)','Жасанды','Жыныстық'],correct:1}]),
 result:A=>{const G=A.LB.st.gen;return tbl(['Ұрпақ',...G.map((_,i)=>i)],[['Жасыл',...G.map(x=>x[0])],['Сары',...G.map(x=>x[1])]])+chart([{pts:G.map((x,i)=>[i,x[0]]),c:'#16a34a',name:'Жасыл'},{pts:G.map((x,i)=>[i,x[1]]),c:'#eab308',name:'Сары'}],{xl:'Ұрпақ',yl:'Даралар',ymin:0,ymax:40})},
 obs:A=>'ұрпақтар бойынша жасыл/сары саны: '+A.LB.st.gen.map(x=>x.join('/')).join(' → '),
 q:[['Табиғи сұрыпталудың нәтижесі:',['Ең күшті дараның ғана тіршілігі','Ортаға бейімделген даралардың көбірек ұрпақ қалдыруы','Барлық даралардың өлуі','Мутациялардың жойылуы'],1,'Дарвиннің негізгі идеясы.']]};
function spawn(A,g,y){const R=Math.random;const geo=new A.THREE.CapsuleGeometry(.035,.1,4,8);const P=[];for(let i=0;i<g+y;i++){const yel=i>=g;const m=A.mesh(geo,A.M(yel?0xeab308:0x4d8a2a,{roughness:.6}));m.rotation.set(Math.PI/2,0,R()*3);m.position.set((R()-.5)*4.8,.1,.3+(R()-.5)*2.9);m.userData.lab='prey'+i;m.userData.yel=yel;A.LB.g.add(m);P.push(m)}A.LB.st.prey=P}
function clear(A){A.LB.st.prey.forEach(m=>A.LB.g.remove(m));A.LB.st.prey=[]}
function hunt(A){return new Promise(res=>{const S=A.LB.st;let left=12,eaten=[0,0];const P=panel(`<b>🦅 Сен — жыртқыш құссың!</b><div class="cnt"><span class="ct">12</span> с</div><div class="cv">Ауланды: <b>0</b></div><small>Жәндіктерді тышқанмен бас</small>`);
 const eat=m=>{if(!m.visible)return;m.visible=false;eaten[m.userData.yel?1:0]++;P.querySelector('.cv b').textContent=eaten[0]+eaten[1]};
 A.LB.pick=n=>{if(!n.startsWith('prey'))return;const m=S.prey.find(x=>x.userData.lab===n);if(m)eat(m)};const auto=!A.LB.manual;let ta=0;
 const f=(t,dt)=>{left-=dt*(auto?4:1);if(auto){ta+=dt*4;while(ta>.6){ta-=.6;const vis=S.prey.filter(m=>m.visible);if(vis.length){const yel=vis.filter(m=>m.userData.yel);const pick=(yel.length&&Math.random()<.8)?yel[Math.floor(Math.random()*yel.length)]:vis[Math.floor(Math.random()*vis.length)];eat(pick)}}}
  P.querySelector('.ct').textContent=Math.max(0,Math.ceil(left));if(left<=0){A.LB.anim.splice(A.LB.anim.indexOf(f),1);A.LB.pick=null;P.remove();const alive=S.prey.filter(m=>m.visible);S.cnt=[alive.filter(m=>!m.userData.yel).length,alive.filter(m=>m.userData.yel).length];A.toast(`Ауланды: жасыл ${eaten[0]}, сары ${eaten[1]}. Тірі қалғандар көбейді.`);res()}};A.LB.anim.push(f)})}

/* ===== 18. Қоректік тізбек ===== */
function org(A,k){const g=new A.THREE.Group();const M=A.M;if(k==='grass'){for(let i=0;i<9;i++){const b=A.mesh(new A.THREE.ConeGeometry(.04,.55,5),M(0x4ade80));b.position.set((Math.random()-.5)*.25,.27,(Math.random()-.5)*.25);b.rotation.z=(Math.random()-.5)*.5;g.add(b)}}
 if(k==='hop'){const b=A.mesh(new A.THREE.CapsuleGeometry(.07,.3,6,10),M(0x65a30d));b.rotation.z=Math.PI/2;b.position.y=.16;g.add(b);const h=A.mesh(new A.THREE.SphereGeometry(.07,10,8),M(0x4d7c0f));h.position.set(.24,.18,0);g.add(h);[-1,1].forEach(s=>{const l=A.mesh(new A.THREE.CylinderGeometry(.012,.012,.32,5),M(0x3f6212));l.position.set(-.08,.16,s*.08);l.rotation.set(s*.5,0,.9);g.add(l)})}
 if(k==='frog'){const b=A.mesh(new A.THREE.SphereGeometry(.2,16,12),M(0x22c55e));b.scale.set(1.2,.7,1);b.position.y=.15;g.add(b);[-1,1].forEach(s=>{const e=A.mesh(new A.THREE.SphereGeometry(.06,10,8),M(0xffffff));e.position.set(.12,.3,s*.09);g.add(e);const p=A.mesh(new A.THREE.SphereGeometry(.03,8,6),M(0x111111));p.position.set(.16,.31,s*.09);g.add(p)})}
 if(k==='snake'){const pts=[];for(let i=0;i<14;i++)pts.push(new A.THREE.Vector3(-.4+i*.06,.05,Math.sin(i*.8)*.12));const t=A.mesh(new A.THREE.TubeGeometry(new A.THREE.CatmullRomCurve3(pts),40,.045,8),M(0x92400e));g.add(t);const h=A.mesh(new A.THREE.SphereGeometry(.07,10,8),M(0x78350f));h.position.set(.42,.06,Math.sin(13*.8)*.12);g.add(h)}
 if(k==='eagle'){const b=A.mesh(new A.THREE.SphereGeometry(.17,14,10),M(0x7c4a1e));b.scale.set(1,1.3,1);b.position.y=.3;g.add(b);const h=A.mesh(new A.THREE.SphereGeometry(.09,12,10),M(0xf5f5f4));h.position.y=.55;g.add(h);const bk=A.mesh(new A.THREE.ConeGeometry(.03,.09,6),M(0xf59e0b));bk.rotation.z=-Math.PI/2;bk.position.set(.1,.54,0);g.add(bk);[-1,1].forEach(s=>{const w=A.mesh(new A.THREE.BoxGeometry(.08,.3,.32),M(0x5b3412));w.position.set(0,.33,s*.2);w.rotation.x=s*.3;g.add(w)})}
 return{obj:g}}
const CH=[['grass','Шөп'],['hop','Шегіртке'],['frog','Бақа'],['snake','Жылан'],['eagle','Бүркіт']];
const L_food={id:'food9',ic:'🦅',n:'Экожүйедегі қоректік тізбектер мен энергия ағынын зерттеу',gr:'9-сынып',goal:'Шалғын экожүйесінің қоректік тізбегін құрастыру, трофикалық деңгейлерді анықтау және 10% ережесі бойынша энергия ағынын есептеу.',eq:['Ағзалар модельдері','Трофикалық деңгей тұғырлары','Калькулятор'],view:[0,1,.4,7,[0,.8,1]],
 setup(A){const p=xs(5,1.25);CH.forEach((c,i)=>{const P=new A.THREE.Group();const b=A.mesh(new A.THREE.CylinderGeometry(.42,.48,.18,24),A.M([0x22c55e,0x84cc16,0xeab308,0xf97316,0xef4444][i],{roughness:.5}));b.position.y=.09;P.add(b);sign(A,P,(i+1)+'-деңгей',.19,.0);A.add('s'+i,{obj:P},null,[p[i],0,-.6]);if(i<4){const ar=A.mesh(new A.THREE.ConeGeometry(.08,.22,10),A.M(0x334155));ar.rotation.z=-Math.PI/2;ar.position.set(p[i]+.62,.12,-.6);A.LB.g.add(ar)}});
  const R=[[-3.2,1.7],[1.4,2],[-1.2,2.1],[3.4,1.5],[.2,1.6]];const sh=[3,0,4,1,2];sh.forEach((ci,j)=>{const[k,l]=CH[ci];A.add(k,org(A,k),l,[R[j][0],.02,R[j][1]])});A.LB.st={}},
 steps:CH.map(([k,l],i)=>({t:'drag',o:k,to:'s'+i,off:[0,.2,0],r:.8,nohl:true,text:`${i+1}-трофикалық деңгейге (${['продуцент','I реттік консумент','II реттік консумент','III реттік консумент','IV реттік консумент'][i]}) тиісті ағзаны сүйреп апар`,tip:'Кім кімді жейтінін ойла: тізбек өсімдіктен басталады.'})).concat([
 {t:'wait',text:'Энергия пирамидасын құр (10% ережесі)',run:async A=>{const E=[10000,1000,100,10,1];const p=xs(5,1.25);const bars=E.map((e,i)=>{const b=A.mesh(new A.THREE.BoxGeometry(.5,1,.5),A.M(0xfbbf24,{emissive:0x92400e,emissiveIntensity:.25,transparent:true,opacity:.85}));b.position.set(p[i],0,-1.6);b.scale.y=.001;A.LB.g.add(b);return[b,(Math.log10(e)+1)*.45]});await A.tween(2,k=>bars.forEach(([b,h])=>{b.scale.y=Math.max(.001,h*k);b.position.y=h*k/2}));A.look(0,1,-1,6.5,[0,.4,1]);A.data(tbl(['Деңгей',...CH.map(c=>c[1])],[['Энергия, кДж',...E]]))}},
 {t:'input',text:'Шөптің энергиясы 10 000 кДж. Бүркітке (5-деңгей) неше кДж жетеді?',ans:1,tol:0,unit:'кДж'},
 {t:'choice',text:'Энергияның қалған 90%-ы қайда жұмсалады?',options:['Келесі деңгейге толық өтеді','Тыныс алуға, жылуға, қорытылмаған қалдықтарға','Жоғалмайды','Топыраққа ғана'],correct:1},
 {t:'multi',text:'Бұл тізбекте ескерілмеген, бірақ экожүйеде міндетті буын:',options:['Редуценттер (бактериялар, саңырауқұлақтар)','Күн энергиясы','Тастар','Су'],correct:[0,1]}]),
 result:()=>tbl(['Деңгей','Ағза','Рөлі','Энергия, кДж'],CH.map((c,i)=>[i+1,c[1],['Продуцент','I реттік консумент','II реттік консумент','III реттік консумент','IV реттік консумент'][i],[10000,1000,100,10,1][i]])),
 obs:()=>'қоректік тізбек құрастырылды: шөп → шегіртке → бақа → жылан → бүркіт; 10% ережесі бойынша энергия 10 000 → 1000 → 100 → 10 → 1 кДж',
 q:[['Қоректік тізбек неге 4–5 буыннан аспайды?',['Ағзалар аз','Әр деңгейде энергияның ~90%-ы жоғалады','Жыртқыштар көп','Өсімдіктер аз'],1,'Линдеман ережесі.']]};

export const NEW9={L_cells,L_ph,L_amst,L_visk,L_trans,L_therm,L_aer,L_breath,L_pulse,L_vc,L_neph,L_germ,L_sel,L_food};
