// config.js — central configuration and QoL registry

const CONFIG = {
  minGrade: 6,
  maxGrade: 12,

  // Topical modes (includes all topics you listed + original ones)
  topics: [
    "acid_naming",                // Naming acids practice (flashcards)
    "hydrocarbon_naming",         // Naming hydrocarbons
    "mega_mixed_naming",          // Mega Mixed Naming Compounds Practice
    "english_www9",               // English WWW 9 (flashcards)
    "vsepr_bonding",              // Bonding Theory, VSEPR
    "biomolecules",               // Organic Chemistry - Biomolecules
    "intro_bonding_f25",          // Intro to Bonding Theory F25
    "ionic_metallic_covalent_fall25",
    "ionic_metallic_fall25",
    "periodic_sp25",
    "electrons_part2",
    "electrons_part1_fall25",
    "nuclear_chemistry",
    "the_atom_f25",
    "matter_properties_phase_changes",
    "intro_chem_data_numbers_units_fall25",
    "aug18_21_evabryant",
    "intro_chem_spring2025",
    // keep original practice modes
    "acid", "base", "ionic", "molecular", "hydrocarbon", "skeleton", "word"
  ],

  // Target counts per large flashcard set (if not specified generator will default to 100)
  topicTargetCounts: {
    "acid_naming": 122,          // you had "22 terms" originally — but request was to add 100 extra -> this will ensure large set
    "hydrocarbon_naming": 128,   // 28 + 100
    "mega_mixed_naming": 334,    // 234 + 100
    "english_www9": 119,         // 19 + 100
    "vsepr_bonding": 140,        // 40 + 100
    "biomolecules": 173,         // 73 + 100
    "intro_bonding_f25": 106,    // 6 + 100
    "ionic_metallic_covalent_fall25": 156, // 56 + 100
    "ionic_metallic_fall25": 123, // 23 + 100
    "periodic_sp25": 145,        // 45 +100
    "electrons_part2": 124,
    "electrons_part1_fall25": 142,
    "nuclear_chemistry": 138,
    "the_atom_f25": 127,
    "matter_properties_phase_changes": 178,
    "intro_chem_data_numbers_units_fall25": 127,
    "aug18_21_evabryant": 182,
    "intro_chem_spring2025": 136,
    // default for others will be 100
  },

  // QoL boolean registry (toggle features on/off quickly)
  QOL: {
    autoSaveProgress: true,
    keyboardShortcuts: true,
    enterSubmits: true,
    autoFocusAnswer: true,
    ignoreCase: true,
    ignoreTrailingPunctuation: true,
    acceptTrailingDotComma: true,
    saveLastTopic: true,
    saveTheme: true,
    persistentStats: true,
    showHints: true,
    generatePlaceholdersWhenMissing: true,
    allowSkip: true,
    allowNext: true,
    allowUndo: true,
    maxPoolResetWhenUsed: true,
    mobileOptimizedInputs: true,
    accessibleLabels: true,
    // ... (you can add many more flags here)
  },

  // synonyms (small initial set — the generator will expand for molecular names)
  synonyms: {
    "h2o": ["water"],
    "co2": ["carbon dioxide"],
    "ch4": ["methane"]
  },

  // visual / fun settings
  visuals: {
    showFloatingFacts: true,
    floatingFactIntervalMs: 4500,
    floatingFactDurationMs: 22000,
    confettiOnMilestone: true
  },

  // analytics settings
  analytics: {
    dailyTrack: true,
    topicTrack: true
  }
};
