const funVisuals=document.getElementById("funVisuals");

function createBubble(){
  const b=document.createElement("div");
  b.classList.add("bubble");
  const size=Math.random()*(CONFIG.bubble.maxSize-CONFIG.bubble.minSize)+CONFIG.bubble.minSize;
  b.style.width=b.style.height=size+"px";
  b.style.left=Math.random()*100+"%";
  b.style.bottom="-50px";
  const speed=Math.random()*(CONFIG.bubble.maxSpeed-CONFIG.bubble.minSpeed)+CONFIG.bubble.minSpeed;
  funVisuals.appendChild(b);

  let pos=-50;
  function animate(){
    pos+=speed;
    b.style.bottom=pos+"px";
    if(pos<window.innerHeight+50) requestAnimationFrame(animate);
    else b.remove();
  }
  animate();
}

setInterval(createBubble, CONFIG.bubble.spawnInterval);

document.querySelectorAll(".question-box").forEach(box=>{
  box.addEventListener("mouseenter",()=>box.style.transform="scale(1.02)");
  box.addEventListener("mouseleave",()=>box.style.transform="scale(1)");
});
