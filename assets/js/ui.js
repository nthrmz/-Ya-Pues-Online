document.addEventListener('DOMContentLoaded',()=>{
  document.body.classList.add('page-transition');
  const savedTheme=localStorage.getItem('yaPuesTheme')||'light';
  const themeBtn=document.querySelector('[data-theme-toggle]');
  const themedLogos=document.querySelectorAll('.brand img, .hero-logo, .art-logo');
  const setLogoMode=()=>{
    const dark=document.body.classList.contains('dark-mode');
    themedLogos.forEach(img=>{
      img.src = dark ? 'recursos/logo-blanco.png' : 'recursos/logo.png';
      img.style.filter = dark ? 'drop-shadow(0 12px 0 rgba(0,0,0,.16))' : '';
    });
  };
  const renderThemeSwitch=()=>{
    if(!themeBtn) return;
    const dark=document.body.classList.contains('dark-mode');
    themeBtn.classList.add('theme-switch');
    themeBtn.setAttribute('aria-pressed', dark ? 'true' : 'false');
    themeBtn.innerHTML = `<span class="switch-track"><span class="switch-knob">${dark?'☾':'☀'}</span></span><span class="switch-text">${dark?'Claro':'Oscuro'}</span>`;
    setLogoMode();
  };
  if(savedTheme==='dark') document.body.classList.add('dark-mode');
  renderThemeSwitch();
  themeBtn?.addEventListener('click',()=>{
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('yaPuesTheme',document.body.classList.contains('dark-mode')?'dark':'light');
    renderThemeSwitch();
  });

  const btn=document.querySelector('[data-menu-toggle]'), menu=document.querySelector('[data-menu]');
  btn?.addEventListener('click',()=>menu?.classList.toggle('show'));
  const current=(location.pathname.split('/').pop()||'index.html');
  document.querySelectorAll('.nav-link-yp').forEach(a=>{ if(a.getAttribute('href')===current) a.classList.add('active') });

  const items=document.querySelectorAll('.scroll-reveal, .card-hover, .merch-card');
  const io=new IntersectionObserver((entries)=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-visible');io.unobserve(e.target)}}),{threshold:.12, rootMargin:'0px 0px -40px 0px'});
  items.forEach(el=>io.observe(el));

  document.querySelectorAll('a[href$=".html"]').forEach(link=>{
    if(link.target || link.hasAttribute('download')) return;
    link.addEventListener('click',(ev)=>{
      const href=link.getAttribute('href');
      if(!href || href===current) return;
      ev.preventDefault();
      document.body.classList.add('is-leaving');
      setTimeout(()=>{ location.href=href; },180);
    });
  });
});
