export type LayerKey = "frosting" | "sponge" | "filling" | "base";

export type LayerOption = {
  id: string;
  label: { en: string; es: string };
  price: number;
  color: string;
};

export const LAYER_OPTIONS: Record<LayerKey, LayerOption[]> = {
  frosting: [
    { id: "nube", label: { en: "Berry cloud", es: "Nube de frutos" }, price: 12, color: "#f5ece8" },
    { id: "cacao", label: { en: "Dark cacao", es: "Cacao oscuro" }, price: 14, color: "#3a2420" },
    { id: "limon", label: { en: "Lemon silk", es: "Seda de limón" }, price: 12, color: "#f3e7b0" },
  ],
  sponge: [
    { id: "vainilla", label: { en: "Vanilla", es: "Vainilla" }, price: 10, color: "#f0d9a8" },
    { id: "chocolate", label: { en: "Chocolate", es: "Chocolate" }, price: 12, color: "#5c3a2a" },
    { id: "almendra", label: { en: "Almond", es: "Almendra" }, price: 13, color: "#e8d4b8" },
  ],
  filling: [
    { id: "frambuesa", label: { en: "Raspberry", es: "Frambuesa" }, price: 11, color: "#a61e3a" },
    { id: "crema", label: { en: "Pastry cream", es: "Crema pastelera" }, price: 10, color: "#f7e9c8" },
    { id: "dulce", label: { en: "Dulce de leche", es: "Dulce de leche" }, price: 12, color: "#c47a3a" },
  ],
  base: [
    { id: "sable", label: { en: "Sablé", es: "Sablé" }, price: 8, color: "#d4a574" },
    { id: "cacao-base", label: { en: "Cacao crumb", es: "Miga de cacao" }, price: 9, color: "#4a3028" },
    { id: "pistacho", label: { en: "Pistachio", es: "Pistacho" }, price: 10, color: "#8a9a6a" },
  ],
};

export const SERVINGS = [4, 8, 12] as const;

export type CakeConfig = {
  frosting: string;
  sponge: string;
  filling: string;
  base: string;
  servings: (typeof SERVINGS)[number];
};

export const DEFAULT_CONFIG: CakeConfig = {
  frosting: "nube",
  sponge: "vainilla",
  filling: "frambuesa",
  base: "sable",
  servings: 8,
};

export function optionById(key: LayerKey, id: string) {
  return LAYER_OPTIONS[key].find((o) => o.id === id) ?? LAYER_OPTIONS[key][0];
}

export function priceFor(config: CakeConfig) {
  const layers =
    optionById("frosting", config.frosting).price +
    optionById("sponge", config.sponge).price +
    optionById("filling", config.filling).price +
    optionById("base", config.base).price;
  const scale = config.servings === 4 ? 0.75 : config.servings === 12 ? 1.35 : 1;
  return Math.round(layers * scale);
}

export function configFromSearch(params: URLSearchParams): CakeConfig {
  const pick = (key: LayerKey, fallback: string) => {
    const value = params.get(key);
    return LAYER_OPTIONS[key].some((o) => o.id === value) ? (value as string) : fallback;
  };
  const servingsRaw = Number(params.get("s"));
  const servings = (SERVINGS as readonly number[]).includes(servingsRaw)
    ? (servingsRaw as CakeConfig["servings"])
    : DEFAULT_CONFIG.servings;

  return {
    frosting: pick("frosting", DEFAULT_CONFIG.frosting),
    sponge: pick("sponge", DEFAULT_CONFIG.sponge),
    filling: pick("filling", DEFAULT_CONFIG.filling),
    base: pick("base", DEFAULT_CONFIG.base),
    servings,
  };
}

export function configToSearch(config: CakeConfig) {
  const params = new URLSearchParams({
    frosting: config.frosting,
    sponge: config.sponge,
    filling: config.filling,
    base: config.base,
    s: String(config.servings),
  });
  return params.toString();
}

export const VEILS = [
  { prev: "0%", next: "65%" },
  { prev: "35%", next: "50%" },
  { prev: "50%", next: "35%" },
  { prev: "65%", next: "0%" },
];
