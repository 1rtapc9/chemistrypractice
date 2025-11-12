const CONFIG = {
  minGrade: 6,
  maxGrade: 12,
  topics: ["acid","base","ionic","molecular","hydrocarbon","skeleton","word"],
  streak: {
    milestoneConfetti: [5,10,20,30,50],
    milestoneMessages:["Nice!","Great!","Amazing!","Incredible!","Legendary!"]
  },
  qos: {
    ignoreCase:true,
    ignoreTrailingPunctuation:true,
    autoFocusNext:true,
    enterSubmits:true,
    showHints:true,
    synonyms:{
      "H2O":["water"],
      "CO2":["carbon dioxide"],
      "CH4":["methane"],
      "NH3":["ammonia"],
      "C2H6":["ethane"]
    }
  },
  fun: {
    emojis:["⚛️","🧪","🧬","🧫","🔬","🌡️"],
    confettiColors:["#00bfa6","#00fff0","#00bfff","#00ff9d","#00ffc8"],
    molecules:["H2O","CO2","CH4","NH3","C2H6","O2"]
  },
  sound: { correct:"ding.mp3", wrong:"buzz.mp3", enabled:true },
  themes: {
    bright:{primary:"#00bfa6",secondary:"#f0ffff"},
    dark:{primary:"#00796b",secondary:"#002b36"},
    classic:{primary:"#009688",secondary:"#ffffff"}
  },
  analytics: { trackDaily:true, trackTopics:true }
};
