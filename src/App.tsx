import CartDrawer from "./components/CartDrawer";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { CartProvider } from "./cart";
import { I18nProvider } from "./i18n";
import Home from "./pages/Home";

function App() {
  return (
    <I18nProvider>
      <CartProvider>
        <Header />
        <Home />
        <Footer />
        <CartDrawer />
      </CartProvider>
    </I18nProvider>
  );
}

export default App;
