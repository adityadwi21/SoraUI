import type { ThemeDoc } from "./types";

export const THEME_DOCS: ThemeDoc[] = [
  {
    id: "sky",
    name: "Sky",
    mode: "light",
    description:
      "Clean, airy daylight palette with vibrant azure cyan accents.",
    accentScale: "sky",
    primaryColor: "#0ea5e9",
  },
  {
    id: "cloud",
    name: "Cloud",
    mode: "light",
    description:
      "Soft overcast aesthetic with neutral zinc tones and indigo focus rings.",
    accentScale: "indigo",
    primaryColor: "#6366f1",
  },
  {
    id: "horizon",
    name: "Horizon",
    mode: "light",
    description: "Warm dawn sunrise palette with amber and orange highlights.",
    accentScale: "amber",
    primaryColor: "#f59e0b",
  },
  {
    id: "aurora",
    name: "Aurora",
    mode: "dark",
    description:
      "Vibrant emerald and teal borealis glow against a deep slate backdrop.",
    accentScale: "teal",
    primaryColor: "#14b8a6",
  },
  {
    id: "twilight",
    name: "Twilight",
    mode: "dark",
    description:
      "Dusk aesthetic with violet and indigo luminance on obsidian cards.",
    accentScale: "violet",
    primaryColor: "#8b5cf6",
  },
  {
    id: "midnight",
    name: "Midnight",
    mode: "dark",
    description:
      "Ultra-deep space navy background with crisp luminescent cyan highlights.",
    accentScale: "sky",
    primaryColor: "#38bdf8",
  },
  {
    id: "nebula",
    name: "Nebula",
    mode: "dark",
    description:
      "Cosmic purple and magenta accents designed for high-contrast dark interfaces.",
    accentScale: "violet",
    primaryColor: "#a855f7",
  },
  {
    id: "eclipse",
    name: "Eclipse",
    mode: "dark",
    description:
      "High-contrast solar flare gold and amber glow against midnight black.",
    accentScale: "amber",
    primaryColor: "#fbbf24",
  },
  {
    id: "starlight",
    name: "Starlight",
    mode: "dark",
    description:
      "Cool starlit zinc and ice-blue contrasts crafted for technical tools.",
    accentScale: "indigo",
    primaryColor: "#818cf8",
  },
];
