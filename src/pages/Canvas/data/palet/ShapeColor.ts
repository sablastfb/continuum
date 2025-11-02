const Background = [
  {
    id: "shape-background-slate-blue",
    light: "rgba(100, 149, 237)",
    dark: "rgba(139, 168, 250)", // Softer, more vibrant blue
  },
  {
    id: "shape-background-emerald-green",
    light: "rgba(144, 238, 144)",
    dark: "rgba(52, 211, 153)", // Richer emerald
  },
  {
    id: "shape-background-rose-pink",
    light: "rgba(255, 182, 193)",
    dark: "rgba(251, 113, 133)", // More saturated rose
  },
  {
    id: "shape-background-amber-yellow",
    light: "rgba(255, 215, 0)",
    dark: "rgba(251, 191, 36)", // Warmer amber
  },
  {
    id: "shape-background-violet-purple",
    light: "rgba(221, 160, 221)",
    dark: "rgba(196, 145, 251)", // Deeper violet
  },
  {
    id: "shape-background-coral-orange",
    light: "rgba(255, 127, 80)",
    dark: "rgba(251, 146, 60)", // Balanced coral
  },
  {
    id: "shape-background-cyan-teal",
    light: "rgba(102, 205, 170)",
    dark: "rgba(34, 211, 238)", // Brighter cyan
  },
  {
    id: "shape-background-neutral-gray",
    light: "rgba(156, 163, 175)",
    dark: "rgba(148, 163, 184)", // Subtle gray option
  },
];

const Stroke = [
  {
    id: "shape-outline-indigo-blue",
    light: "rgba(70, 130, 180)",
    dark: "rgba(99, 102, 241)", // Vibrant indigo
  },
  {
    id: "shape-outline-lime-green",
    light: "rgba(34, 139, 34)",
    dark: "rgba(132, 204, 22)", // Punchy lime
  },
  {
    id: "shape-outline-hot-pink",
    light: "rgba(219, 112, 147)",
    dark: "rgba(236, 72, 153)", // Bold hot pink
  },
  {
    id: "shape-outline-gold-yellow",
    light: "rgba(184, 134, 11)",
    dark: "rgba(234, 179, 8)", // Rich gold
  },
  {
    id: "shape-outline-fuchsia-purple",
    light: "rgba(186, 85, 211)",
    dark: "rgba(217, 70, 239)", // Electric fuchsia
  },
  {
    id: "shape-outline-tangerine-orange",
    light: "rgba(255, 140, 0)",
    dark: "rgba(249, 115, 22)", // Bright tangerine
  },
  {
    id: "shape-outline-aqua-blue",
    light: "rgba(64, 224, 208)",
    dark: "rgba(6, 182, 212)", // Deep aqua
  },
  {
    id: "shape-outline-charcoal-gray",
    light: "rgba(105, 105, 105)",
    dark: "rgba(71, 85, 105)", // Dark charcoal
  },
];

export const ShapeColors = [...Background, ...Stroke];