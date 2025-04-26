import { Link } from "react-router-dom";
import logo from "../../assets/logo.jpg";
import Layout from "../../Layout";

export default function HomePage() {
  return (
    <>
    <Layout>
      {/* Hero Section */}
      <section className="w-full">
        <div className="flex flex-col md:flex-row h-[500px] md:h-[600px]">
          {/* Left Side */}
          <div className="w-full md:w-1/2 bg-gradient-to-br from-blue-50 to-white text-black flex flex-col justify-center p-8 relative">
            <div className="max-w-lg mx-auto md:ml-auto md:mr-0 text-center md:text-left">
              <p className="text-blue-600 font-medium mb-2 tracking-wide uppercase animate-fadeIn">We Are Professional</p>
              <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-blue-700 to-blue-900 bg-clip-text text-transparent animate-fadeInUp">Loan</h1>
              <h2 className="text-3xl md:text-4xl font-semibold mb-6 text-gray-800 animate-fadeInUp">Financial Services</h2>
              <p className="mb-8 text-gray-600 leading-relaxed animate-fadeInUp">
                Get the financial support you need with our easy and accessible loan services. We offer competitive
                rates and flexible repayment options tailored to your unique situation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-center md:justify-start animate-fadeInUp">
                <Link
                  to="/ApplyLoan"
                  className="inline-block bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium px-8 py-3 rounded-lg shadow-md hover:shadow-lg hover:translate-y-0.5 transform transition-all duration-300 w-full sm:w-auto"
                >
                  Apply Now
                </Link>
                <Link
                  to="/LoanCalculator"
                  className="inline-block bg-white text-blue-600 border border-blue-200 font-medium px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors duration-300 w-full sm:w-auto"
                >
                  Calculate Loan
                </Link>
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="w-full md:w-1/2 bg-blue-50 text-black flex items-center justify-center p-8 relative">
            <div className="absolute inset-0 bg-pattern opacity-5"></div>
            <img
              src={logo}
              alt="Logo"
              width={500}
              height={500}
              className="object-cover rounded-lg shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 z-10"
            />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-gray-800">Our Loan Services</h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
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
                icon: "💼"
              },
              {
                title: "Business Loans",
                description: "Grow your business with our tailored financing solutions.",
                icon: "🏢"
              },
              {
                title: "Home Loans",
                description: "Make your dream home a reality with competitive mortgage rates.",
                icon: "🏠"
              },
            ].map((service, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 transform hover:-translate-y-1">
                <div className="text-3xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold mb-4 text-gray-800">{service.title}</h3>
                <p className="text-gray-600 mb-6">{service.description}</p>
                <Link to="/ApplyLoan" className="inline-flex items-center text-blue-600 font-medium hover:text-blue-800 transition-colors">
                  Learn more 
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to get started?</h2>
          <p className="text-blue-100 max-w-2xl mx-auto mb-8">
            Apply for a loan today and get a decision within 24 hours. Our process is simple, fast, and transparent.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/ApplyLoan"
              className="bg-white text-blue-700 px-8 py-3 rounded-lg font-medium shadow-lg hover:shadow-xl hover:bg-blue-50 transition-all duration-300"
            >
              Apply for a Loan
            </Link>
            <Link
              to="/LoanCalculator"
              className="bg-transparent border-2 border-white px-8 py-3 rounded-lg font-medium hover:bg-white hover:text-blue-700 transition-all duration-300"
            >
              Calculate Your Loan
            </Link>
          </div>
        </div>
      </section>
      </Layout>
    </>
  );
}