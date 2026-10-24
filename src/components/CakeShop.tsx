import { useEffect, useRef, useState } from "react";
import { CAKES } from "../products";
import { useI18n } from "../i18n";

function usePinUnit() {
  const [unit, setUnit] = useState(100);
  useEffect(() => {
    const sync = () => setUnit(window.matchMedia("(max-width: 768px)").matches ? 72 : 100);
    sync();
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, []);
  return unit;
}

export default function CakeShop() {
  const { t, lang } = useI18n();
  const pinRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const pinUnit = usePinUnit();

  useEffect(() => {
    const onScroll = () => {
      const el = pinRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      const raw = Math.min(1, Math.max(0, -rect.top / Math.max(1, total)));
      setProgress(raw);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const float = progress * (CAKES.length - 1);
  const active = Math.round(float);
  const featured = CAKES[active] ?? CAKES[0];

  return (
    <section className="cake-shop" id="pasteles">
      <header className="cake-shop-head">
        <p className="builder-kicker">{t.shop.kicker}</p>
        <h2 className="builder-title">{t.shop.title}</h2>
        <p className="builder-lead">{t.shop.lead}</p>
      </header>

      <div
        className="cake-shop-pin"
        ref={pinRef}
        style={{ height: `${CAKES.length * pinUnit}vh` }}
      >
        <div className="cake-shop-sticky">
          <div className="cake-shop-atmosphere" aria-hidden />

          <div className="cake-shop-focus" aria-live="polite">
            {CAKES.map((cake, i) => {
              const distance = float - i;
              const abs = Math.abs(distance);
              const focus = Math.max(0, 1 - Math.min(1.35, abs));
              const scale = 0.58 + focus * 0.42;
              const blur = Math.min(18, abs * 12);
              const opacity = Math.max(0.22, 0.35 + focus * 0.65);
              // Neighbors stay in frame, peeking above/below the sharp center
              const y = distance * (pinUnit < 90 ? -18 : -26);
              const z = Math.round(focus * 10);

              return (
                <a
                  key={cake.id}
                  href="#crea"
                  className="cake-shop-float"
                  style={{
                    transform: `translate(-50%, calc(-50% + ${y}vh)) scale(${scale})`,
                    filter: `blur(${blur}px)`,
                    opacity,
                    zIndex: z,
                  }}
                  aria-current={i === active ? "true" : undefined}
                  tabIndex={i === active ? 0 : -1}
                >
                  <img
                    src={cake.image}
                    alt={cake.name[lang]}
                    draggable={false}
                  />
                </a>
              );
            })}
          </div>

          <div className="cake-shop-caption">
            <span className="cake-shop-index">0{active + 1}</span>
            <p className="cake-shop-tag">{featured.tag[lang]}</p>
            <h3 className="cake-shop-name">{featured.name[lang]}</h3>
            <p className="cake-shop-price">
              {featured.price} € · {featured.servings}
            </p>
            <a href="#crea" className="cake-shop-cta">
              {t.shop.view}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
