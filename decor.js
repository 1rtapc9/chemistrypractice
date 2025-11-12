const bgSection=document.getElementById("backgroundArticles");
function spawnArticleTip(){
  const article=ARTICLES[Math.floor(Math.random()*ARTICLES.length)];
  const tip=document.createElement("div");
  tip.classList.add("article-tip");
  tip.textContent=article;
  tip.style.left=Math.random()*80+"%";
  tip.style.top=Math.random()*80+"%";
  tip.style.animationDuration=(Math.random()*15+10)+"s";
  bgSection.appendChild(tip);
  setTimeout(()=>tip.remove(),25000);
}
setInterval(spawnArticleTip,4000);
