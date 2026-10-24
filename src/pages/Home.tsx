import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import cakeImage from "../assets/Pastel-de-frambuesa-por-capas.png";
import CakeBuilder from "../components/CakeBuilder";
import CakeShop from "../components/CakeShop";
import LayersStory from "../components/LayersStory";
import { useI18n } from "../i18n";

export default function Home() {
  const { t } = useI18n();
  const [activeLayer, setActiveLayer] = useState(0);

  return (
    <main>
      <section className="hero">
        <h1 className="hero-title">{t.hero.title}</h1>

        <div className="hero-body">
          <div className="hero-copy">
            <p className="hero-eyebrow">{t.hero.eyebrow}</p>
            <p className="hero-text">{t.hero.text}</p>
            <a href="#pasteles" className="hero-cta">
              {t.hero.cta}
              <ArrowUpRight size={18} strokeWidth={2} aria-hidden />
            </a>
            <p className="hero-meta">{t.hero.meta}</p>
          </div>
          <div className="hero-media">
            <img
              src={cakeImage}
              alt={t.hero.title}
              className="hero-img"
            />
          </div>
        </div>

        <div className="hero-scroll">
          <p className="hero-scroll-label">{t.hero.scroll}</p>
          <ol className="hero-layers">
            {t.hero.layers.map((label, i) => (
              <li
                key={label}
                className={activeLayer === i ? "is-active" : undefined}
              >
                <span>0{i + 1}</span> {label}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="narrative" aria-label={t.narrative.label} id="obrador">
        <div className="narrative-content">
          <p className="narrative-label">{t.narrative.label}</p>
          <p className="narrative-text">{t.narrative.text}</p>
        </div>
        <blockquote className="narrative-quote">{t.narrative.quote}</blockquote>
      </section>

      <LayersStory onActiveChange={setActiveLayer} />
      <CakeShop />
      <CakeBuilder />
    </main>
  );
}
