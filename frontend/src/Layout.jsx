import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Linkedin, User } from "lucide-react";
import logo from "./assets/logo.jpg"; // Adjust the path to your logo image

export default function Layout({ children }) {
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
            <Link to="/Home" className="hover:text-gray-300 transition-colors">
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
            <Link to="/profile" className="hover:text-gray-300 transition-colors">
              <User className="h-5 w-5" />
            </Link>
          </nav>

          <button className="md:hidden">
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