// Claude Code 架构解析 — 共享 JS
// 折叠展开
function toggleCollapsible(el){
  el.classList.toggle('open');
  const body=el.nextElementSibling;
  body.classList.toggle('show');
  if(body.classList.contains('show')&&window.Prism){Prism.highlightAllUnder(body);}
}
// 回到顶部
window.addEventListener('scroll',()=>{
  const btn=document.getElementById('backTop');
  if(btn)btn.classList.toggle('show',window.scrollY>400);
});
// 侧边栏导航高亮（仅页内锚点）
document.addEventListener('DOMContentLoaded',()=>{
  const navItems=document.querySelectorAll('.nav-item[href^="#"]');
  const sections=document.querySelectorAll('.section');
  if(sections.length>0){
    const observer=new IntersectionObserver(entries=>{
      entries.forEach(e=>{
        if(e.isIntersecting){
          navItems.forEach(n=>n.classList.remove('active'));
          const id=e.target.id;
          const active=document.querySelector(`.nav-item[href="#${id}"]`);
          if(active)active.classList.add('active');
        }
      });
    },{rootMargin:'-80px 0px -60% 0px',threshold:0.1});
    sections.forEach(s=>observer.observe(s));
  }
  // 标记当前页面的导航项
  const currentPage=location.pathname.split('/').pop()||'index.html';
  document.querySelectorAll('.nav-item').forEach(n=>{
    const href=n.getAttribute('href')||'';
    if(href.includes(currentPage)&&!href.startsWith('#')){
      n.classList.add('active');
    }
  });
  // 移动端侧边栏点击关闭
  document.querySelectorAll('.nav-item').forEach(n=>n.addEventListener('click',()=>{
    document.querySelector('.sidebar').classList.remove('open');
  }));
  // 初始代码高亮
  if(window.Prism)Prism.highlightAll();
});
// 搜索
function handleSearch(q){
  q=q.toLowerCase().trim();
  document.querySelectorAll('.section').forEach(s=>{
    if(!q){s.style.display='';return;}
    s.style.display=s.textContent.toLowerCase().includes(q)?'':'none';
  });
}
