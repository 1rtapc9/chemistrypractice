let QUESTIONS={}, grade=parseInt(localStorage.getItem("grade")||CONFIG.minGrade), streak=parseInt(localStorage.getItem("streak")||0), usedQuestions={}, currentQuestion=null;

function normalize(str){
  str=str.trim();
  if(CONFIG.qos.ignoreCase) str=str.toLowerCase();
  if(CONFIG.qos.ignoreTrailingPunctuation) str=str.replace(/[.,!?;:]+$/,"");
  return str;
}

function saveProgress(){localStorage.setItem("grade",grade);localStorage.setItem("streak",streak);}

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
  document.getElementById("nextBtn").style.display="none";
  if(CONFIG.qos.autoFocusNext) document.getElementById("answerInput").focus();
  updateProgressBar();
}

function updateProgressBar(){
  const fill=document.getElementById("progressFill");
  fill.style.width=Math.min(100,streak*5)+"%";
  fill.classList.add("streak-highlight");
  setTimeout(()=>fill.classList.remove("streak-highlight"),800);
}

function submitAnswer(){
  if(!currentQuestion) return;
  const input=document.getElementById("answerInput").value;
  if(!input) return alert("Please type an answer.");
  const correct=normalize(currentQuestion.canonicalAnswer);
  const feedback=document.getElementById("feedback");
  const mode=document.getElementById("mode").value;
  usedQuestions[mode][grade].push(currentQuestion.prompt);

  const isCorrect=normalize(input)===correct;

  if(isCorrect){
    feedback.innerHTML=`<div class="correct">✅ Correct!</div><div class="explanation">${currentQuestion.explanation}</div>`;
    streak++; grade=Math.min(CONFIG.maxGrade,grade+1);
    spawnFloatingIcon(CONFIG.fun.emojis[Math.floor(Math.random()*CONFIG.fun.emojis.length)]);
    if(CONFIG.streak.milestoneConfetti.includes(streak)) spawnConfetti(30);
  }else{
    feedback.innerHTML=`<div class="wrong">❌ Not quite.</div><div class="explanation">Answer: ${currentQuestion.canonicalAnswer}</div><div class="explanation">${currentQuestion.explanation}</div>`;
    streak=Math.max(0,streak-1); grade=Math.max(CONFIG.minGrade,grade-1);
  }

  saveProgress(); updateProgressBar();
  document.getElementById("submitBtn").disabled=true;
  document.getElementById("nextBtn").style.display="inline-block";
}

function spawnFloatingIcon(emoji){
  const icon=document.createElement("div");
  icon.classList.add("floating-icon");
  icon.textContent=emoji;
  icon.style.left=Math.random()*90+"%";
  icon.style.bottom="10px";
  document.getElementById("funVisuals").appendChild(icon);
  setTimeout(()=>icon.remove(),2000);
}

function spawnConfetti(count){
  for(let i=0;i<count;i++){
    const c=document.createElement("div");
    c.classList.add("confetti-piece");
    c.style.left=Math.random()*100+"%";
    c.style.background=CONFIG.fun.confettiColors[Math.floor(Math.random()*CONFIG.fun.confettiColors.length)];
    document.getElementById("funVisuals").appendChild(c);
    const anim=Math.random()*2000+1000;
    c.animate([{transform:'translateY(0)'},{transform:'translateY(-200px)'}],{duration:anim,iterations:1, easing:'ease-out'});
    setTimeout(()=>c.remove(),anim);
  }
}

document.getElementById("submitBtn").addEventListener("click",submitAnswer);
document.getElementById("answerInput").addEventListener("keydown",e=>{if(e.key==="Enter" && CONFIG.qos.enterSubmits) submitAnswer();});
document.getElementById("nextBtn").addEventListener("click",pickRandomQuestion);
document.getElementById("mode").addEventListener("change",()=>{
  grade=CONFIG.minGrade; streak=0; usedQuestions={}; saveProgress(); pickRandomQuestion();
});
document.getElementById("toggleTheme").addEventListener("click",()=>{document.body.classList.toggle("dark");});

fetch("questions.json").then(r=>r.json()).then(data=>{QUESTIONS=data; initModeOptions(); pickRandomQuestion();});

function initModeOptions(){
  const select=document.getElementById("mode");
  select.innerHTML="";
  CONFIG.topics.forEach(t=>{
    const opt=document.createElement("option");
    opt.value=t;
    opt.textContent=t.charAt(0).toUpperCase()+t.slice(1);
    select.appendChild(opt);
  });
}
