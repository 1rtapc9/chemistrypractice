// Global configuration for Chemistry Practice site
const CONFIG = {
  minGrade: 6,
  maxGrade: 12,
  topics: ["acid","base","ionic","molecular","hydrocarbon","skeleton","word"],
  theme: { primary: "#00bfa6", secondary: "#f0ffff", darkPrimary: "#00796b", darkSecondary: "#002b36" },
  streak: { milestoneConfetti: [5,10,20] },
  qos: {
    ignoreCase: true,
    ignoreTrailingPunctuation: true,
    autoFocusNext: true,
    enterSubmits: true
  },
  fun: {
    emojis: ["⚛️","🧪","🧬","🧫","🔬","🌡️"],
    confettiColors: ["#00bfa6","#00fff0","#00bfff","#00ff9d","#00ffc8"]
  }
};
