// src/data/match.js
// Persona to recommendation logic

export const PERSONAS = [
  {
    id: "student",
    label: "Student",
    icon: "🎓",
    tier: "Core Ultra 5 class, 16 GB RAM",
    why: "Offline notes and translation, all-day carry",
    tagEmphasis: ["Core Ultra badge", "16 GB RAM", "Battery capacity (Wh)"],
    color: "intel-blue",
  },
  {
    id: "creator",
    label: "Creator",
    icon: "🎨",
    tier: "Core Ultra 7 class, 16-32 GB, good display",
    why: "Local image and video AI, fast exports",
    tagEmphasis: ["Core Ultra badge", "32 GB if possible", "Display quality"],
    color: "intel-neon",
  },
  {
    id: "gamer",
    label: "Gamer",
    icon: "🎮",
    tier: "Core Ultra X7 or X9 class + dedicated GPU for heavy AAA",
    why: "Integrated Arc handles casual/esports; AAA needs dedicated GPU",
    tagEmphasis: ["Core Ultra badge", "Graphics tier", "Cooling"],
    color: "intel-pink",
  },
  {
    id: "work",
    label: "Work",
    icon: "💼",
    tier: "Core Ultra 7 class, vPro option on business models",
    why: "Battery, security, video-call AI",
    tagEmphasis: ["Core Ultra badge", "vPro if company-managed", "Weight"],
    color: "intel-orange",
  },
];

export const TAG_CHECKLIST = [
  "The words 'Core Ultra' on the tag (not just 'Core')",
  "A Copilot+ PC badge or an NPU rated 40+ TOPS",
  "16 GB of RAM or more",
];

export const EXAMPLE_MODELS = {
  note: "Launch prices seen so far. Check store for current pricing.",
  models: [
    { name: "Lenovo IdeaPad Slim 3 Gen 11 Copilot+ PC", price: "₹1,09,990" },
    { name: "Dell XPS 13 with Core Ultra 7 Series 3", price: "from ₹1,80,990" },
  ],
};

export const getMatch = (personaId, batteryPreference) => {
  const persona = PERSONAS.find((p) => p.id === personaId) || PERSONAS[0];
  return {
    ...persona,
    batteryEmphasis: batteryPreference === "moving" ? "Prioritize battery Wh" : "Prioritize performance",
  };
};
