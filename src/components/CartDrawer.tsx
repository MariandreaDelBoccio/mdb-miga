import { useCart } from "../cart";
import { useI18n } from "../i18n";

export default function CartDrawer() {
  const { t } = useI18n();
  const { items, total, open, setOpen, remove } = useCart();

  if (!open) return null;

  return (
    <div className="cart-root" role="dialog" aria-modal="true" aria-label={t.cart.title}>
      <button
        type="button"
        className="cart-backdrop"
        aria-label={t.cart.close}
        onClick={() => setOpen(false)}
      />
      <aside className="cart-drawer">
        <header className="cart-head">
          <h2>{t.cart.title}</h2>
          <button type="button" onClick={() => setOpen(false)}>
            {t.cart.close}
          </button>
        </header>

        {items.length === 0 ? (
          <div className="cart-empty">
            <p>{t.cart.empty}</p>
            <p>{t.cart.emptyHint}</p>
          </div>
        ) : (
          <ul className="cart-list">
            {items.map((item) => (
              <li key={item.id}>
                <div>
                  <p className="cart-item-label">{item.label}</p>
                  <p className="cart-item-meta">
                    {item.config.servings} · {item.price} €
                  </p>
                </div>
                <button type="button" onClick={() => remove(item.id)}>
                  {t.cart.remove}
                </button>
              </li>
            ))}
          </ul>
        )}

        <footer className="cart-foot">
          <p>
            <span>{t.cart.total}</span>
            <strong>{total} €</strong>
          </p>
          <button type="button" className="cart-checkout" disabled={items.length === 0}>
            {t.cart.checkout}
          </button>
        </footer>
      </aside>
    </div>
  );
}
