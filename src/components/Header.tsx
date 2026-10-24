import { ShoppingBag } from "lucide-react";
import { useCart } from "../cart";
import { useI18n, type Lang } from "../i18n";

const langs: Lang[] = ["es", "en"];

export default function Header() {
  const { t, lang, setLang } = useI18n();
  const { count, setOpen } = useCart();

  const navItems = [
    { label: t.nav.cakes, href: "#pasteles" },
    { label: t.nav.build, href: "#crea" },
    { label: t.nav.workshop, href: "#obrador" },
    { label: t.nav.delivery, href: "#entrega" },
  ];

  return (
    <>
      <div className="topbar">{t.topbar}</div>
      <header className="header">
        <a href="/" className="logo">
          <span className="logo-text">{t.brand}</span>
          <span className="logo-subtitle">{t.tagline}</span>
        </a>

        <nav className="nav" aria-label="Main">
          {navItems.map((item) => (
            <a href={item.href} key={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <div className="lang-toggle" role="group" aria-label="Language">
            {langs.map((code) => (
              <button
                key={code}
                type="button"
                className={lang === code ? "is-active" : undefined}
                onClick={() => setLang(code)}
              >
                {t.lang[code]}
              </button>
            ))}
          </div>
          <button type="button" className="bag" onClick={() => setOpen(true)}>
            <ShoppingBag size={18} strokeWidth={2} aria-hidden />
            {t.nav.bag} ({count})
          </button>
        </div>
      </header>
    </>
  );
}
