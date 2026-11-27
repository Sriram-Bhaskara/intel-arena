// 24 HOUR MODE — scene state

export const initialState = {
  screen: "boot",
  persona: null,         // "student" | "creator" | "gamer" | "work"
  batteryPreference: null,
  scores: {
    metro: null,
    cafe: 0,
    midnight: null,
  },
  soundEnabled: true,
};

// 7-scene flow
export const SCREEN_ORDER = [
  "boot",
  "vibe",
  "metro",
  "cafe",
  "midnight",
  "verdict",
  "match",
];

export const IDLE_RESET_SECONDS = 120;

// Battery preference inferred from vibe
export const inferBatteryPref = (persona) =>
  persona === "work" || persona === "gamer" ? "charger" : "moving";
