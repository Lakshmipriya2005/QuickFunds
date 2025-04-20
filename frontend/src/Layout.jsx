import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { Facebook, Twitter, Instagram, Linkedin, User, LogIn, UserCircle } from "lucide-react";
import logo from "./assets/logo.jpg"; // Adjust the path to your logo image

export default function Layout({ children }) {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const userMenuRef = useRef(null);

  // Handle clicks outside of the user menu to close it
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
    <div className="flex flex-col min-h-screen">
      {/* Navigation Bar - Fixed across all pages */}
      <header className="w-full bg-white text-black py-4 px-6 shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/Home" className="text-2xl font-bold flex items-center">
              <img src={logo} alt="Logo" className="mx-auto h-20 mb-2 logo1" />
              <span className="text-gray-600">QUICK FUNDS</span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="hover:text-gray-300 transition-colors">
              Home
            </Link>
            <Link to="/ApplyLoan" className="hover:text-gray-300 transition-colors">
              Apply Loan
            </Link>
            <Link to="/LoanCalculator" className="hover:text-gray-300 transition-colors">
              Loan Calculator
            </Link>
            <Link to="/Status" className="hover:text-gray-300 transition-colors">
              Status
            </Link>
            <Link to="/About" className="hover:text-gray-300 transition-colors">
              About Us
            </Link>
            <Link to="/Contact" className="hover:text-gray-300 transition-colors">
              Contact
            </Link>
            
            {/* User Profile Dropdown */}
            <div className="relative" ref={userMenuRef}>
              <button 
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="hover:text-gray-300 transition-colors flex items-center"
              >
                <User className="h-5 w-5" />
              </button>
              
              {/* Dropdown Menu */}
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                  <Link 
                    to="/profile" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                    onClick={() => setIsUserMenuOpen(false)}
                  >
                    <UserCircle className="h-4 w-4 mr-2" />
                    Profile
                  </Link>
                  <Link 
                    to="/login" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                    onClick={() => setIsUserMenuOpen(false)}
                  >
                    <LogIn className="h-4 w-4 mr-2" />
                    Login
                  </Link>
                </div>
              )}
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 px-2 pt-2 pb-4 space-y-1 bg-white border-t border-gray-200">
            <Link 
              to="/" 
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/ApplyLoan" 
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Apply Loan
            </Link>
            <Link 
              to="/LoanCalculator" 
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Loan Calculator
            </Link>
            <Link 
              to="/Status" 
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Status
            </Link>
            <Link 
              to="/About" 
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About Us
            </Link>
            <Link 
              to="/Contact" 
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </Link>
            <Link 
              to="/profile" 
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100 flex items-center"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <UserCircle className="h-5 w-5 mr-2" />
              Profile
            </Link>
            <Link 
              to="/login" 
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100 flex items-center"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <LogIn className="h-5 w-5 mr-2" />
              Login
            </Link>
          </div>
        )}
      </header>

      {/* Page Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer - Fixed across all pages */}
      <footer className="bg-black text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">LoanEase</h3>
              <p className="text-gray-400 mb-4">
                Providing financial solutions since 2010. We're committed to helping you achieve your financial goals.
              </p>
              <div className="flex space-x-4">
                <Link to="#" className="text-white hover:text-gray-300">
                  <Facebook className="h-5 w-5" />
                </Link>
                <Link to="#" className="text-white hover:text-gray-300">
                  <Twitter className="h-5 w-5" />
                </Link>
                <Link to="#" className="text-white hover:text-gray-300">
                  <Instagram className="h-5 w-5" />
                </Link>
                <Link to="#" className="text-white hover:text-gray-300">
                  <Linkedin className="h-5 w-5" />
                </Link>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">Our Branches</h3>
              <ul className="space-y-2 text-gray-400">
                <li>New York: 123 Finance St</li>
                <li>Los Angeles: 456 Loan Ave</li>
                <li>Chicago: 789 Credit Blvd</li>
                <li>Miami: 101 Banking Dr</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/About" className="text-gray-400 hover:text-white">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/LoanCalculator" className="text-gray-400 hover:text-white">
                    Loan Calculator
                  </Link>
                </li>
                <li>
                  <Link to="/Status" className="text-gray-400 hover:text-white">
                    Check Loan Status
                  </Link>
                </li>
                <li>
                  <Link to="/Contact" className="text-gray-400 hover:text-white">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">Contact Info</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Email: quickfunds@gmail.com</li>
                <li>Phone: (123) 456-7890</li>
                <li>Hours: Mon-Fri 9AM-5PM</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} Loan Master. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}