const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const scenes=['intro','door','room','letter','notes','question','memories','wish','gift','final'];
let musicOn=false, notes=0, secret=0;
const music=$('#music'); music.volume=.30;
function show(id){scenes.forEach(x=>$('#'+x)?.classList.toggle('active',x===id));window.scrollTo(0,0);}
function stars(){const s=$('#stars');for(let i=0;i<105;i++){let e=document.createElement('i');e.className='star';e.style.left=Math.random()*100+'%';e.style.top=Math.random()*100+'%';let z=1+Math.random()*2;e.style.width=e.style.height=z+'px';e.style.animationDelay=Math.random()*4+'s';s.append(e)}}stars();
async function play(){try{await music.play();musicOn=true;$('#musicBtn').classList.add('on');$('#musicBtn').innerHTML='♫ <span>music on</span>'}catch{$('#musicBtn').innerHTML='♪ <span>tap again</span>'}}
async function toggle(){if(musicOn){music.pause();musicOn=false;$('#musicBtn').classList.remove('on');$('#musicBtn').innerHTML='♪ <span>music</span>'}else await play()}
$('#musicBtn').onclick=toggle;
$('#enter').onclick=async()=>{await play();show('door')};
$$('.next').forEach(b=>b.onclick=()=>show(b.dataset.next));
function toast(t){const x=$('#toast');x.textContent=t;x.classList.add('show');clearTimeout(toast.t);toast.t=setTimeout(()=>x.classList.remove('show'),2200)}
$('#lamp').onclick=()=>{document.querySelector('.room').classList.toggle('dark');toast(document.querySelector('.room').classList.contains('dark')?'Just a little moonlight. 🌙':'Warm again. ✨')};
$$('.balloons button').forEach(b=>b.onclick=()=>{b.animate([{transform:'translateY(0)'},{transform:'translateY(-28px)'},{transform:'translateY(0)'}],{duration:650});toast(b.dataset.text)});
$('#roomGift').onclick=()=>{toast('Not yet... the big gift is waiting later 🎁')};
$('#roomCard').onclick=()=>show('letter');
$('#notesNext').onclick=()=>show('question');
$$('.note').forEach(n=>n.onclick=()=>{if(!n.classList.contains('open')){n.classList.add('open');notes++;$('#noteStatus').textContent=`${notes} / 6 opened`;if(notes>=4)$('#notesNext').classList.remove('hidden')}});
$$('.choices button').forEach(b=>b.onclick=()=>{$$('.choices button').forEach(x=>x.classList.remove('selected'));b.classList.add('selected');let a={soft:'Yep. That one sounds very you. 🤍',chaos:'Honestly... fair. 😂',sun:'Then I hope this year gives you exactly that.'}[b.dataset.answer];$('#questionResult').textContent=a;$('#questionNext').classList.remove('hidden')});
$('#questionNext').onclick=()=>show('memories');
$('#wishBtn').onclick=()=>{if($('#wishBtn').disabled)return;$('#wishBtn').disabled=true;$('#wishBtn').textContent='wish made ✦';$('.big-cake').classList.add('blown');$('#wishResult').textContent='I hope it finds its way to you. 🤍';setTimeout(()=>show('gift'),2200)};
$('#bigGift').onclick=()=>{$('#bigGift').classList.add('open');$('#giftHint').textContent='A little closer...';setTimeout(()=>{$('#giftMsg').classList.remove('hidden');$('#giftHint').classList.add('hidden')},650)};
$('#finalBtn').onclick=()=>{show('final');setTimeout(()=>$('#ending').classList.remove('hidden'),5000)};
$('#replay').onclick=()=>{notes=0;$$('.note').forEach(x=>x.classList.remove('open'));$('#noteStatus').textContent='0 / 6 opened';$('#notesNext').classList.add('hidden');$$('.choices button').forEach(x=>x.classList.remove('selected'));$('#questionResult').textContent='';$('#questionNext').classList.add('hidden');$('#wishBtn').disabled=false;$('#wishBtn').textContent='make the wish ✦';$('#wishResult').textContent='';$('.big-cake').classList.remove('blown');$('#bigGift').classList.remove('open');$('#giftMsg').classList.add('hidden');$('#giftHint').classList.remove('hidden');$('#giftHint').textContent='tap the gift';show('intro')};
const modal=$('#modal');document.addEventListener('keydown',e=>{if(e.key==='Escape')modal.classList.add('hidden')});
// Secret: tap the moon in the room three times.
$('.moon').onclick=()=>{secret++;if(secret>=3){secret=0;$('#modalText').textContent='You found the secret moon. 🌙\nHappy Birthday, Dardoura. 🤍';modal.classList.remove('hidden')}};
$('#close').onclick=()=>modal.classList.add('hidden');modal.onclick=e=>{if(e.target===modal)modal.classList.add('hidden')};
