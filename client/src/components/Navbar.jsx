import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { MapPin, Bell, LogOut, Menu, X, Shield } from 'lucide-react';
import { useState } from 'react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <MapPin className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-gray-900 text-lg">CivicFlow</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/track" className="text-sm text-gray-600 hover:text-blue-600 font-medium transition-colors">
              Track Issue
            </Link>
            <Link to="/map" className="text-sm text-gray-600 hover:text-blue-600 font-medium transition-colors">
              Issue Map
            </Link>
            {!user ? (
              <div className="flex items-center gap-2">
                <Link to="/login" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
                  Login
                </Link>
                <Link to="/register" className="bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Get Started
                </Link>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                {user.role !== 'citizen' && (
                  <Link
                    to="/admin"
                    className="flex items-center gap-1 text-sm text-purple-600 font-medium hover:text-purple-700"
                  >
                    <Shield className="w-4 h-4" />
                    Admin
                  </Link>
                )}
                <Link
                  to={user.role === 'citizen' ? '/dashboard' : '/admin'}
                  className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 rounded-lg px-3 py-1.5 transition-colors"
                >
                  <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold">
                    {user.name?.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm font-medium text-gray-700">{user.name?.split(' ')[0]}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-gray-500 hover:text-red-600 transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white px-4 py-3 space-y-2">
          <Link to="/track" className="block text-sm text-gray-700 py-2" onClick={() => setMenuOpen(false)}>Track Issue</Link>
          <Link to="/map" className="block text-sm text-gray-700 py-2" onClick={() => setMenuOpen(false)}>Issue Map</Link>
          {!user ? (
            <>
              <Link to="/login" className="block text-sm text-gray-700 py-2" onClick={() => setMenuOpen(false)}>Login</Link>
              <Link to="/register" className="block text-sm text-blue-600 font-medium py-2" onClick={() => setMenuOpen(false)}>Register</Link>
            </>
          ) : (
            <>
              <Link to={user.role === 'citizen' ? '/dashboard' : '/admin'} className="block text-sm text-gray-700 py-2" onClick={() => setMenuOpen(false)}>
                Dashboard ({user.name})
              </Link>
              <button onClick={handleLogout} className="block text-sm text-red-600 py-2 text-left w-full">Logout</button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;

