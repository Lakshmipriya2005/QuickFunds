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
                <Link to="/ApplyLoan" className="text-black font-medium hover:underline">
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
      </Layout>
    </>
    
  );
}
