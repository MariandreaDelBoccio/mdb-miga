import { useEffect, useMemo, useState } from "react";
import {
  DEFAULT_CONFIG,
  LAYER_OPTIONS,
  SERVINGS,
  configFromSearch,
  configToSearch,
  optionById,
  priceFor,
  type CakeConfig,
  type LayerKey,
} from "../data";
import { useCart } from "../cart";
import { useI18n } from "../i18n";

const KEYS: LayerKey[] = ["frosting", "sponge", "filling", "base"];

export default function CakeBuilder() {
  const { t, lang } = useI18n();
  const { add } = useCart();
  const [config, setConfig] = useState<CakeConfig>(() => {
    if (typeof window === "undefined") return DEFAULT_CONFIG;
    return configFromSearch(new URLSearchParams(window.location.search));
  });
  const [copied, setCopied] = useState(false);
  const [added, setAdded] = useState(false);

  const price = useMemo(() => priceFor(config), [config]);

  useEffect(() => {
    const next = configToSearch(config);
    const url = `${window.location.pathname}?${next}#crea`;
    window.history.replaceState(null, "", url);
  }, [config]);

  const labels = {
    frosting: t.builder.frosting,
    sponge: t.builder.sponge,
    filling: t.builder.filling,
    base: t.builder.base,
  };

  const compositionLabel = KEYS.map(
    (key) => optionById(key, config[key]).label[lang],
  ).join(" · ");

  const setLayer = (key: LayerKey, id: string) => {
    setConfig((prev) => ({ ...prev, [key]: id }));
    setAdded(false);
  };

  const share = async () => {
    const url = window.location.href;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.prompt(t.builder.share, url);
    }
  };

  const addToBag = () => {
    add(config, compositionLabel);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1600);
  };

  return (
    <section className="builder" id="crea">
      <header className="builder-head">
        <p className="builder-kicker">{t.builder.kicker}</p>
        <h2 className="builder-title">{t.builder.title}</h2>
        <p className="builder-lead">{t.builder.lead}</p>
      </header>

      <div className="builder-grid">
        <div className="builder-preview" aria-label={t.builder.preview}>
          <div className="cake-round">
            <div className="cake-dome" style={{ background: optionById("frosting", config.frosting).color }} />
            <div className="cake-body">
              {KEYS.map((key) => {
                const option = optionById(key, config[key]);
                return (
                  <div
                    key={key}
                    className={`cake-ring cake-ring-${key}`}
                    style={{ background: option.color }}
                    title={option.label[lang]}
                  />
                );
              })}
            </div>
            <div className="cake-plate" aria-hidden />
          </div>
          <p className="builder-composition">{compositionLabel}</p>
        </div>

        <div className="builder-controls">
          {KEYS.map((key) => (
            <fieldset key={key} className="builder-field">
              <legend>{labels[key]}</legend>
              <div className="builder-options">
                {LAYER_OPTIONS[key].map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    className={
                      config[key] === option.id
                        ? "builder-option is-active"
                        : "builder-option"
                    }
                    onClick={() => setLayer(key, option.id)}
                  >
                    <span
                      className="builder-swatch"
                      style={{ background: option.color }}
                      aria-hidden
                    />
                    <span>{option.label[lang]}</span>
                  </button>
                ))}
              </div>
            </fieldset>
          ))}

          <fieldset className="builder-field">
            <legend>{t.builder.servings}</legend>
            <div className="builder-options">
              {SERVINGS.map((n) => (
                <button
                  key={n}
                  type="button"
                  className={
                    config.servings === n
                      ? "builder-option is-active"
                      : "builder-option"
                  }
                  onClick={() => {
                    setConfig((prev) => ({ ...prev, servings: n }));
                    setAdded(false);
                  }}
                >
                  {n}
                </button>
              ))}
            </div>
          </fieldset>

          <div className="builder-summary">
            <p>
              <span>{t.builder.price}</span>
              <strong>{price} €</strong>
            </p>
            <div className="builder-actions">
              <button type="button" className="builder-share" onClick={share}>
                {copied ? t.builder.shared : t.builder.share}
              </button>
              <button type="button" className="builder-add" onClick={addToBag}>
                {added ? t.builder.added : t.builder.add}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
