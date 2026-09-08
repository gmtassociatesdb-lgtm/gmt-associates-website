const toggle=document.querySelector('.mobile-toggle');
const nav=document.querySelector('.nav-links');
function setMenu(open){nav.classList.toggle('open',open);document.body.classList.toggle('menu-open',open);toggle.setAttribute('aria-expanded',String(open));}
if(toggle&&nav){toggle.addEventListener('click',()=>setMenu(!nav.classList.contains('open')));nav.addEventListener('click',e=>{if(e.target.closest('a'))setMenu(false)});document.addEventListener('keydown',e=>{if(e.key==='Escape'&&nav.classList.contains('open')){setMenu(false);toggle.focus()}});}
document.querySelectorAll('.filter').forEach(btn=>{btn.setAttribute('aria-pressed',String(btn.classList.contains('active')));btn.addEventListener('click',()=>{
 document.querySelectorAll('.filter').forEach(b=>{b.classList.toggle('active',b===btn);b.setAttribute('aria-pressed',String(b===btn))});
 const f=btn.dataset.filter;document.querySelectorAll('[data-category]').forEach(card=>{card.style.display=(f==='all'||card.dataset.category===f)?'':'none'});
});});
document.querySelectorAll('[data-year]').forEach(y=>y.textContent=new Date().getFullYear());
function inquiryUrl(d){const body=[
 'Name: '+(d.get('name')||''),'Company: '+(d.get('company')||''),'Email: '+(d.get('email')||''),'Phone: '+(d.get('phone')||''),'Project Location: '+(d.get('location')||''),'Project Type: '+(d.get('type')||''),'Target Start: '+(d.get('start')||''),'','Project Details:',d.get('message')||''
 ].join('\n');return 'mailto:gmtdevelops@gmail.com?subject='+encodeURIComponent('GMT Website Project Inquiry')+'&body='+encodeURIComponent(body);}
const form=document.querySelector('#project-form');if(form){form.addEventListener('submit',e=>{e.preventDefault();if(!form.reportValidity())return;window.location.href=inquiryUrl(new FormData(form));document.querySelector('#inquiry-status').textContent='Review and send the message in your email app. If it did not open, use the direct email link above. Your entries remain here.';});}
const revealObserver=('IntersectionObserver' in window)?new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('in-view');revealObserver.unobserve(entry.target)}})},{threshold:.12}):null;
document.querySelectorAll('.reveal').forEach(el=>{if(revealObserver)revealObserver.observe(el);else el.classList.add('in-view')});
