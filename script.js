
const toggle=document.querySelector('.mobile-toggle');
const nav=document.querySelector('.nav-links');
if(toggle&&nav){toggle.addEventListener('click',()=>{nav.classList.toggle('open');document.body.classList.toggle('menu-open')});}
document.querySelectorAll('.filter').forEach(btn=>btn.addEventListener('click',()=>{
 document.querySelectorAll('.filter').forEach(b=>b.classList.remove('active'));btn.classList.add('active');
 const f=btn.dataset.filter;document.querySelectorAll('[data-category]').forEach(card=>{card.style.display=(f==='all'||card.dataset.category===f)?'':'none'});
}));
const y=document.querySelector('[data-year]');if(y)y.textContent=new Date().getFullYear();
const form=document.querySelector('#project-form');if(form){form.addEventListener('submit',e=>{e.preventDefault();const d=new FormData(form);const body=[
 'Name: '+(d.get('name')||''),'Company: '+(d.get('company')||''),'Email: '+(d.get('email')||''),'Phone: '+(d.get('phone')||''),'Project Location: '+(d.get('location')||''),'Project Type: '+(d.get('type')||''),'Target Start: '+(d.get('start')||''),'','Project Details:',d.get('message')||''
 ].join('\n');window.location.href='mailto:gmtdemo2@gmail.com?subject='+encodeURIComponent('GMT Website Project Inquiry')+'&body='+encodeURIComponent(body);});}

// V4 subtle scroll-reveal motion. Content remains fully usable without JS.
const revealObserver=('IntersectionObserver' in window)?new IntersectionObserver(entries=>{
 entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('in-view');revealObserver.unobserve(entry.target);}})
},{threshold:.12}):null;
document.querySelectorAll('.reveal').forEach(el=>{if(revealObserver)revealObserver.observe(el);else el.classList.add('in-view')});
