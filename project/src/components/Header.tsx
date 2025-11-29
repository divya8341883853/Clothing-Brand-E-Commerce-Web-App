import { ShoppingCart, User, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from './Router';

interface HeaderProps {
  cartItemsCount: number;
}

export const Header = ({ cartItemsCount }: HeaderProps) => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center cursor-pointer" onClick={() => navigate('/')}>
            <h1 className="text-2xl font-bold text-gray-900">ClothStore</h1>
          </div>

          <nav className="flex items-center gap-6">
            <button
              onClick={() => navigate('/')}
              className="text-gray-700 hover:text-gray-900 font-medium"
            >
              Products
            </button>

            {user && (
              <button
                onClick={() => navigate('/orders')}
                className="text-gray-700 hover:text-gray-900 font-medium"
              >
                My Orders
              </button>
            )}

            <button
              onClick={() => navigate('/cart')}
              className="relative text-gray-700 hover:text-gray-900"
            >
              <ShoppingCart className="h-6 w-6" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </button>

            {user ? (
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-700">Hello, {user.email}</span>
                <button
                  onClick={signOut}
                  className="text-gray-700 hover:text-gray-900"
                  title="Sign out"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => navigate('/login')}
                className="flex items-center gap-2 text-gray-700 hover:text-gray-900"
              >
                <User className="h-5 w-5" />
                <span className="font-medium">Login</span>
              </button>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};
