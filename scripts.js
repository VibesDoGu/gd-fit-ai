const sidebar=document.getElementById('sidebar');
document.getElementById('menuBtn').addEventListener('click',()=>sidebar.classList.toggle('open'));
document.getElementById('themeBtn').addEventListener('click',()=>{document.body.classList.toggle('light');localStorage.setItem('gdTheme',document.body.classList.contains('light')?'light':'dark')});
if(localStorage.getItem('gdTheme')==='light')document.body.classList.add('light');

const toast=document.getElementById('toast');
document.querySelectorAll('.copy').forEach(btn=>btn.addEventListener('click',async()=>{
  const text=document.getElementById(btn.dataset.target).innerText.trim();
  try{await navigator.clipboard.writeText(text)}catch(e){const t=document.createElement('textarea');t.value=text;document.body.appendChild(t);t.select();document.execCommand('copy');t.remove()}
  const old=btn.textContent;btn.textContent='Copiado ✓';toast.classList.add('show');setTimeout(()=>{btn.textContent=old;toast.classList.remove('show')},1700);
}));

const buttons=[...document.querySelectorAll('.complete')];
const saved=JSON.parse(localStorage.getItem('gdStages')||'[]');
saved.forEach(n=>{const b=document.querySelector(`[data-stage="${n}"]`);if(b){b.classList.add('done');b.textContent='Concluída ✓'}});
function update(){const done=buttons.filter(b=>b.classList.contains('done')).length,p=Math.round(done/buttons.length*100);document.getElementById('progressBar').style.width=p+'%';document.getElementById('progressText').textContent=p+'%';localStorage.setItem('gdStages',JSON.stringify(buttons.filter(b=>b.classList.contains('done')).map(b=>+b.dataset.stage)))}
buttons.forEach(b=>b.addEventListener('click',()=>{b.classList.toggle('done');b.textContent=b.classList.contains('done')?'Concluída ✓':'Marcar como concluída';update()}));update();

const links=[...document.querySelectorAll('.sidebar nav a')];
window.addEventListener('scroll',()=>{let current='inicio';document.querySelectorAll('section[id]').forEach(s=>{if(scrollY>=s.offsetTop-180)current=s.id});links.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+current))});

const recommendationsBtn=document.getElementById('recommendationsBtn');
const recommendationsModal=document.getElementById('recommendationsModal');
function openRecommendations(){recommendationsModal.classList.add('open');recommendationsModal.setAttribute('aria-hidden','false');document.body.classList.add('modal-open')}
function closeRecommendations(){recommendationsModal.classList.remove('open');recommendationsModal.setAttribute('aria-hidden','true');document.body.classList.remove('modal-open')}
recommendationsBtn?.addEventListener('click',openRecommendations);
document.querySelectorAll('[data-close-recommendations]').forEach(el=>el.addEventListener('click',closeRecommendations));
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&recommendationsModal?.classList.contains('open'))closeRecommendations()});


/* Imagens configuráveis do Apps Script */
document.querySelectorAll('img[data-optional-image]').forEach(img => {
  const wrapper = img.closest('.featured-image, .tip-image, .recommendation-image');
  const fallback = wrapper?.querySelector('.image-file-label, span');
  const src = (img.getAttribute('src') || '').trim();

  if (!src) {
    img.style.display = 'none';
    if (fallback) fallback.style.display = '';
    return;
  }

  img.addEventListener('load', () => {
    if (fallback) fallback.style.display = 'none';
  });

  img.addEventListener('error', () => {
    img.style.display = 'none';
    if (fallback) fallback.style.display = '';
  });
});
