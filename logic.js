let QUESTIONS = {};
let grade = parseInt(localStorage.getItem("grade")||"6");
let streak = parseInt(localStorage.getItem("streak")||"0");
let usedQuestions = {};
let currentQuestion = null;

function normalize(str){return str.trim().toLowerCase().replace(/\.$/,"");}

function saveProgress(){
  localStorage.setItem("grade",grade);
  localStorage.setItem("streak",streak);
}

function availableQuestions(mode){
  let pool = QUESTIONS[mode] && QUESTIONS[mode][grade]?QUESTIONS[mode][grade]:[];
  return pool.filter(q=>!usedQuestions[mode]?.[grade]?.includes(q.prompt));
}

function pickRandomQuestion(){
  const mode=document.getElementById("mode").value;
  if(!usedQuestions[mode]) usedQuestions[mode]={};
  if(!usedQuestions[mode][grade]) usedQuestions[mode][grade]=[];
  let pool=availableQuestions(mode);

  if(pool.length===0 && grade<12){ grade++; saveProgress(); pool=availableQuestions(mode);}
  if(pool.length===0 && grade>6){ grade--; saveProgress(); pool=availableQuestions(mode);}
  if(pool.length===0){ document.getElementById("questionPrompt").textContent="All questions completed!"; return;}

  currentQuestion=pool[Math.floor(Math.random()*pool.length)];
  document.getElementById("questionPrompt").textContent=currentQuestion.prompt;
  document.getElementById("feedback").innerHTML="";
  document.getElementById("gradeDisplay").textContent=`Grade: ${grade}`;
  document.getElementById("streakDisplay").textContent=`Streak: ${streak}`;
  document.getElementById("answerInput").value="";
  document.getElementById("submitBtn").disabled=false;
  document.getElementById("nextBtn").style.display="none";
  updateProgressBar();
}

function updateProgressBar(){
  const fill=document.getElementById("progressFill");
  const percent=Math.min(100,streak*10);
  fill.style.width=percent+"%";
}

function submitAnswer(){
  if(!currentQuestion) return;
  const input=normalize(document.getElementById("answerInput").value);
  if(!input) return alert("Please type an answer.");
  const correct=normalize(currentQuestion.canonicalAnswer);
  const feedback=document.getElementById("feedback");
  const mode=document.getElementById("mode").value;
  if(!usedQuestions[mode][grade].includes(currentQuestion.prompt)) usedQuestions[mode][grade].push(currentQuestion.prompt);

  if(input===correct){
    feedback.innerHTML=`<div class="correct">✅ Correct!</div><div class="explanation">${currentQuestion.explanation}</div>`;
    streak++; grade=Math.min(12,grade+1);
  } else {
    feedback.innerHTML=`<div class="wrong">❌ Not quite.</div><div class="explanation">Answer: ${currentQuestion.canonicalAnswer}</div><div class="explanation">${currentQuestion.explanation}</div>`;
    streak=Math.max(0,streak-1); grade=Math.max(6,grade-1);
  }
  saveProgress(); updateProgressBar();
  document.getElementById("submitBtn").disabled=true;
  document.getElementById("nextBtn").style.display="inline-block";
}

document.getElementById("submitBtn").addEventListener("click",submitAnswer);
document.getElementById("answerInput").addEventListener("keydown",e=>{if(e.key==="Enter") submitAnswer();});
document.getElementById("nextBtn").addEventListener("click",pickRandomQuestion);
document.getElementById("mode").addEventListener("change",()=>{grade=6;streak=0;usedQuestions={};saveProgress();pickRandomQuestion();});
document.getElementById("toggleTheme").addEventListener("click",()=>{document.body.classList.toggle("dark");});

fetch("questions.json").then(r=>r.json()).then(data=>{QUESTIONS=data;pickRandomQuestion();}).catch(()=>document.getElementById("questionPrompt").textContent="Error loading questions.");
