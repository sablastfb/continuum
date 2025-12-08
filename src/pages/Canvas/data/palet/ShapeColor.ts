const Background = [
  {
    id: "shape-background-slate-blue",
    light: "rgba(100, 149, 237)",
    dark: "rgba(139, 168, 250)",
  },
  {
    id: "shape-background-emerald-green",
    light: "rgba(144, 238, 144)",
    dark: "rgba(52, 211, 153)",
  },
  {
    id: "shape-background-rose-pink",
    light: "rgba(255, 182, 193)",
    dark: "rgba(251, 113, 133)",
  },
  {
    id: "shape-background-amber-yellow",
    light: "rgba(255, 215, 0)",
    dark: "rgba(251, 191, 36)",
  },
  {
    id: "shape-background-violet-purple",
    light: "rgba(221, 160, 221)",
    dark: "rgba(196, 145, 251)",
  },
  {
    id: "shape-background-coral-orange",
    light: "rgba(255, 127, 80)",
    dark: "rgba(251, 146, 60)",
  },
  {
    id: "shape-background-cyan-teal",
    light: "rgba(102, 205, 170)",
    dark: "rgba(34, 211, 238)",
  },
  {
    id: "shape-background-neutral-gray",
    light: "rgba(156, 163, 175)",
    dark: "rgba(148, 163, 184)",
  },
  // New neutral dark mode colors
  {
    id: "shape-background-warm-gray",
    light: "rgba(180, 180, 180)",
    dark: "rgba(120, 113, 108)", // Warm stone gray
  },
  {
    id: "shape-background-cool-gray",
    light: "rgba(170, 170, 170)",
    dark: "rgba(107, 114, 128)", // Cool slate gray
  },
  {
    id: "shape-background-sand-beige",
    light: "rgba(210, 180, 140)",
    dark: "rgba(168, 162, 158)", // Muted sand
  },
  {
    id: "shape-background-charcoal",
    light: "rgba(140, 140, 140)",
    dark: "rgba(82, 82, 91)", // Deep charcoal
  },
  {
    id: "shape-background-mist-blue",
    light: "rgba(176, 196, 222)",
    dark: "rgba(148, 163, 184)", // Soft blue-gray
  },
];

const Stroke = [
  {
    id: "shape-outline-indigo-blue",
    light: "rgba(70, 130, 180)",
    dark: "rgba(99, 102, 241)",
  },
  {
    id: "shape-outline-lime-green",
    light: "rgba(34, 139, 34)",
    dark: "rgba(132, 204, 22)",
  },
  {
    id: "shape-outline-hot-pink",
    light: "rgba(219, 112, 147)",
    dark: "rgba(236, 72, 153)",
  },
  {
    id: "shape-outline-gold-yellow",
    light: "rgba(184, 134, 11)",
    dark: "rgba(234, 179, 8)",
  },
  {
    id: "shape-outline-fuchsia-purple",
    light: "rgba(186, 85, 211)",
    dark: "rgba(217, 70, 239)",
  },
  {
    id: "shape-outline-tangerine-orange",
    light: "rgba(255, 140, 0)",
    dark: "rgba(249, 115, 22)",
  },
  {
    id: "shape-outline-aqua-blue",
    light: "rgba(64, 224, 208)",
    dark: "rgba(6, 182, 212)",
  },
  {
    id: "shape-outline-charcoal-gray",
    light: "rgba(105, 105, 105)",
    dark: "rgba(71, 85, 105)",
  },
  // New neutral dark mode stroke colors
  {
    id: "shape-outline-silver",
    light: "rgba(150, 150, 150)",
    dark: "rgba(156, 163, 175)", // Soft silver
  },
  {
    id: "shape-outline-stone",
    light: "rgba(130, 130, 130)",
    dark: "rgba(120, 113, 108)", // Natural stone
  },
  {
    id: "shape-outline-platinum",
    light: "rgba(180, 180, 180)",
    dark: "rgba(209, 213, 219)", // Bright platinum
  },
  {
    id: "shape-outline-graphite",
    light: "rgba(80, 80, 80)",
    dark: "rgba(75, 85, 99)", // Deep graphite
  },
  {
    id: "shape-outline-ash",
    light: "rgba(190, 190, 190)",
    dark: "rgba(107, 114, 128)", // Ash gray
  },
];

export const ShapeColors = [...Background, ...Stroke];