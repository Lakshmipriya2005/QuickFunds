import { Link, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { Facebook, Twitter, Instagram, Linkedin, User, LogIn, LogOut, UserCircle } from "lucide-react";
import logo from "./assets/logo.jpg";
 // Adjust the path to your logo image



export default function Layout({ children }) {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const userMenuRef = useRef(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    // Check if token exists to know if user is logged in
    const token = localStorage.getItem('token'); // or use Cookies.get('token') if you are using cookies
    setIsLoggedIn(!!token); // true if token exists
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
     // Remove token from local storage
     localStorage.removeItem('userid'); // Remove userId from local storage
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
      <footer className="bg-gradient-to-r from-blue-800 to-blue-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 text-blue-100">Quick Funds</h3>
              <p className="text-blue-200 mb-4">
                Providing financial solutions since 2010. We're committed to helping you achieve your financial goals.
              </p>
              <div className="flex space-x-4">
                <Link to="#" className="text-blue-200 hover:text-white transition-colors duration-300">
                  <Facebook className="h-5 w-5" />
                </Link>
                <Link to="#" className="text-blue-200 hover:text-white transition-colors duration-300">
                  <Twitter className="h-5 w-5" />
                </Link>
                <Link to="#" className="text-blue-200 hover:text-white transition-colors duration-300">
                  <Instagram className="h-5 w-5" />
                </Link>
                <Link to="#" className="text-blue-200 hover:text-white transition-colors duration-300">
                  <Linkedin className="h-5 w-5" />
                </Link>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4 text-blue-100">Our Branches</h3>
              <ul className="space-y-2 text-blue-200">
                <li className="flex items-center"><span className="w-2 h-2 rounded-full bg-blue-400 mr-2"></span>New York: 123 Finance St</li>
                <li className="flex items-center"><span className="w-2 h-2 rounded-full bg-blue-400 mr-2"></span>Los Angeles: 456 Loan Ave</li>
                <li className="flex items-center"><span className="w-2 h-2 rounded-full bg-blue-400 mr-2"></span>Chicago: 789 Credit Blvd</li>
                <li className="flex items-center"><span className="w-2 h-2 rounded-full bg-blue-400 mr-2"></span>Miami: 101 Banking Dr</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4 text-blue-100">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/About" className="text-blue-200 hover:text-white transition-colors duration-300 flex items-center">
                    <span className="mr-2">→</span> About Us
                  </Link>
                </li>
                <li>
                  <Link to="/LoanCalculator" className="text-blue-200 hover:text-white transition-colors duration-300 flex items-center">
                    <span className="mr-2">→</span> Loan Calculator
                  </Link>
                </li>
                <li>
                  <Link to="/Status" className="text-blue-200 hover:text-white transition-colors duration-300 flex items-center">
                    <span className="mr-2">→</span> Check Loan Status
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4 text-blue-100">Contact Info</h3>
              <ul className="space-y-2 text-blue-200">
                <li className="flex items-start">
                  <svg className="h-5 w-5 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                  quickfunds@gmail.com
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                  (123) 456-7890
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  Mon-Fri 9AM-5PM
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-blue-700 mt-8 pt-8 text-center text-blue-200">
            <p>&copy; {new Date().getFullYear()} Quick Funds. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
