export type CakeProduct = {
  id: string;
  name: { en: string; es: string };
  tag: { en: string; es: string };
  price: number;
  servings: string;
  image: string;
};

export const CAKES: CakeProduct[] = [
  {
    id: "nube-frutos",
    name: { en: "Berry cloud", es: "Nube de frutos" },
    tag: { en: "Season edit", es: "Edición de temporada" },
    price: 42,
    servings: "Ø 18 · 8",
    image: "/cakes/berry.png",
  },
  {
    id: "cacao-seda",
    name: { en: "Cacao silk", es: "Seda de cacao" },
    tag: { en: "Classic", es: "Clásico" },
    price: 46,
    servings: "Ø 18 · 8",
    image: "/cakes/cacao.png",
  },
  {
    id: "limon-miel",
    name: { en: "Lemon & honey", es: "Limón y miel" },
    tag: { en: "Bright", es: "Luminoso" },
    price: 40,
    servings: "Ø 16 · 6",
    image: "/cakes/lemon.png",
  },
  {
    id: "pistacho",
    name: { en: "Pistachio base", es: "Base de pistacho" },
    tag: { en: "Soft green", es: "Verde suave" },
    price: 48,
    servings: "Ø 18 · 8",
    image: "/cakes/pistachio.png",
  },
];
