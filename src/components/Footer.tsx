import { useI18n } from "../i18n";

export default function Footer() {
  const { t } = useI18n();
  return (
    <footer className="footer" id="entrega">
      <p className="footer-brand">{t.brand}</p>
      <p>{t.footer.note}</p>
      <p className="footer-rights">© {new Date().getFullYear()} miga. — {t.footer.rights}</p>
    </footer>
  );
}
