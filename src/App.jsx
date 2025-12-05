import { CartProvider } from './context/CartContext';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import MenuPage from './components/menu/MenuPage';
import './App.css';

export default function App() {
  return (
    <CartProvider>
      <Header />
      <MenuPage />
      <Footer />
    </CartProvider>
  );
}

