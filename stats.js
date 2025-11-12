const statsModal=document.getElementById("statsModal");
const statsContent=document.getElementById("statsContent");
statsModal.querySelector(".close").addEventListener("click",()=>statsModal.style.display="none");

function updateStats(){
  const correct=localStorage.getItem("totalCorrect")||0;
  const total=localStorage.getItem("totalAnswered")||0;
  const streak=localStorage.getItem("streak")||0;
  statsContent.innerHTML=`
    <p>Total Questions Answered: ${total}</p>
    <p>Total Correct: ${correct}</p>
    <p>Current Streak: ${streak}</p>
    <p>Accuracy: ${total>0?Math.round(correct/total*100):0}%</p>
  `;
}
document.getElementById("statsBtn").addEventListener("click",updateStats);

function updateAnalytics(q,isCorrect){
  let totalAnswered=parseInt(localStorage.getItem("totalAnswered")||0);
  let totalCorrect=parseInt(localStorage.getItem("totalCorrect")||0);
  totalAnswered++; if(isCorrect) totalCorrect++;
  localStorage.setItem("totalAnswered",totalAnswered);
  localStorage.setItem("totalCorrect",totalCorrect);

  const topic=document.getElementById("mode").value;
  let topicData=JSON.parse(localStorage.getItem("topicData")||"{}");
  if(!topicData[topic]) topicData[topic]={correct:0,total:0};
  topicData[topic].total++;
  if(isCorrect) topicData[topic].correct++;
  localStorage.setItem("topicData",JSON.stringify(topicData));
}
