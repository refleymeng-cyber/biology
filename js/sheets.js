/* ЖҰМЫС ПАРАҚТАРЫ — кітапхана, баспаға дайын парақтар, автотексеру */
(function(){
const Q=s=>document.querySelector(s),QA=(s,r)=>[...(r||document).querySelectorAll(s)];
const shf=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
const norm=s=>String(s||'').toLowerCase().replace(/ё/g,'е').replace(/[\s.,;:!?"«»()-]+/g,' ').trim();
const L='АӘБВГҒДЕЖЗ';
const gs=s=>s.split('').sort((a,b)=>{const la=a!==a.toUpperCase(),lb=b!==b.toUpperCase();return la===lb?a.localeCompare(b):la?1:-1}).join('');

/* ---------- SVG суреттер ---------- */
const pin=(n,x1,y1,x2,y2)=>`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#334155" stroke-width="1.6"/><circle cx="${x2}" cy="${y2}" r="13" fill="#fff" stroke="#0f766e" stroke-width="2.5"/><text x="${x2}" y="${y2+5}" text-anchor="middle" font-size="14" font-weight="800" fill="#0f766e">${n}</text>`;
const SVG={
plant:()=>`<svg viewBox="0 0 560 360"><defs><radialGradient id="pc1"><stop offset="0" stop-color="#ecfccb"/><stop offset="1" stop-color="#bef264"/></radialGradient><radialGradient id="pv"><stop offset="0" stop-color="#e0f2fe"/><stop offset="1" stop-color="#bae6fd"/></radialGradient></defs>
<rect x="70" y="40" width="360" height="280" rx="28" fill="#86efac" stroke="#166534" stroke-width="12"/><rect x="84" y="54" width="332" height="252" rx="20" fill="url(#pc1)" stroke="#65a30d" stroke-width="3"/>
<rect x="170" y="90" width="200" height="170" rx="60" fill="url(#pv)" stroke="#0284c7" stroke-width="2.5"/><text x="270" y="180" text-anchor="middle" font-size="13" fill="#0369a1" opacity=".5">шырын</text>
<circle cx="125" cy="120" r="30" fill="#c4b5fd" stroke="#6d28d9" stroke-width="3"/><circle cx="128" cy="116" r="10" fill="#7c3aed"/>
${[[120,240],[150,280],[390,270],[395,110],[300,285]].map(([x,y])=>`<ellipse cx="${x}" cy="${y}" rx="20" ry="11" fill="#22c55e" stroke="#14532d" stroke-width="2"/><path d="M${x-12} ${y}h24M${x-8} ${y-5}h16M${x-8} ${y+5}h16" stroke="#14532d" stroke-width="1.5"/>`).join('')}
${[[230,280],[390,190]].map(([x,y])=>`<ellipse cx="${x}" cy="${y}" rx="17" ry="9" fill="#fb923c" stroke="#9a3412" stroke-width="2"/><path d="M${x-10} ${y}q5 -6 10 0t10 0" stroke="#9a3412" fill="none" stroke-width="1.5"/>`).join('')}
${pin(1,80,60,30,30)}${pin(2,92,200,30,200)}${pin(3,125,120,40,110)}${pin(4,150,280,60,330)}${pin(5,330,130,500,60)}${pin(6,390,190,510,190)}${pin(7,250,72,250,20)}</svg>`,
animal:()=>`<svg viewBox="0 0 560 360"><defs><radialGradient id="ac"><stop offset="0" stop-color="#fff1f2"/><stop offset="1" stop-color="#fecdd3"/></radialGradient></defs>
<path d="M90 180C80 90 190 40 290 50s200 50 190 140-90 140-200 130S100 270 90 180z" fill="url(#ac)" stroke="#be123c" stroke-width="4"/>
<circle cx="270" cy="180" r="55" fill="#ddd6fe" stroke="#6d28d9" stroke-width="4"/><circle cx="280" cy="170" r="17" fill="#7c3aed"/>
${[[150,130],[380,250],[170,250]].map(([x,y])=>`<ellipse cx="${x}" cy="${y}" rx="26" ry="13" fill="#fb923c" stroke="#9a3412" stroke-width="2"/><path d="M${x-16} ${y}q6 -8 12 0t12 0t8 0" stroke="#9a3412" fill="none" stroke-width="1.6"/>`).join('')}
<path d="M360 110q30 -10 60 0M355 122q35 -10 70 0M360 134q30 -10 60 0" stroke="#ca8a04" stroke-width="5" fill="none" stroke-linecap="round"/>
<circle cx="400" cy="175" r="12" fill="#fca5a5" stroke="#b91c1c" stroke-width="2"/><circle cx="200" cy="90" r="4" fill="#1e3a8a"/><circle cx="215" cy="96" r="4" fill="#1e3a8a"/><circle cx="330" cy="290" r="4" fill="#1e3a8a"/>
<g stroke="#047857" stroke-width="3"><path d="M330 210l12 6M334 218l12 6"/></g>
${pin(1,100,200,30,240)}${pin(2,248,145,200,30)}${pin(3,280,170,520,40)}${pin(4,150,130,40,90)}${pin(5,420,122,520,110)}${pin(6,400,175,520,200)}${pin(7,215,96,130,30)}</svg>`,
heart:()=>`<svg viewBox="0 0 560 380"><path d="M280 360C150 290 90 200 110 130c15-60 90-80 140-40 15 12 25 25 30 35 5-10 15-23 30-35 50-40 125-20 140 40 20 70-40 160-170 230z" fill="#fecaca" stroke="#991b1b" stroke-width="5"/>
<path d="M280 125v200" stroke="#991b1b" stroke-width="10"/><path d="M135 185h290" stroke="#991b1b" stroke-width="6"/>
<rect x="150" y="125" width="120" height="58" rx="14" fill="#93c5fd" opacity=".85"/><rect x="290" y="125" width="120" height="58" rx="14" fill="#fca5a5"/>
<path d="M150 190h125v110c-40-15-100-50-125-110z" fill="#60a5fa" opacity=".85"/><path d="M285 190h125c-20 60-75 95-125 120z" fill="#f87171"/>
<path d="M300 130V40h40v20" stroke="#dc2626" stroke-width="22" fill="none" stroke-linecap="round"/><path d="M240 130V50" stroke="#2563eb" stroke-width="20" stroke-linecap="round"/><path d="M262 130c0-50 30-60 60-80" stroke="#1d4ed8" stroke-width="14" fill="none" opacity=".9"/>
<text x="210" y="160" text-anchor="middle" font-size="12" fill="#1e3a8a">●</text>
${pin(1,200,150,40,110)}${pin(2,350,150,520,110)}${pin(3,210,250,40,270)}${pin(4,350,240,520,270)}${pin(5,330,48,500,30)}${pin(6,240,60,60,30)}${pin(7,280,260,280,370)}</svg>`,
flower:()=>`<svg viewBox="0 0 560 380"><path d="M280 370V230" stroke="#15803d" stroke-width="10"/><path d="M280 320q-60-10-90-50 50-5 90 40z" fill="#4ade80" stroke="#166534" stroke-width="2"/>
<ellipse cx="280" cy="230" rx="60" ry="16" fill="#65a30d"/><path d="M225 228q-60-30-55-110 50 30 70 105zM335 228q60-30 55-110-50 30-70 105z" fill="#f9a8d4" stroke="#be185d" stroke-width="3"/>
<path d="M240 226q-25-30-5-60 15 30 15 60zM320 226q25-30 5-60-15 30-15 60z" fill="#86efac" stroke="#166534" stroke-width="2"/>
<ellipse cx="280" cy="205" rx="22" ry="20" fill="#fde68a" stroke="#a16207" stroke-width="3"/><circle cx="280" cy="207" r="6" fill="#fff" stroke="#a16207"/><path d="M280 185V120" stroke="#ca8a04" stroke-width="8"/><ellipse cx="280" cy="116" rx="13" ry="7" fill="#eab308"/>
<path d="M255 200l-25-70M305 200l25-70" stroke="#a3a3a3" stroke-width="3"/><ellipse cx="230" cy="126" rx="7" ry="12" fill="#f59e0b"/><ellipse cx="330" cy="126" rx="7" ry="12" fill="#f59e0b"/>
${pin(1,185,150,60,110)}${pin(2,232,190,60,220)}${pin(3,280,116,280,30)}${pin(4,280,150,420,90)}${pin(5,280,207,450,200)}${pin(6,230,126,120,40)}${pin(7,250,232,90,300)}</svg>`};

/* ---------- ПАРАҚТАР ---------- */
const S=[
{id:'cell',gr:'7–10',ic:'🌿',c:'#16a34a',t:'Өсімдік жасушасының құрылысы',topic:'Цитология',tasks:[
 {type:'label',t:'Суреттегі нөмірленген бөліктердің атауын жаз (таңда)',svg:'plant',ans:['Жасуша қабырғасы','Жасуша мембранасы','Ядро','Хлоропласт','Орталық вакуоль','Митохондрия','Цитоплазма']},
 {type:'table',t:'Кестені толтыр: органоид қандай қызмет атқарады?',head:['Органоид','Қызметі'],rows:[['Хлоропласт','Фотосинтез'],['Митохондрия','АТФ синтезі (тыныс алу)'],['Рибосома','Ақуыз синтезі'],['Вакуоль','Тургорды сақтау, қор жинау'],['Жасуша қабырғасы','Пішін беру, қорғау']]},
 {type:'tf',t:'Ақиқат па, жалған ба?',items:[['Өсімдік жасушасында центриольдер болады.',0],['Хлоропласттың өз ДНҚ-сы бар.',1],['Жасуша қабырғасы целлюлозадан тұрады.',1],['Жануар жасушасында ірі орталық вакуоль болады.',0]]}]},
{id:'anim',gr:'10',ic:'🔬',c:'#e11d48',t:'Жануар жасушасы және органоидтар',topic:'Цитология',tasks:[
 {type:'label',t:'Жануар жасушасының бөліктерін анықта',svg:'animal',ans:['Плазмалық мембрана','Ядро','Ядрошық','Митохондрия','Гольджи кешені','Лизосома','Рибосомалар']},
 {type:'match',t:'Органоидты оның құрылыс ерекшелігімен сәйкестендір',pairs:[['Митохондрия','Қос мембраналы, ішкі мембранасы кристалар түзеді'],['Рибосома','Мембранасыз, екі суббірліктен тұрады'],['Лизосома','Бір мембраналы, гидролиздік ферменттері бар'],['Центриоль','9×3 микротүтікшелерден тұрады'],['Түйіршікті ЭПТ','Бетінде рибосомалары бар мембраналар жүйесі']]},
 {type:'fill',t:'Сөйлемдерді толықтыр (сөздер қорынан пайдалан)',bank:['ядро','АТФ','Гольджи','лизосома','рибосома','мембрана'],items:[['Тұқым қуалау ақпаратын сақтайтын органоид — ___.','ядро'],['Митохондрияда ___ синтезделеді.','АТФ'],['Ақуыздарды сұрыптап, «буып-түйетін» органоид — ___ кешені.','Гольджи'],['Жасуша ішілік ас қорытуды ___ жүзеге асырады.','лизосома'],['Ақуыз синтезі ___ жүреді (органоид атауын жаз).','рибосома']]}]},
{id:'mit',gr:'10',ic:'🧬',c:'#7c3aed',t:'Митоз және мейоз',topic:'Жасушаның бөлінуі',tasks:[
 {type:'order',t:'Митоз фазаларын дұрыс ретпен нөмірле',items:['Профаза — хромосомалар спиральданады, ядро қабықшасы ыдырайды','Метафаза — хромосомалар экватор жазықтығына тізіледі','Анафаза — хроматидалар полюстерге ажырайды','Телофаза — ядро қабықшасы қайта түзіледі','Цитокинез — цитоплазма бөлінеді']},
 {type:'table',t:'Митоз бен мейозды салыстыр',head:['Белгі','Митоз','Мейоз'],rows:[['Бөліну саны','Бір','Екі'],['Түзілетін жасушалар саны','2','4'],['Хромосома жиыны','Диплоид (2n) сақталады','Гаплоид (n)'],['Кроссинговер','Жүрмейді','Жүреді (профаза I)'],['Қай жасушаларда','Соматикалық','Жыныс (гаметалар түзілгенде)']]},
 {type:'num',t:'Есептер',items:[{q:'Адамның соматикалық жасушасында 46 хромосома бар. Сперматозоидта неше хромосома болады?',a:23},{q:'Пиязда 2n = 16. Митоздың анафазасында жасушада неше хромосома (хроматида) болады?',a:32},{q:'Түбір ұшының препаратында 400 жасуша, оның 60-ы бөліну күйінде. Митоздық индекс қанша (%)?',a:15,unit:'%'}]},
 {type:'tf',t:'Ақиқат па, жалған ба?',items:[['Интерфазада ДНҚ репликацияланады.',1],['Мейоздың нәтижесінде генетикалық бірдей жасушалар түзіледі.',0],['Кроссинговер — гомологты хромосомалардың учаскелерімен алмасуы.',1]]}]},
{id:'photo',gr:'10',ic:'☀️',c:'#ca8a04',t:'Фотосинтез және тыныс алу',topic:'Зат және энергия алмасу',tasks:[
 {type:'fill',t:'Фотосинтездің жалпы теңдеуін толықтыр',bank:['CO₂','H₂O','C₆H₁₂O₆','O₂','жарық','хлорофилл'],items:[['6___ + 6H₂O → C₆H₁₂O₆ + 6O₂','CO₂'],['6CO₂ + 6___ → C₆H₁₂O₆ + 6O₂','H₂O'],['6CO₂ + 6H₂O → ___ + 6O₂','C₆H₁₂O₆'],['6CO₂ + 6H₂O → C₆H₁₂O₆ + 6___','O₂'],['Реакция ___ энергиясы мен хлорофилл қатысуымен жүреді.','жарық']]},
 {type:'table',t:'Фотосинтез бен тыныс алуды салыстыр',head:['Белгі','Фотосинтез','Тыныс алу'],rows:[['Органоид','Хлоропласт','Митохондрия'],['Сіңірілетін газ','CO₂','O₂'],['Бөлінетін газ','O₂','CO₂'],['Энергия','Жиналады (сіңіріледі)','Бөлінеді (АТФ)'],['Қашан жүреді','Тек жарықта','Тәулік бойы']]},
 {type:'mcq',t:'Дұрыс жауапты таңда',items:[{q:'Фотосинтездің жарық сатысында не түзіледі?',o:['Глюкоза','АТФ, НАДФ·Н және O₂','CO₂','Крахмал'],a:1},{q:'Кальвин циклі қай жерде жүреді?',o:['Тилакоид мембранасы','Строма','Цитоплазма','Митохондрия матриксі'],a:1},{q:'1 молекула глюкоза толық тотыққанда шамамен неше АТФ түзіледі?',o:['2','4','38','100'],a:2}]}]},
{id:'dna',gr:'11',ic:'🧬',c:'#0284c7',t:'ДНҚ, РНҚ және ақуыз синтезі',topic:'Молекулалық биология',tasks:[
 {type:'text',t:'Комплементарлық принципін қолдан',items:[{q:'ДНҚ тізбегі: А–Т–Г–Ц–Ц–А. Екінші (комплементар) тізбекті жаз.',a:['ТАЦГГТ','Т-А-Ц-Г-Г-Т','Т А Ц Г Г Т']},{q:'ДНҚ матрицалық тізбегі: Т–А–Ц–Г–Г–А. Транскрипцияланған иРНҚ-ны жаз.',a:['АУГЦЦУ','А-У-Г-Ц-Ц-У']}]},
 {type:'num',t:'Чаргафф ережесі бойынша есепте',items:[{q:'ДНҚ-да аденин 22%. Гуанин неше пайыз?',a:28,unit:'%'},{q:'ДНҚ-ның қос тізбекті фрагментінде барлығы 600 нуклеотид бар. Ол неше амин қышқылын кодтайды?',a:100},{q:'Ақуыз 150 амин қышқылынан тұрады. Оны кодтайтын иРНҚ-да неше нуклеотид бар (стоп-кодонсыз)?',a:450}]},
 {type:'match',t:'Терминді анықтамасымен сәйкестендір',pairs:[['Репликация','ДНҚ-ның өзін-өзі екі еселеуі'],['Транскрипция','ДНҚ-дан иРНҚ-ның синтезделуі'],['Трансляция','Рибосомада ақуыз синтезі'],['Кодон','иРНҚ-дағы үш нуклеотид'],['Антикодон','тРНҚ-дағы комплементар үштік']]}]},
{id:'gen',gr:'11',ic:'🫛',c:'#9333ea',t:'Генетика: Мендель заңдары',topic:'Генетика',tasks:[
 {type:'punnett',t:'Пеннет торын толтыр: Aa × Aa (A — сары, a — жасыл бұршақ)',g1:['A','a'],g2:['A','a']},
 {type:'num',t:'Есептер',items:[{q:'Aa × Aa будандастыруда рецессивті белгілі (aa) ұрпақтың үлесі неше пайыз?',a:25,unit:'%'},{q:'Aa × aa талдаушы будандастыруда фенотип бойынша ажырау қандай? (доминантты үлесін % жаз)',a:50,unit:'%'},{q:'AaBb × AaBb дигибридті будандастыруда неше фенотиптік класс түзіледі?',a:4}]},
 {type:'mcq',t:'Дұрыс жауапты таңда',items:[{q:'Мендельдің бірінші заңы:',o:['Ажырау заңы','Бірінші ұрпақтың біркелкілік заңы','Тәуелсіз тұқым қуалау','Тіркесу заңы'],a:1},{q:'Гетерозигота дегеніміз:',o:['AA','aa','Aa','A'],a:2},{q:'Дигибридті будандастыруда F₂-де фенотип бойынша ажырау:',o:['3:1','1:2:1','9:3:3:1','1:1'],a:2}]},
 {type:'open',t:'Ойлан да жаз',q:'Көк көзді (рецессив) әке мен қоңыр көзді гетерозиготалы анадан көк көзді бала туылу ықтималдығы қандай? Шешімін жаз.',model:'Әке — aa, ана — Aa. Гаметалар: a; A және a. Ұрпақ: Aa (қоңыр) — 50%, aa (көк) — 50%. Жауабы: 50%.'}]},
{id:'sys',gr:'8',ic:'🫀',c:'#dc2626',t:'Адам ағзасының мүшелер жүйелері',topic:'Адам анатомиясы',tasks:[
 {type:'table',t:'Кестені толтыр',head:['Мүшелер жүйесі','Негізгі мүшелері','Қызметі'],rows:[['Тыныс алу','Өкпе, кеңірдек, бронхтар','Газ алмасу'],['Қан айналым','Жүрек, қан тамырлары','Заттарды тасымалдау'],['Ас қорыту','Асқазан, ішек, бауыр','Қоректі ыдырату және сіңіру'],['Зәр шығару','Бүйрек, қуық','Зат алмасудың соңғы өнімдерін шығару'],['Жүйке','Ми, жұлын, жүйкелер','Ағзаны реттеу және басқару']]},
 {type:'classify',t:'Мүшелерді жүйесіне бөл',cats:['Ас қорыту','Тыныс алу','Жүйке','Тірек-қимыл'],items:[['Өңеш',0],['Көмей',1],['Мишық',2],['Ортан жілік',3],['Ұйқы безі',0],['Бронхтар',1],['Жұлын',2],['Омыртқа',3],['Бауыр',0],['Диафрагма',1]]},
 {type:'tf',t:'Ақиқат па, жалған ба?',items:[['Адамда 12 жұп қабырға бар.',1],['Өт ұйқы безінде түзіледі.',0],['Мишық қозғалыстарды үйлестіреді.',1],['Эритроциттерде ядро болады.',0]]}]},
{id:'blood',gr:'8',ic:'❤️',c:'#b91c1c',t:'Жүрек және қан айналым',topic:'Қан айналым жүйесі',tasks:[
 {type:'label',t:'Жүректің бөліктерін анықта',svg:'heart',ans:['Оң жүрекше','Сол жүрекше','Оң қарынша','Сол қарынша','Қолқа','Жоғарғы қуыс вена','Жүрекаралық перде']},
 {type:'order',t:'Үлкен қан айналым шеңберінің жолын ретте',items:['Сол қарынша','Қолқа','Артериялар','Ағза ұлпаларындағы капиллярлар','Веналар','Қуыс веналар','Оң жүрекше']},
 {type:'num',t:'Есептер',items:[{q:'Жүрек минутына 70 рет соғады, бір жиырылғанда 70 мл қан айдайды. Минуттық көлем неше литр? (бүтінге дейін)',a:5,tol:.2,unit:'л'},{q:'Жүрек циклі 0,8 с. Минутына неше рет соғады?',a:75}]}]},
{id:'eco',gr:'9–11',ic:'🌍',c:'#059669',t:'Экология: қоректік тізбек және энергия',topic:'Экология',tasks:[
 {type:'order',t:'Қоректік тізбекті құрастыр',items:['Бидай','Тышқан','Жылан','Бүркіт']},
 {type:'classify',t:'Ағзаларды трофикалық деңгейіне бөл',cats:['Продуцент','Консумент','Редуцент'],items:[['Қайың',0],['Түлкі',1],['Шірінді бактериялары',2],['Балдыр',0],['Қоян',1],['Саңырауқұлақ',2],['Шегіртке',1],['Жоңышқа',0]]},
 {type:'num',t:'Экологиялық пирамида ережесі (10%)',items:[{q:'Продуценттердің энергиясы 10 000 кДж. Екінші реттік консументке неше кДж жетеді?',a:100,unit:'кДж'},{q:'Бүркіттің салмағы 5 кг артуы үшін бірінші деңгейде (өсімдік) неше кг биомасса қажет? (тізбек: өсімдік → тышқан → бүркіт)',a:500,unit:'кг'}]},
 {type:'open',t:'Ойлан да жаз',q:'Неліктен қоректік тізбек әдетте 4–5 буыннан аспайды?',model:'Әр трофикалық деңгейге алдыңғы деңгей энергиясының шамамен 10%-ы ғана өтеді, қалғаны тыныс алуға, жылуға жұмсалады. Сондықтан бірнеше буыннан кейін энергия жетпейді.'}]},
{id:'king',gr:'7',ic:'🍄',c:'#ea580c',t:'Тірі ағзалардың әралуандығы',topic:'Систематика',tasks:[
 {type:'classify',t:'Ағзаларды патшалығына бөл',cats:['Бактериялар','Саңырауқұлақтар','Өсімдіктер','Жануарлар'],items:[['Ішек таяқшасы',0],['Ашытқы',1],['Мүк',2],['Медуза',3],['Пеницилл',1],['Қарағай',2],['Бақа',3],['Цианобактерия',0],['Ақ саңырауқұлақ',1],['Папоротник',2]]},
 {type:'match',t:'Систематикалық категорияларды ретімен сәйкестендір (кіші → үлкен)',pairs:[['1','Түр'],['2','Туыс'],['3','Тұқымдас'],['4','Отряд'],['5','Класс']]},
 {type:'mcq',t:'Дұрыс жауапты таңда',items:[{q:'Ядросы жоқ ағзалар:',o:['Саңырауқұлақтар','Бактериялар','Балдырлар','Қарапайымдылар'],a:1},{q:'Саңырауқұлақтардың жасуша қабырғасы тұрады:',o:['Целлюлозадан','Хитиннен','Муреиннен','Крахмалдан'],a:1}]}]},
{id:'flow',gr:'7',ic:'🌸',c:'#db2777',t:'Гүлдің құрылысы және көбеюі',topic:'Ботаника',tasks:[
 {type:'label',t:'Гүлдің бөліктерін анықта',svg:'flower',ans:['Күлте жапырақшасы','Тостағанша','Аналық аузы','Аналық мойны','Түйін','Тозаңқап','Гүл табаны']},
 {type:'fill',t:'Сөйлемдерді толықтыр',bank:['жеміс','тұқым','тозаңдану','ұрықтану','аталық'],items:[['Тозаңның аналық аузына түсуі — ___.','тозаңдану'],['Гаметалардың қосылуы — ___.','ұрықтану'],['Түйіннен ___ дамиды.','жеміс'],['Тұқым бүршігінен ___ дамиды.','тұқым'],['Тозаң ___ тозаңқабында түзіледі.','аталық']]},
 {type:'tf',t:'Ақиқат па, жалған ба?',items:[['Гүлді өсімдіктерге қосарлы ұрықтану тән.',1],['Тостағанша жәндіктерді тартады.',0],['Жел арқылы тозаңданатын гүлдердің күлтесі әдетте ашық түсті.',0]]}]},
{id:'evo',gr:'11',ic:'🦕',c:'#475569',t:'Эволюция ілімі',topic:'Эволюция',tasks:[
 {type:'match',t:'Эволюцияның дәлелдерін мысалмен сәйкестендір',pairs:[['Палеонтологиялық','Археоптерикс қалдықтары'],['Салыстырмалы анатомиялық','Омыртқалылардың алдыңғы аяқтарының гомологиясы'],['Эмбриологиялық','Ұрықтардағы желбезек саңылаулары'],['Рудименттер','Адамның соқыр ішегінің құрт тәрізді өсіндісі'],['Атавизмдер','Адамның көп емшектілігі']]},
 {type:'mcq',t:'Дұрыс жауапты таңда',items:[{q:'Эволюцияның негізгі бағыттаушы факторы (Дарвин бойынша):',o:['Мутация','Табиғи сұрыпталу','Оқшаулану','Популяция толқыны'],a:1},{q:'Эволюцияның элементар бірлігі:',o:['Дара','Түр','Популяция','Биоценоз'],a:2},{q:'Ароморфозға мысал:',o:['Кірпінің тікенегі','Жылықандылық','Кактустың тікенегі','Ақ аюдың түсі'],a:1}]},
 {type:'open',t:'Ойлан да жаз',q:'Ақ қайың көбелегінің (бирюлька) өндірістік аймақтарда қара түрінің көбеюін табиғи сұрыпталу тұрғысынан түсіндір.',model:'Ыстан қарайған ағаш діңінде қара көбелектер құстарға байқалмайды, ал ақ көбелектер көп жойылады. Қара түр көбірек тіршілік етіп, ұрпақ қалдырады — бағытталған (қозғаушы) сұрыпталу.'}]}];

/* ---------- рендер ---------- */
let CUR=null,STATE={};
function card(s,i){return `<button class="wscard" data-i="${i}" style="--c:${s.c}"><span class="wsico">${s.ic}</span><span class="wsgr">${s.gr}-сынып</span><b>${s.t}</b><small>${s.topic} • ${s.tasks.length} тапсырма • ${total(s)} ұпай</small><em>Ашу →</em></button>`}
function count(t){return t.type==='label'?t.ans.length:t.type==='table'?t.rows.length*(t.head.length-1):t.type==='punnett'?4:t.type==='open'?0:(t.items||t.pairs).length}
function total(s){return s.tasks.reduce((a,t)=>a+count(t),0)}
function opts(list,ph){return `<option value="">${ph||'— таңда —'}</option>`+list.map(x=>`<option>${x}</option>`).join('')}
function task(t,k){const n=k+1,head=`<div class="wst"><span class="wsn">${n}</span><b>${t.t}</b><span class="wspt">${count(t)?count(t)+' ұпай':'ойлану'}</span></div>`;let b='';
 if(t.type==='label'){const o=shf(t.ans);b=`<div class="wslab"><div class="wssvg">${SVG[t.svg]()}</div><div class="wsli">${t.ans.map((a,i)=>`<label><span>${i+1}</span><select data-a="${a}">${opts(o)}</select></label>`).join('')}</div></div>`}
 if(t.type==='table'){const cols=t.head.slice(1).map((_,c)=>shf(t.rows.map(r=>r[c+1])));b=`<div class="wstw"><table class="wstab"><tr>${t.head.map(h=>`<th>${h}</th>`).join('')}</tr>${t.rows.map(r=>`<tr><td><b>${r[0]}</b></td>${r.slice(1).map((a,c)=>`<td><select data-a="${a}">${opts(cols[c])}</select></td>`).join('')}</tr>`).join('')}</table></div>`}
 if(t.type==='match'){const R=shf(t.pairs.map((p,i)=>i));b=`<div class="wsmatch"><div>${t.pairs.map((p,i)=>`<div class="wsml"><span>${i+1}</span>${p[0]}<select data-a="${L[R.indexOf(i)]}">${opts(R.map((_,j)=>L[j]),'?')}</select></div>`).join('')}</div><div>${R.map((r,j)=>`<div class="wsmr"><span>${L[j]}</span>${t.pairs[r][1]}</div>`).join('')}</div></div>`}
 if(t.type==='fill'){b=`<div class="wsbank">📦 Сөздер қоры: ${shf(t.bank).map(w=>`<span>${w}</span>`).join('')}</div>${t.items.map((f,i)=>`<p class="wsfill">${i+1}) ${f[0].replace('___',`<input type="text" data-a="${f[1]}" autocomplete="off">`)}</p>`).join('')}`}
 if(t.type==='tf'){b=t.items.map((x,i)=>`<div class="wstf" data-a="${x[1]}"><span>${i+1}) ${x[0]}</span><div><button data-v="1">Ақиқат</button><button data-v="0">Жалған</button></div></div>`).join('')}
 if(t.type==='mcq'){b=t.items.map((x,i)=>`<div class="wsmcq" data-a="${x.a}"><p>${i+1}) ${x.q}</p><div>${x.o.map((o,j)=>`<label><input type="radio" name="m${k}_${i}" value="${j}"> ${'АӘБВ'[j]}) ${o}</label>`).join('')}</div></div>`).join('')}
 if(t.type==='order'){const o=shf(t.items.map((x,i)=>i));b=o.map(i=>`<div class="wsord"><select data-a="${i+1}">${opts(t.items.map((_,j)=>j+1),'№')}</select><span>${t.items[i]}</span></div>`).join('')}
 if(t.type==='classify'){b=`<div class="wscl">${shf(t.items).map(x=>`<label><span>${x[0]}</span><select data-a="${t.cats[x[1]]}">${opts(t.cats)}</select></label>`).join('')}</div>`}
 if(t.type==='num'){b=t.items.map((x,i)=>`<div class="wsnum"><p>${i+1}) ${x.q}</p><div><span>Жауабы:</span><input type="text" inputmode="decimal" data-n="${x.a}" data-t="${x.tol||.01}"> ${x.unit||''}</div></div>`).join('')}
 if(t.type==='text'){b=t.items.map((x,i)=>`<div class="wsnum"><p>${i+1}) ${x.q}</p><div><span>Жауабы:</span><input type="text" style="width:220px" data-s='${JSON.stringify(x.a.map(norm))}' data-show="${x.a[0]}"></div></div>`).join('')}
 if(t.type==='punnett'){b=`<div class="wspun"><table><tr><th>♀ \\ ♂</th>${t.g2.map(g=>`<th>${g}</th>`).join('')}</tr>${t.g1.map(a=>`<tr><th>${a}</th>${t.g2.map(c=>`<td><input type="text" maxlength="3" data-g="${gs(a+c)}"></td>`).join('')}</tr>`).join('')}</table><p class="wshint">💡 Әр торға ұрпақтың генотипін жаз (мыс: AA, Aa, aa).</p></div>`}
 if(t.type==='open'){b=`<p>${t.q}</p><textarea rows="3" placeholder="Жауабыңды осында жаз…"></textarea><div class="wsmodel" hidden>✅ <b>Үлгі жауап:</b> ${t.model}</div>`}
 return `<section class="wstask" data-k="${k}">${head}<div class="wsbody">${b}</div></section>`}
function open(i){const s=S[i];CUR=s;Q('#wsLib').style.display='none';const P=Q('#wsPaper');P.style.display='block';P.style.setProperty('--c',s.c);
 P.innerHTML=`<div class="wsbar"><button class="btn ghost sm" id="wsBack">← Барлық парақтар</button><div class="row" style="gap:6px"><button class="btn sm" id="wsChk">✔ Тексеру</button><button class="btn ghost sm" id="wsAns">👁 Жауаптар</button><button class="btn ghost sm" id="wsClr">↺ Тазалау</button><button class="btn ghost sm" id="wsPrn">🖨 Басып шығару</button></div></div>
 <article class="paper"><header class="phead"><div class="pico">${s.ic}</div><div><small>ЖҰМЫС ПАРАҒЫ • ${s.topic.toUpperCase()} • ${s.gr}-СЫНЫП</small><h2>${s.t}</h2></div><div class="pstamp" id="wsStamp"></div></header>
 <div class="pmeta"><label>Аты-жөні: <input type="text"></label><label>Сыныбы: <input type="text" style="width:70px"></label><label>Күні: <input type="text" style="width:110px" value="${new Date().toLocaleDateString('kk-KZ')}"></label><span>Барлығы: <b>${total(s)}</b> ұпай</span></div>
 ${s.tasks.map(task).join('')}<footer class="pfoot"><div>Бағалау: 85%↑ — «5», 65%↑ — «4», 40%↑ — «3»</div><div id="wsRes"></div></footer></article>`;
 bind();Q('#wsBack').onclick=back;Q('#wsChk').onclick=()=>check(false);Q('#wsAns').onclick=()=>check(true);Q('#wsClr').onclick=()=>open(i);Q('#wsPrn').onclick=()=>window.print();P.scrollIntoView({behavior:'smooth',block:'start'})}
function bind(){QA('#wsPaper .wstf').forEach(r=>QA('button',r).forEach(b=>b.onclick=()=>{QA('button',r).forEach(x=>x.classList.remove('on'));b.classList.add('on');r.dataset.v=b.dataset.v}))}
function mark(el,ok){el.classList.remove('okb','badb');el.classList.add(ok?'okb':'badb')}
function check(show){let sc=0,all=0;const P=Q('#wsPaper');
 QA('select[data-a]',P).forEach(x=>{all++;if(show)x.value=x.dataset.a;const ok=x.value===x.dataset.a;if(ok)sc++;mark(x,ok)});
 QA('input[data-a]',P).forEach(x=>{all++;if(show)x.value=x.dataset.a;const ok=norm(x.value)===norm(x.dataset.a);if(ok)sc++;mark(x,ok)});
 QA('.wstf',P).forEach(r=>{all++;if(show){r.dataset.v=r.dataset.a;QA('button',r).forEach(b=>b.classList.toggle('on',b.dataset.v===r.dataset.a))}const ok=r.dataset.v===r.dataset.a;if(ok)sc++;mark(r,ok)});
 QA('.wsmcq',P).forEach(r=>{all++;if(show){r.querySelector(`input[value="${r.dataset.a}"]`).checked=true}const v=r.querySelector('input:checked');const ok=v&&v.value===r.dataset.a;if(ok)sc++;mark(r,ok)});
 QA('input[data-n]',P).forEach(x=>{all++;if(show)x.value=x.dataset.n;const v=parseFloat(String(x.value).replace(',','.'));const ok=Math.abs(v-(+x.dataset.n))<=(+x.dataset.t);if(ok)sc++;mark(x,ok)});
 QA('input[data-s]',P).forEach(x=>{all++;if(show)x.value=x.dataset.show;const A=JSON.parse(x.dataset.s);const v=norm(x.value),v2=v.replace(/\s/g,'');const ok=A.some(a=>a===v||a.replace(/\s/g,'')===v2);if(ok)sc++;mark(x,ok)});
 QA('input[data-g]',P).forEach(x=>{all++;if(show)x.value=x.dataset.g;const v=x.value.trim().replace(/а/g,'a').replace(/А/g,'A');const ok=v.length===2&&gs(v)===x.dataset.g;if(ok)sc++;mark(x,ok)});
 QA('.wsmodel',P).forEach(m=>m.hidden=false);
 const p=all?Math.round(sc/all*100):0,g=p>=85?5:p>=65?4:p>=40?3:2;Q('#wsRes').innerHTML=show?'👁 Дұрыс жауаптар көрсетілді':`Нәтиже: <b>${sc} / ${all}</b> (${p}%)`;
 const st=Q('#wsStamp');st.className='pstamp on g'+g;st.innerHTML=show?'<b>✓</b><small>жауаптар</small>':`<b>${g}</b><small>${['','','қайталау керек','жақсы','өте жақсы','үздік!'][g]}</small>`}
function back(){Q('#wsPaper').style.display='none';Q('#wsLib').style.display='block'}
function lib(){const G=['Барлығы',...new Set(S.map(s=>s.topic))];Q('#wsLib').innerHTML=`<div class="wsfilter">${G.map((g,i)=>`<button class="${i?'':'on'}" data-g="${g}">${g}</button>`).join('')}</div><div class="wsgrid">${S.map(card).join('')}</div>`;
 QA('#wsLib .wscard').forEach(b=>b.onclick=()=>open(+b.dataset.i));QA('#wsLib .wsfilter button').forEach(b=>b.onclick=()=>{QA('#wsLib .wsfilter button').forEach(x=>x.classList.toggle('on',x===b));QA('#wsLib .wscard').forEach(c=>{const s=S[+c.dataset.i];c.style.display=b.dataset.g==='Барлығы'||s.topic===b.dataset.g?'':'none'})})}
lib();window.__ws={S,open};
})();
