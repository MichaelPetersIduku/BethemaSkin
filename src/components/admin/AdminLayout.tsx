import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import { useAdmin } from '../../contexts/AdminContext';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { useState, useEffect } from 'react';

export function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAdmin();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin/login');
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { path: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/admin/products', label: 'Products', icon: Package },
    { path: '/admin/orders', label: 'Orders', icon: ShoppingCart },
  ];

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Top Bar */}
      <div className="bg-white border-b border-neutral-200">
        <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-8">
            <h1 className="text-xl tracking-tight">BETHEMA SKIN ADMIN</h1>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 transition-colors ${
                    isActive(item.path)
                      ? 'text-neutral-900'
                      : 'text-neutral-600 hover:text-neutral-900'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="hidden md:block text-neutral-600 hover:text-neutral-900 transition-colors"
            >
              View Store
            </Link>
            <button
              onClick={handleLogout}
              className="hidden md:flex items-center gap-2 text-neutral-600 hover:text-neutral-900 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 px-4 border-t border-neutral-200">
            <nav className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-2 transition-colors ${
                    isActive(item.path) ? 'text-neutral-900' : 'text-neutral-600'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </Link>
              ))}
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className="text-neutral-600"
              >
                View Store
              </Link>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleLogout();
                }}
                className="flex items-center gap-2 text-neutral-600 text-left"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </nav>
          </div>
        )}
      </div>

      {/* Main Content */}
      <main className="p-4 sm:p-6 lg:p-8">
        <Outlet />
      </main>
    </div>
  );
}
