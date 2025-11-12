const analyticsModal=document.getElementById("analyticsModal");
const analyticsContent=document.getElementById("analyticsContent");
analyticsModal.querySelector(".close").addEventListener("click",()=>analyticsModal.style.display="none");

function displayAnalytics(){
  const topicData=JSON.parse(localStorage.getItem("topicData")||"{}");
  const dailyStreak=parseInt(localStorage.getItem("streak")||0);
  let html="<ul>";
  for(const topic in topicData){
    const t=topicData[topic];
    html+=`<li>${topic.charAt(0).toUpperCase()+topic.slice(1)}: ${t.correct}/${t.total} correct (${Math.round(t.correct/t.total*100)}%)</li>`;
  }
  html+="</ul>";
  analyticsContent.innerHTML=`<p>Current Streak: ${dailyStreak}</p>${html}`;
}

document.getElementById("analyticsBtn").addEventListener("click",displayAnalytics);
function updateAnalytics(q,isCorrect){ stats.js.updateAnalytics(q,isCorrect); } // reuse stats logic
