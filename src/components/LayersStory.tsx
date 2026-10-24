import { useEffect, useRef, useState } from "react";
import cakeImage from "../assets/Pastel-de-frambuesa-por-capas.png";
import { VEILS } from "../data";
import { useI18n } from "../i18n";

type Props = {
  onActiveChange?: (index: number) => void;
};

export default function LayersStory({ onActiveChange }: Props) {
  const { t } = useI18n();
  const [active, setActive] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);
  const beatsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    onActiveChange?.(active);
  }, [active, onActiveChange]);

  useEffect(() => {
    const root = beatsRef.current;
    if (!root) return;

    const beats = root.querySelectorAll<HTMLElement>(".beat");

    const observer = new IntersectionObserver(
      (entries) => {
        const best = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!best) return;
        setActive(Number((best.target as HTMLElement).dataset.layer ?? 0));
      },
      {
        root: null,
        threshold: [0.3, 0.55, 0.75],
        rootMargin: "-35% 0px -35% 0px",
      },
    );

    beats.forEach((beat) => observer.observe(beat));
    return () => observer.disconnect();
  }, []);

  const veil = reduceMotion
    ? { prev: "0%", next: "0%" }
    : VEILS[active] ?? VEILS[0];

  return (
    <section className="layers-story" id="capas" aria-label={t.nav.cakes}>
      <div className="layers-visual">
        <div
          className="layers-visual-sticky"
          style={
            {
              "--veil-prev": veil.prev,
              "--veil-next": veil.next,
            } as React.CSSProperties
          }
        >
          <div className="layers-frame">
            <img
              src={cakeImage}
              alt={t.builder.preview}
              className="layers-img"
            />
            <div className="veil veil-prev" aria-hidden />
            <div className="veil veil-next" aria-hidden />
          </div>

          <div className="layers-active-copy" aria-live="polite">
            <p className="beat-kicker">{t.beats[active].kicker}</p>
            <h2 className="beat-title">{t.beats[active].title}</h2>
            <p className="beat-text">{t.beats[active].text}</p>
          </div>
        </div>
      </div>

      <div className="layers-beats" ref={beatsRef}>
        {t.beats.map((beat, i) => (
          <article key={beat.kicker} className="beat" data-layer={i}>
            <div className="beat-copy">
              <p className="beat-kicker">{beat.kicker}</p>
              <h2 className="beat-title">{beat.title}</h2>
              <p className="beat-text">{beat.text}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
