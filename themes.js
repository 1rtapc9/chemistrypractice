const themeSelect = document.getElementById("themeSelect");
Object.keys(CONFIG.themes).forEach(t=>{
  const opt=document.createElement("option"); opt.value=t; opt.textContent=t.charAt(0).toUpperCase()+t.slice(1);
  themeSelect.appendChild(opt);
});
const lastTheme = localStorage.getItem("theme") || "bright";
themeSelect.value = lastTheme; applyTheme(lastTheme);

themeSelect.addEventListener("change", e=>applyTheme(e.target.value));

function applyTheme(themeName){
  const theme = CONFIG.themes[themeName];
  document.documentElement.style.setProperty('--primary', theme.primary);
  document.documentElement.style.setProperty('--secondary', theme.secondary);
  localStorage.setItem("theme", themeName);
}
