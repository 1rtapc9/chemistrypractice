function spawnRotatingIcon(){
  const icon=document.createElement("div");
  const emojis=["⚛️","🧪","🧬","🧫","🔬","🌡️"];
  icon.textContent=emojis[Math.floor(Math.random()*emojis.length)];
  icon.style.position="absolute";
  icon.style.left=Math.random()*90+"%";
  icon.style.top=Math.random()*90+"%";
  icon.style.fontSize=(Math.random()*30+20)+"px";
  icon.style.transform="rotate(0deg)";
  document.body.appendChild(icon);
  let angle=0;
  const interval=setInterval(()=>{
    angle+=5; icon.style.transform=`rotate(${angle}deg)`;
  },50);
  setTimeout(()=>{clearInterval(interval); icon.remove();},5000);
}
setInterval(spawnRotatingIcon,7000);
