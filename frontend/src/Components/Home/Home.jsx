import logo from "../../assets/logo.jpg"
import {Link} from "react-router-dom"
import { Facebook, Twitter, Instagram, Linkedin, User } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <header className="w-full bg-white text-black py-4 px-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/Home" className="text-2xl  font-bold flex items-center">
             
             <img src={logo} alt="Logo" className="mx-auto h-20 mb-2 logo1" />
              <span className="text-gray-600">  QUICK FUNDS</span>
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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="w-full">
          <div className="flex flex-col md:flex-row h-[500px] md:h-[600px]">
            {/* Left Side */}
            <div className="w-full md:w-1/2 bg-white text-black flex flex-col justify-center items-center p-8 relative">
              <div className="max-w-md mx-auto text-center md:text-left">
                <p className="text-lg mb-2">We Are Professional</p>
                <h1 className="text-5xl md:text-7xl font-bold mb-4">Loan</h1>
                <h2 className="text-3xl md:text-4xl font-semibold mb-6">Financial Services</h2>
                <p className="mb-8 text-neutral-950">
                  Get the financial support you need with our easy and accessible loan services. We offer competitive
                  rates and flexible repayment options.
                </p>
                <Link
                  to="/ApplyLoan"
                  className="inline-block bg-black text-white px-6 py-3 rounded hover:bg-gray-200 transition-colors"
                >
                  Apply Now
                </Link>
              </div>
             
            </div>

            {/* Right Side */}
            <div className="w-full md:w-1/2 bg-white text-black flex items-center justify-center p-8 relative">
   

            <img 
              src={logo}
              alt="Logo" 
              width={500}
              height={500}
              className="object-cover rounded-lg shadow-lg lo"
            />

              
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-16 bg-gray-100">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Loan Services</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                We offer a variety of loan options to meet your financial needs. Explore our services and find the right
                solution for you.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Personal Loans",
                  description: "Get funds for personal expenses with flexible repayment options.",
                },
                {
                  title: "Business Loans",
                  description: "Grow your business with our tailored financing solutions.",
                },
                {
                  title: "Home Loans",
                  description: "Make your dream home a reality with competitive mortgage rates.",
                },
              ].map((service, index) => (
                <div key={index} className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-bold mb-4">{service.title}</h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <Link href="/apply-loan" className="text-black font-medium hover:underline">
                    Learn more →
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-black text-white">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to get started?</h2>
            <p className="text-gray-300 max-w-2xl mx-auto mb-8">
              Apply for a loan today and get a decision within 24 hours. Our process is simple, fast, and transparent.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/ApplyLoan"
                className="bg-white text-black px-6 py-3 rounded hover:bg-gray-200 transition-colors"
              >
                Apply for a Loan
              </Link>
              <Link
                to="/LoanCalculator"
                className="border border-white px-6 py-3 rounded hover:bg-white hover:text-black transition-colors"
              >
                Calculate Your Loan
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
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
                <li>Email: quickfunds@gamil.com</li>
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
  )
}
