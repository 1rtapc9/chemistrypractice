let QUESTIONS={}, grade=parseInt(localStorage.getItem("grade")||CONFIG.minGrade), streak=parseInt(localStorage.getItem("streak")||0), usedQuestions={}, currentQuestion=null;

function normalize(str){
  str=str.trim();
  if(CONFIG.qos.ignoreCase) str=str.toLowerCase();
  if(CONFIG.qos.ignoreTrailingPunctuation) str=str.replace(/[.,!?;:]+$/,"");
  return str;
}

function saveProgress(){ 
  localStorage.setItem("grade",grade);
  localStorage.setItem("streak",streak);
  localStorage.setItem("topic",document.getElementById("mode").value);
}

function availableQuestions(mode){
  let pool=QUESTIONS[mode]&&QUESTIONS[mode][grade]?QUESTIONS[mode][grade]:[];
  return pool;
}

function pickRandomQuestion(){
  const mode=document.getElementById("mode").value;
  if(!usedQuestions[mode]) usedQuestions[mode]={};
  if(!usedQuestions[mode][grade]) usedQuestions[mode][grade]=[];
  let pool=availableQuestions(mode);
  let unused=pool.filter(q=>!usedQuestions[mode][grade].includes(q.prompt));
  if(unused.length===0){usedQuestions[mode][grade]=[]; unused=pool;}
  currentQuestion=unused[Math.floor(Math.random()*unused.length)];
  document.getElementById("questionPrompt").textContent=currentQuestion.prompt;
  document.getElementById("feedback").innerHTML="";
  document.getElementById("gradeDisplay").textContent=`Grade: ${grade}`;
  document.getElementById("streakDisplay").textContent=`Streak: ${streak}`;
  document.getElementById("answerInput").value="";
  document.getElementById("submitBtn").disabled=false;
  document.getElementById("nextBtn").style.display="inline-block";
  document.getElementById("skipBtn").style.display="inline-block";
  document.getElementById("answerInput").focus();
  updateProgressBar();
}

function updateProgressBar(){
  const fill=document.getElementById("progressFill");
  fill.style.width=Math.min(100,streak*5)+"%";
}

function submitAnswer(){
  if(!currentQuestion) return;
  const input=document.getElementById("answerInput").value;
  if(!input) return alert("Please type an answer.");
  const feedback=document.getElementById("feedback");
  const mode=document.getElementById("mode").value;
  usedQuestions[mode][grade].push(currentQuestion.prompt);

  let isCorrect=normalize(input)===normalize(currentQuestion.canonicalAnswer);
  if(!isCorrect && CONFIG.qos.synonyms[currentQuestion.canonicalAnswer]){
    isCorrect = CONFIG.qos.synonyms[currentQuestion.canonicalAnswer].some(s=>normalize(s)===normalize(input));
  }

  if(isCorrect){
    feedback.innerHTML=`<div class="correct">✅ Correct!</div><div class="explanation">${currentQuestion.explanation}</div>`;
    streak++; grade=Math.min(CONFIG.maxGrade,grade+1);
    playSound(true);
    if(streak%5===0) celebrateStreak();
  }else{
    feedback.innerHTML=`<div class="wrong">❌ Not quite.</div><div class="explanation">Answer: ${currentQuestion.canonicalAnswer}</div><div class="explanation">${currentQuestion.explanation}</div>`;
    streak=Math.max(0,streak-1); grade=Math.max(CONFIG.minGrade,grade-1);
    playSound(false);
  }

  if(CONFIG.qos.showHints && currentQuestion.hint) showHint(currentQuestion);

  saveProgress();
  updateAnalytics(currentQuestion, isCorrect);
  document.getElementById("submitBtn").disabled=true;
}
document.getElementById("submitBtn").addEventListener("click",submitAnswer);
document.getElementById("answerInput").addEventListener("keydown",e=>{if(e.key==="Enter") submitAnswer();});
document.getElementById("nextBtn").addEventListener("click",pickRandomQuestion);
document.getElementById("skipBtn").addEventListener("click",()=>{
  usedQuestions[document.getElementById("mode").value][grade].push(currentQuestion.prompt);
  pickRandomQuestion();
});
document.getElementById("mode").addEventListener("change",()=>{
  grade=CONFIG.minGrade; streak=0; usedQuestions={}; saveProgress(); pickRandomQuestion();
});
document.getElementById("statsBtn").addEventListener("click",()=>{document.getElementById("statsModal").style.display="block";});
document.getElementById("analyticsBtn").addEventListener("click",()=>{document.getElementById("analyticsModal").style.display="block";});

fetch("questions.json").then(r=>r.json()).then(data=>{
  QUESTIONS=data; initModeOptions();
  const lastTopic=localStorage.getItem("topic")||CONFIG.topics[0];
  document.getElementById("mode").value=lastTopic;
  pickRandomQuestion();
});

function initModeOptions(){
  const select=document.getElementById("mode"); select.innerHTML="";
  CONFIG.topics.forEach(t=>{
    const opt=document.createElement("option"); opt.value=t; opt.textContent=t.charAt(0).toUpperCase()+t.slice(1);
    select.appendChild(opt);
  });
}
