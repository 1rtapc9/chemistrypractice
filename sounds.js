const soundCorrect = new Audio(CONFIG.sound.correct);
const soundWrong = new Audio(CONFIG.sound.wrong);

function playSound(isCorrect){
  if(!CONFIG.sound.enabled) return;
  if(isCorrect) soundCorrect.play(); else soundWrong.play();
}

document.getElementById("soundToggle").addEventListener("click", ()=>{
  CONFIG.sound.enabled = !CONFIG.sound.enabled;
  document.getElementById("soundToggle").textContent = CONFIG.sound.enabled ? "🔊" : "🔇";
});
