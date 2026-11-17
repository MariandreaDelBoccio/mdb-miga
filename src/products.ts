export type CakeProduct = {
  id: string;
  name: { en: string; es: string };
  tag: { en: string; es: string };
  price: number;
  servings: string;
  image: string;
};

const cake = (file: string) =>
  `${import.meta.env.BASE_URL}cakes/${file}`.replace(/([^:]\/)\/+/g, "$1");

export const CAKES: CakeProduct[] = [
  {
    id: "nube-frutos",
    name: { en: "Berry cloud", es: "Nube de frutos" },
    tag: { en: "Season edit", es: "Edición de temporada" },
    price: 42,
    servings: "Ø 18 · 8",
    image: cake("berry.png"),
  },
  {
    id: "cacao-seda",
    name: { en: "Cacao silk", es: "Seda de cacao" },
    tag: { en: "Classic", es: "Clásico" },
    price: 46,
    servings: "Ø 18 · 8",
    image: cake("cacao.png"),
  },
  {
    id: "limon-miel",
    name: { en: "Lemon & honey", es: "Limón y miel" },
    tag: { en: "Bright", es: "Luminoso" },
    price: 40,
    servings: "Ø 16 · 6",
    image: cake("lemon.png"),
  },
  {
    id: "pistacho",
    name: { en: "Pistachio base", es: "Base de pistacho" },
    tag: { en: "Soft green", es: "Verde suave" },
    price: 48,
    servings: "Ø 18 · 8",
    image: cake("pistachio.png"),
  },
];
