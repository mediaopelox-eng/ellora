document.addEventListener("DOMContentLoaded",()=>{
  setTimeout(()=>document.body.classList.add("loaded"),700);

  const nav=document.getElementById("mainNav");
  const progress=document.querySelector(".scroll-progress");
  window.addEventListener("scroll",()=>{
    nav.classList.toggle("scrolled",window.scrollY>60);
    const h=document.documentElement.scrollHeight-window.innerHeight;
    progress.style.width=(window.scrollY/h*100)+"%";
  });

  const observer=new IntersectionObserver((entries)=>{
    entries.forEach((entry,i)=>{
      if(entry.isIntersecting){
        setTimeout(()=>entry.target.classList.add("visible"),i*45);
        observer.unobserve(entry.target);
      }
    });
  },{threshold:.12});
  document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));

  document.querySelectorAll("[data-count]").forEach(el=>{
    const target=+el.dataset.count;
    const io=new IntersectionObserver(([entry])=>{
      if(!entry.isIntersecting)return;
      let start=0, duration=1000, startTime=null;
      function tick(t){
        if(!startTime)startTime=t;
        const p=Math.min((t-startTime)/duration,1);
        el.textContent=Math.floor(p*target)+(target===1?"":"");
        if(p<1)requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);io.disconnect();
    });
    io.observe(el);
  });



});