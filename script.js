const toggle=document.querySelector('.mobile-toggle');
const nav=document.querySelector('.nav-links');
function setMenu(open){nav.classList.toggle('open',open);document.body.classList.toggle('menu-open',open);toggle.setAttribute('aria-expanded',String(open));}
if(toggle&&nav){toggle.addEventListener('click',()=>setMenu(!nav.classList.contains('open')));nav.addEventListener('click',e=>{if(e.target.closest('a'))setMenu(false)});document.addEventListener('keydown',e=>{if(e.key==='Escape'&&nav.classList.contains('open')){setMenu(false);toggle.focus()}});}
document.querySelectorAll('.filter').forEach(btn=>{btn.setAttribute('aria-pressed',String(btn.classList.contains('active')));btn.addEventListener('click',()=>{
 document.querySelectorAll('.filter').forEach(b=>{b.classList.toggle('active',b===btn);b.setAttribute('aria-pressed',String(b===btn))});
 const f=btn.dataset.filter;document.querySelectorAll('[data-category]').forEach(card=>{card.style.display=(f==='all'||card.dataset.category===f)?'':'none'});
});});
document.querySelectorAll('[data-year]').forEach(y=>y.textContent=new Date().getFullYear());
const inquiryRecipient = 'gmtdevelops@gmail.com';
function inquiryBody(data) {
 return [
  'Name: ' + (data.get('name') || ''),
  'Company: ' + (data.get('company') || ''),
  'Email: ' + (data.get('email') || ''),
  'Phone: ' + (data.get('phone') || ''),
  'Project location: ' + (data.get('location') || ''),
  'Project type: ' + (data.get('type') || 'Not specified'),
  'Project stage: ' + (data.get('stage') || 'Not specified'),
  'Target start: ' + (data.get('start') || ''),
  'Drawing / project link: ' + (data.get('drawings') || ''),
  '', 'Project details:', data.get('message') || ''
 ].join('\n');
}
function inquirySubject(data) {
 return data.get('type') === 'Specialty Recreation / D-BAT'
  ? 'GMT Website — D-BAT Project Inquiry' : 'GMT Website Project Inquiry';
}
function inquiryUrl(data) {
 return 'mailto:' + inquiryRecipient + '?subject=' + encodeURIComponent(inquirySubject(data)) + '&body=' + encodeURIComponent(inquiryBody(data));
}
const form = document.querySelector('#project-form');
if (form) {
 const status = document.querySelector('#inquiry-status');
 const fallback = document.querySelector('#inquiry-fallback');
 const draft = document.querySelector('#inquiry-draft');
 const copyButton = document.querySelector('#copy-inquiry');
 const params = new URLSearchParams(window.location.search);
 if (params.get('type') === 'dbat') form.elements.type.value = 'Specialty Recreation / D-BAT';
 if (params.get('topic') === 'qualifications') form.elements.message.value = 'I would like to discuss the qualification documents needed for our project.';
 function showDraft(data) {
  draft.value = 'To: ' + inquiryRecipient + '\nSubject: ' + inquirySubject(data) + '\n\n' + inquiryBody(data);
  fallback.hidden = false;
 }
 form.addEventListener('submit', event => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  const data = new FormData(form);
  showDraft(data);
  // Long mailto URLs can be truncated by mail clients. Keep the complete draft available.
  const url = inquiryUrl(data);
  if (url.length > 1800) {
   status.textContent = 'Your inquiry is ready below. It is too long to reliably open in an email app. Copy the draft into your email and send it to ' + inquiryRecipient + '. Nothing has been sent yet.';
   draft.focus();
   return;
  }
  window.location.href = url;
  status.textContent = 'Your draft is ready. Review and send it in your email app. If it did not open, use Copy Inquiry or the draft below. Nothing has been sent by this page.';
 });
 copyButton.addEventListener('click', async () => {
  if (!form.reportValidity()) return;
  showDraft(new FormData(form));
  try {
   await navigator.clipboard.writeText(draft.value);
   status.textContent = 'Inquiry copied. Paste it into your email, review it, and send it to ' + inquiryRecipient + '. Nothing has been sent yet.';
  } catch {
   draft.focus();
   draft.select();
   status.textContent = 'Your draft is selected below. Copy it, paste it into your email, and send it to ' + inquiryRecipient + '. Nothing has been sent yet.';
  }
 });
 form.addEventListener('input', () => {
  status.textContent = '';
  if (!fallback.hidden) showDraft(new FormData(form));
 });
}
const revealObserver=('IntersectionObserver' in window)?new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('in-view');revealObserver.unobserve(entry.target)}})},{threshold:.12}):null;
document.querySelectorAll('.reveal').forEach(el=>{if(revealObserver)revealObserver.observe(el);else el.classList.add('in-view')});

// Rotate the approved Irwin photographs every five seconds after loading.
const slideshow = document.querySelector('.hero-slideshow');
if (slideshow) {
 const photos = ['irwin-interior-09.jpg', 'irwin-interior-24.jpg', 'irwin-aerial-0022.jpg'];
 const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
 let slide = 0, rotation = null, ready = false, paused = false;
 const control = document.querySelector('.slideshow-control');
 function updateControl() {
  if (!control) return;
  control.hidden = !ready || motion.matches;
  control.textContent = paused ? 'Resume background rotation' : 'Pause background rotation';
  control.setAttribute('aria-pressed', String(paused));
 }
 if (control) control.addEventListener('click', () => { paused = !paused; scheduleRotation(); });
 function scheduleRotation() {
  clearInterval(rotation);
  updateControl();
  if (!ready || paused || motion.matches || document.hidden) return;
  rotation = setInterval(() => {
   slide = (slide + 1) % photos.length;
   slideshow.style.backgroundImage = 'url("' + photos[slide] + '")';
  }, 5000);
 }
 Promise.all(photos.map(src => new Promise(resolve => {
  const image = new Image();
  image.onload = () => resolve(true);
  image.onerror = () => resolve(false);
  image.src = src;
 }))).then(loaded => { ready = loaded.every(Boolean); scheduleRotation(); });
 document.addEventListener('visibilitychange', scheduleRotation);
 motion.addEventListener('change', scheduleRotation);
}
