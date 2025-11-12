function spawnFloatingMolecule(){
  const mol = document.createElement("div");
  mol.classList.add("floating-molecule");
  mol.textContent = CONFIG.fun.molecules[Math.floor(Math.random()*CONFIG.fun.molecules.length)];
  mol.style.left = Math.random()*90+"%";
  mol.style.bottom = "0px";
  document.body.appendChild(mol);
  setTimeout(()=>mol.remove(),4000);
}

function celebrateStreak(){
  for(let i=0;i<10;i++) spawnFloatingMolecule();
  spawnConfetti(30);
}

function spawnConfetti(count){
  for(let i=0;i<count;i++){
    const conf = document.createElement("div");
    conf.textContent = "🎉";
    conf.style.position="absolute";
    conf.style.left=Math.random()*100+"%";
    conf.style.top=Math.random()*100+"%";
    conf.style.fontSize=(Math.random()*20+10)+"px";
    document.body.appendChild(conf);
    setTimeout(()=>conf.remove(),3000);
  }
}
