function showHint(question){
  if(!question.hint) return;
  const feedback=document.getElementById("feedback");
  const hintDiv=document.createElement("div");
  hintDiv.classList.add("explanation");
  hintDiv.style.color="#00796b";
  hintDiv.textContent="Hint: "+question.hint;
  feedback.appendChild(hintDiv);
}

function autoHint(){
  if(!currentQuestion || !currentQuestion.hint) return;
  let attempts=localStorage.getItem("hintAttempts_"+currentQuestion.prompt)||0;
  attempts++;
  localStorage.setItem("hintAttempts_"+currentQuestion.prompt, attempts);
  if(attempts>=2) showHint(currentQuestion);
}

document.getElementById("submitBtn").addEventListener("click",()=>{
  const input=document.getElementById("answerInput").value;
  if(!currentQuestion || !input) return;
  const normalizedInput=input.trim().toLowerCase();
  if(normalizedInput !== currentQuestion.canonicalAnswer.toLowerCase()) autoHint();
});
