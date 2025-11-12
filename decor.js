const funVisuals=document.getElementById("funVisuals");
function createBubble(){
  const bubble=document.createElement("div");
  bubble.classList.add("bubble");
  bubble.style.left=Math.random()*100+"%";
  bubble.style.width=bubble.style.height=(Math.random()*30+20)+"px";
  bubble.style.background=`rgba(0,191,166,${Math.random()*0.5+0.3})`;
  funVisuals.appendChild(bubble);
  let top=-50;
  const id=setInterval(()=>{
    top+=Math.random()*2+1;
    bubble.style.top=top+"px";
    if(top>window.innerHeight){
      bubble.remove();
      clearInterval(id);
    }
  },20);
}
setInterval(createBubble,300);

document.querySelectorAll(".question-box").forEach(box=>{
  box.addEventListener("mouseenter",()=>box.style.transform="scale(1.02)");
  box.addEventListener("mouseleave",()=>box.style.transform="scale(1)");
});
