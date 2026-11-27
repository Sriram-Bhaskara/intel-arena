// src/data/claims.js
// Every claim in the game must be sourced. "up to" wording where needed.
// Simulations marked "Illustrative".

export const CLAIMS = {
  // Core Ultra Series 3 facts
  coreUltraSeries3: {
    claim: "Intel Core Ultra Series 3 (Panther Lake) launched at CES January 2026",
    status: "Safe",
    source: "Tom's Hardware, PCWorld CES 2026 coverage",
  },
  copilotPlus: {
    claim: "Series 3 is Copilot+ PC compatible with a 50 TOPS NPU",
    status: "Safe",
    source: "ASUS CES 2026 page, Microsoft",
  },
  platformTops: {
    claim: "Up to 180 total platform TOPS on select high-end Series 3 chips",
    status: "Safe",
    source: "Intel Panther Lake edge overview",
    note: "Use 'up to' and say 'select high-end chips'",
  },
  localLLM: {
    claim: "Local LLMs run on the laptop without cloud",
    status: "Safe",
    source: "Intel SEA GM statement, FutureCIO, 30 Mar 2026",
  },
  batteryClaim: {
    claim: "Intel claims up to 27 hours of Netflix streaming (Core Ultra X9 388H)",
    status: "Safe",
    source: "PCWorld review",
    note: "Say 'Intel claims up to'; depends on battery size",
  },
  snapdragonNPU: {
    claim: "Snapdragon X2 NPU is 80 TOPS",
    status: "Concede openly",
    source: "ASUS CES 2026, Tom's Guide",
  },
  multiThread: {
    claim: "Up to +50% multi-thread vs Lunar Lake at similar power",
    status: "Safe",
    source: "Intel Panther Lake infographic",
    note: "Say 'vs Intel's previous generation', 'up to'",
  },
  integratedGraphics: {
    claim: "Integrated graphics suit casual and indie gaming; newest AAA needs a dedicated GPU",
    status: "Safe",
    source: "Currys explainer",
  },
  x86Native: {
    claim: "Standard Windows x86 software runs natively, no translation layer",
    status: "Safe",
    source: "Intel",
  },
  coreVsUltra: {
    claim: "Intel Core is not the same as Intel Core Ultra",
    status: "Safe",
    source: "Intel",
    note: "Avoid calling non-Ultra chips AI PCs",
  },
  copilotNPUreq: {
    claim: "Copilot+ PCs need an NPU of 40+ TOPS",
    status: "Safe (Microsoft's published requirement)",
    source: "Microsoft",
    note: "Verify on Microsoft's site before submitting",
  },
};

export const SOURCE_LINE = "Source: Intel and independent reviews. Results vary. Simulations are illustrative.";

// Rival positions for the honest scorecard
export const RIVALS = [
  {
    name: "Cheap non-AI laptop",
    type: "budget",
    intelPosition: "AI features offline, longer useful life",
    rivalPosition: "Lower sticker price",
    intelWins: true,
  },
  {
    name: "Qualcomm Snapdragon X",
    type: "arm",
    intelPosition: "Three engines (CPU, GPU, NPU) share the work; up to 180 platform TOPS on select high-end chips",
    rivalPosition: "Snapdragon X2 advertises an 80 TOPS NPU, higher than Intel's 50 TOPS NPU on Series 3",
    intelWins: null, // close race
    note: "Do not put a green 'Intel wins' tick on battery against Snapdragon",
  },
  {
    name: "AMD Ryzen AI",
    type: "amd",
    intelPosition: "Wide range of designs and prices from Acer, ASUS, Dell, HP, Lenovo, MSI, Samsung",
    rivalPosition: "Fewer designs at some price points",
    intelWins: true,
  },
];
