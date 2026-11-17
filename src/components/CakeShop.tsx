import { useEffect, useRef, useState } from "react";
import { CAKES } from "../products";
import { useI18n } from "../i18n";

/** Scroll height (vh) per cake — longer = more time centered and sharp. */
function usePinUnit() {
  const [unit, setUnit] = useState(130);
  useEffect(() => {
    const sync = () =>
      setUnit(window.matchMedia("(max-width: 768px)").matches ? 95 : 130);
    sync();
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, []);
  return unit;
}

/** Stay fully sharp until this distance from center, then ease into blur. */
const SHARP_HOLD = 0.42;

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
              // Plateau: no blur while abs < SHARP_HOLD, then ease-in to soft
              const leave = Math.max(0, Math.min(1, (abs - SHARP_HOLD) / (1 - SHARP_HOLD)));
              const soft = leave * leave;
              const focus = 1 - soft;
              const scale = 0.62 + focus * 0.38;
              const blur = soft * 16;
              const opacity = Math.max(0.2, 0.28 + focus * 0.72);
              // Neighbors stay in frame, peeking above/below the sharp center
              const y = distance * (pinUnit < 110 ? -16 : -24);
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
