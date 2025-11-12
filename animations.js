function spawnFloatingMolecule(){
  const mol = document.createElement("div");
  mol.classList.add("floating-molecule");
  mol.textContent = CONFIG.fun.molecules[Math.floor(Math.random()*CONFIG.fun.molecules.length)];
  mol.style.left = Math.random()*90+"%";
  mol.style.bottom = "0px";
  document.body.appendChild(mol);
  setTimeout(()=>mol.remove(),4000);
}

// Use for streak milestones
function celebrateStreak(){
  spawnFloatingMolecule();
  spawnConfetti(20);
}
