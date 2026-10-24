import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Lang = "en" | "es";

const en = {
  topbar: "Baked in Barcelona — Careful delivery in 48 h — Made to celebrate.",
  brand: "miga.",
  tagline: "layered pastry",
  nav: {
    cakes: "The cakes",
    build: "Build yours",
    workshop: "Our workshop",
    delivery: "Delivery",
    bag: "Bag",
  },
  lang: { en: "EN", es: "ES" },
  hero: {
    title: "Life, in layers.",
    eyebrow: "A small luxury. A big celebration.",
    text: "Artisan cakes made to celebrate: frosting, sponge, filling and base — each layer with its moment.",
    cta: "Discover the cakes",
    meta: "From €32 — For 4, 8 or 12 people",
    scroll: "Scroll to discover",
    layers: ["Frosting", "Sponge", "Filling", "Base"],
  },
  narrative: {
    label: "It is not just a cake.",
    text: "Four layers. A thousand reasons to celebrate.",
    quote:
      "First it charms you. Then it surprises you. And in the end, you do not want it to finish.",
  },
  beats: [
    {
      kicker: "01 / Frosting",
      title: "The first spark.",
      text: "What you see first. A cloud that promises the rest.",
    },
    {
      kicker: "02 / Sponge",
      title: "This soft. This ours.",
      text: "The tender structure that holds the celebration.",
    },
    {
      kicker: "03 / Filling",
      title: "The secret between layers.",
      text: "Where the flavor lives that you do not see at first glance.",
    },
    {
      kicker: "04 / Base",
      title: "What holds it all.",
      text: "The crisp finish that rounds every bite.",
    },
  ],
  shop: {
    kicker: "The cakes",
    title: "Choose a layer story.",
    lead: "Scroll to focus a cake — sharp in the center, soft at the edges.",
    view: "Build this cake",
  },
  builder: {
    kicker: "Build yours",
    title: "Compose your cake.",
    lead: "Pick each layer. Watch the price and portions update. Share the link.",
    frosting: "Frosting",
    sponge: "Sponge",
    filling: "Filling",
    base: "Base",
    servings: "Servings",
    price: "Total",
    share: "Copy link",
    shared: "Link copied",
    add: "Add to bag",
    added: "Added",
    preview: "Your composition",
  },
  cart: {
    title: "Your bag",
    empty: "Your bag is empty.",
    emptyHint: "Compose a cake to begin.",
    remove: "Remove",
    total: "Total",
    checkout: "Request order",
    close: "Close",
  },
  footer: {
    note: "Demo portfolio — miga. is a fictional brand by m.d.b.",
    rights: "All rights reserved.",
  },
};

const es: typeof en = {
  topbar: "Horneado en Barcelona — Entrega cuidada en 48 h — Hecho para celebrar.",
  brand: "miga.",
  tagline: "pastelería por capas",
  nav: {
    cakes: "Los pasteles",
    build: "Crea el tuyo",
    workshop: "Nuestro obrador",
    delivery: "Entrega",
    bag: "Bolsa",
  },
  lang: { en: "EN", es: "ES" },
  hero: {
    title: "La vida, en capas.",
    eyebrow: "Un pequeño lujo. Una gran celebración.",
    text: "Pasteles artesanos pensados para celebrar: cobertura, bizcocho, relleno y base, cada capa con su momento.",
    cta: "Descubrir los pasteles",
    meta: "Desde 32 € — Para 4, 8 o 12 personas",
    scroll: "Desliza para descubrir",
    layers: ["Cobertura", "Bizcocho", "Relleno", "Base"],
  },
  narrative: {
    label: "No es solo un pastel.",
    text: "Cuatro capas. Mil motivos para celebrar.",
    quote:
      "Primero te enamora. Después te sorprende. Y al final, no quieres que se termine.",
  },
  beats: [
    {
      kicker: "01 / Cobertura",
      title: "El primer flechazo.",
      text: "Lo primero que ves. Una nube que promete el resto.",
    },
    {
      kicker: "02 / Bizcocho",
      title: "Así de suave. Así de nuestro.",
      text: "La estructura tierna que sostiene la celebración.",
    },
    {
      kicker: "03 / Relleno",
      title: "El secreto entre capas.",
      text: "Donde vive el sabor que no se ve a primera vista.",
    },
    {
      kicker: "04 / Base",
      title: "Lo que lo sostiene todo.",
      text: "El cierre crujiente que redondea cada bocado.",
    },
  ],
  shop: {
    kicker: "Los pasteles",
    title: "Elige una historia en capas.",
    lead: "Desliza para enfocar un pastel — nítido al centro, suave a los lados.",
    view: "Crear este pastel",
  },
  builder: {
    kicker: "Crea el tuyo",
    title: "Compón tu pastel.",
    lead: "Elige cada capa. El precio y las raciones se actualizan. Comparte el enlace.",
    frosting: "Cobertura",
    sponge: "Bizcocho",
    filling: "Relleno",
    base: "Base",
    servings: "Raciones",
    price: "Total",
    share: "Copiar enlace",
    shared: "Enlace copiado",
    add: "Añadir a la bolsa",
    added: "Añadido",
    preview: "Tu composición",
  },
  cart: {
    title: "Tu bolsa",
    empty: "Tu bolsa está vacía.",
    emptyHint: "Compón un pastel para empezar.",
    remove: "Quitar",
    total: "Total",
    checkout: "Solicitar pedido",
    close: "Cerrar",
  },
  footer: {
    note: "Demo de portfolio — miga. es una marca ficticia de m.d.b.",
    rights: "Todos los derechos reservados.",
  },
};

const dicts = { en, es };

type I18nValue = {
  lang: Lang;
  t: typeof en;
  setLang: (lang: Lang) => void;
};

const I18nContext = createContext<I18nValue | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    const saved = localStorage.getItem("miga-lang");
    return saved === "en" || saved === "es" ? saved : "es";
  });

  const setLang = (next: Lang) => {
    setLangState(next);
    localStorage.setItem("miga-lang", next);
  };

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const value = useMemo(
    () => ({ lang, t: dicts[lang], setLang }),
    [lang],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
