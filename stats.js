let stats={correct:0,incorrect:0,topics:{}};
const statsModal=document.getElementById("statsModal");
const statsContent=document.getElementById("statsContent");
document.getElementById("statsBtn").addEventListener("click",()=>{updateStats(); statsModal.style.display="block";});
document.querySelector(".close").addEventListener("click",()=>{statsModal.style.display="none";});
window.addEventListener("click",e=>{if(e.target===statsModal) statsModal.style.display="none";});

function recordStat(mode,isCorrect){
  stats[isCorrect?"correct":"incorrect"]++;
  if(!stats.topics[mode]) stats.topics[mode]={correct:0,incorrect:0};
  stats.topics[mode][isCorrect?"correct":"incorrect"]++;
}

function updateStats(){
  let html=`<p>Total Correct: ${stats.correct}</p><p>Total Incorrect: ${stats.incorrect}</p>`;
  html+="<ul>";
  for(let topic in stats.topics){
    const t=stats.topics[topic];
    const acc=t.correct+t.incorrect?Math.round(100*t.correct/(t.correct+t.incorrect))+"%":"N/A";
    html+=`<li>${topic}: ${acc} accuracy (${t.correct}/${t.correct+t.incorrect})</li>`;
  }
  html+="</ul>";
  statsContent.innerHTML=html;
}

// Hook into logic.js
const originalSubmitAnswer=submitAnswer;
submitAnswer=function(){
  const mode=document.getElementById("mode").value;
  const input=document.getElementById("answerInput").value;
  const correct=currentQuestion?currentQuestion.canonicalAnswer:"";
  const isCorrect=(normalize(input)===normalize(correct));
  recordStat(mode,isCorrect);
  originalSubmitAnswer();
}
