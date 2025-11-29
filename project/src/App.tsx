import { useEffect, useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import { Router, useRouter } from './components/Router';
import { Header } from './components/Header';
import { ProductsPage } from './pages/ProductsPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { OrdersPage } from './pages/OrdersPage';
import { supabase, getSessionId } from './lib/supabase';
import { Database } from './lib/database.types';

type CartItem = Database['public']['Tables']['cart_items']['Row'];

function AppContent() {
  const { currentRoute } = useRouter();
  const [cartItemsCount, setCartItemsCount] = useState(0);

  useEffect(() => {
    fetchCartCount();

    const handleStorageChange = () => {
      fetchCartCount();
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const fetchCartCount = async () => {
    try {
      const sessionId = getSessionId();
      let query = supabase
        .from('cart_items')
        .select('id', { count: 'exact' });

      const { data: user } = await supabase.auth.getUser();
      if (user?.user?.id) {
        query = query.eq('user_id', user.user.id);
      } else {
        query = query.eq('session_id', sessionId);
      }

      const { count } = await query;
      setCartItemsCount(count || 0);
    } catch (error) {
      console.error('Error fetching cart count:', error);
    }
  };

  const renderPage = () => {
    switch (currentRoute) {
      case '/':
        return <ProductsPage />;
      case '/product':
        return <ProductDetailPage />;
      case '/cart':
        return <CartPage />;
      case '/checkout':
        return <CheckoutPage />;
      case '/login':
        return <LoginPage />;
      case '/register':
        return <RegisterPage />;
      case '/orders':
        return <OrdersPage />;
      default:
        return <ProductsPage />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header cartItemsCount={cartItemsCount} />
      {renderPage()}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;
