import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { token } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const navLinks = [
    { name: 'Features', href: '#features' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleSmoothScroll = (e, href) => {
    // Only handle smooth scroll if we're on the landing page
    if (location.pathname !== '/') {
      navigate('/');
      // Wait a bit for navigation, then scroll
      setTimeout(() => {
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
      return;
    }

    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setIsMenuOpen(false); // Close mobile menu
    }
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-lg fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-purple-800 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">T</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
              TaskFlow
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleSmoothScroll(e, link.href)}
                className="text-gray-700 hover:text-purple-600 transition-colors duration-200 font-medium cursor-pointer"
              >
                {link.name}
              </a>
            ))}
            {token ? (
              <button
                onClick={() => navigate('/dashboard')}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl shadow-lg hover:shadow-xl transition duration-200 font-medium transform hover:scale-105"
              >
                Dashboard
              </button>
            ) : (
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => navigate('/login')}
                  className="text-gray-700 hover:text-purple-600 transition-colors duration-200 font-medium"
                >
                  Sign In
                </button>
                <button
                  onClick={() => navigate('/register')}
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl shadow-lg hover:shadow-xl transition duration-200 font-medium transform hover:scale-105"
                >
                  Get Started
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-xl text-gray-700 hover:bg-gray-100 transition"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-3 border-t border-gray-200">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleSmoothScroll(e, link.href)}
                className="block px-4 py-2 text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-xl transition duration-200 cursor-pointer"
              >
                {link.name}
              </a>
            ))}
            {token ? (
              <button
                onClick={() => {
                  navigate('/dashboard');
                  setIsMenuOpen(false);
                }}
                className="w-full text-left px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition duration-200 font-medium"
              >
                Dashboard
              </button>
            ) : (
              <div className="space-y-3 px-4">
                <button
                  onClick={() => {
                    navigate('/login');
                    setIsMenuOpen(false);
                  }}
                  className="w-full text-left py-2 text-gray-700 hover:text-purple-600 transition-colors duration-200 font-medium"
                >
                  Sign In
                </button>
                <button
                  onClick={() => {
                    navigate('/register');
                    setIsMenuOpen(false);
                  }}
                  className="w-full py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition duration-200 font-medium"
                >
                  Get Started
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
