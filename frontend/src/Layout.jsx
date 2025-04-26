import { Link, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { Facebook, Twitter, Instagram, Linkedin, User, LogIn, LogOut, UserCircle } from "lucide-react";
import logo from "./assets/logo.jpg"; // Adjust the path to your logo image

export default function Layout({ children }) {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const userMenuRef = useRef(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    // Check if token exists to know if user is logged in
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token); // true if token exists
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token'); // remove the token
    setIsLoggedIn(false);
    setIsUserMenuOpen(false);
    navigate("/login");
  };

  // Handle clicks outside to close user menu
  useEffect(() => {
    function handleClickOutside(event) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="w-full bg-white text-gray-800 py-3 px-6 shadow-lg sticky top-0 z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/Home" className="text-2xl font-bold flex items-center">
              <img src={logo} alt="Logo" className="h-16 mr-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 logo1" />
              <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent font-extrabold tracking-tight">QUICK FUNDS</span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="font-medium text-gray-600 hover:text-blue-600 transition">Home</Link>
            <Link to="/ApplyLoan" className="font-medium text-gray-600 hover:text-blue-600 transition">Apply Loan</Link>
            <Link to="/LoanCalculator" className="font-medium text-gray-600 hover:text-blue-600 transition">Loan Calculator</Link>
            <Link to="/Status" className="font-medium text-gray-600 hover:text-blue-600 transition">Status</Link>
            <Link to="/About" className="font-medium text-gray-600 hover:text-blue-600 transition">About Us</Link>

            {/* User Dropdown */}
            <div className="relative ml-4" ref={userMenuRef}>
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-50 hover:bg-blue-100 text-blue-600 transition"
              >
                <User className="h-5 w-5" />
              </button>

              {/* Dropdown menu */}
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-xl py-1 z-50 border border-gray-100 animate-fadeIn">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 flex items-center"
                    onClick={() => setIsUserMenuOpen(false)}
                  >
                    <UserCircle className="h-4 w-4 mr-2" /> Profile
                  </Link>

                  {isLoggedIn ? (
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 flex items-center"
                    >
                      <LogOut className="h-4 w-4 mr-2" /> Logout
                    </button>
                  ) : (
                    <Link
                      to="/login"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 flex items-center"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <LogIn className="h-4 w-4 mr-2" /> Login
                    </Link>
                  )}
                </div>
              )}
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {/* hamburger icon */}
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-3 space-y-2 bg-white py-2 border-t">
            <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-2 text-gray-600 hover:bg-blue-50">Home</Link>
            <Link to="/ApplyLoan" onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-2 text-gray-600 hover:bg-blue-50">Apply Loan</Link>
            <Link to="/LoanCalculator" onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-2 text-gray-600 hover:bg-blue-50">Loan Calculator</Link>
            <Link to="/Status" onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-2 text-gray-600 hover:bg-blue-50">Status</Link>
            <Link to="/About" onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-2 text-gray-600 hover:bg-blue-50">About Us</Link>
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-gray-600 hover:bg-blue-50"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-4 py-2 text-gray-600 hover:bg-blue-50"
              >
                Login
              </Link>
            )}
          </div>
        )}
      </header>

      {/* Main content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      {/* Footer content here */}
    </div>
  );
}
