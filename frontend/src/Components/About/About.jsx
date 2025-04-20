import React from 'react';
import { Clock, Shield, Award, Users, ThumbsUp, BarChart } from 'lucide-react';
import Layout from '../../Layout';
import { useNavigate } from 'react-router-dom';
import sarah from "../../assets/sarah.jpg"
import chen from "../../assets/chen.jpg"
import patel from "../../assets/patel.jpg"
const AboutUsPage = () => {
  const navigate=useNavigate()
  const handleClick = () => {
    navigate('/ApplyLoan')
  }
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-700 to-blue-500 bg-clip-text text-transparent mb-6">About Quick Funds</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Your trusted partner for fast, fair, and accessible financial solutions.
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-20 transform transition-all duration-300 hover:shadow-2xl">
          <div className="md:flex">
            <div className="md:w-1/2 bg-gradient-to-br from-blue-600 to-blue-800 p-12 text-white">
              <h2 className="text-3xl font-bold mb-8">Our Mission</h2>
              <p className="text-lg mb-6 leading-relaxed">
                At Quick Funds, we believe that financial support should be fast, fair, and accessible to everyone. Founded with a mission to simplify the loan process, we offer hassle-free, transparent, and secure loan solutions tailored to meet your needs — whether it's for emergencies, education, home improvement, or personal goals.
              </p>
              <p className="text-lg mb-6 leading-relaxed">
                Our platform is designed to provide quick approvals, flexible repayment options, and competitive interest rates, all while ensuring a seamless digital experience. We put our users first, making it easy to apply for a loan and get funds directly into your account — all with just a few clicks.
              </p>
              <p className="text-lg leading-relaxed">
                With a dedicated support team and a commitment to responsible lending, Quick Funds is more than a loan provider — we're your financial partner when you need it most.
              </p>
            </div>
            <div className="md:w-1/2 p-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-8">Why Choose Us</h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="bg-blue-100 p-3 rounded-full">
                      <Clock className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                  <div className="ml-6">
                    <h3 className="text-xl font-semibold text-gray-800">Lightning Fast Approval</h3>
                    <p className="mt-2 text-gray-600 leading-relaxed">Get approved within minutes, not days. Our streamlined process means you can receive funds as quickly as the same day.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="bg-blue-100 p-3 rounded-full">
                      <Shield className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                  <div className="ml-6">
                    <h3 className="text-xl font-semibold text-gray-800">Bank-Level Security</h3>
                    <p className="mt-2 text-gray-600 leading-relaxed">Your financial and personal information is protected with industry-leading encryption and security protocols.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="bg-blue-100 p-3 rounded-full">
                      <ThumbsUp className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                  <div className="ml-6">
                    <h3 className="text-xl font-semibold text-gray-800">No Hidden Fees</h3>
                    <p className="mt-2 text-gray-600 leading-relaxed">Transparency is our policy. We clearly disclose all fees and terms before you commit to anything.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="bg-blue-100 p-3 rounded-full">
                      <BarChart className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                  <div className="ml-6">
                    <h3 className="text-xl font-semibold text-gray-800">Flexible Options</h3>
                    <p className="mt-2 text-gray-600 leading-relaxed">Customizable repayment schedules and loan amounts designed to fit your specific financial situation.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Our Values */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-16">Our Core Values</h2>
          <div className="grid md:grid-cols-3 gap-10">
            <div className="bg-white rounded-xl p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-t-4 border-blue-500">
              <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-blue-100 text-blue-600 mb-8">
                <Users className="h-10 w-10" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Customer First</h3>
              <p className="text-gray-600 leading-relaxed">
                We design every process, feature, and interaction with our customers' needs in mind. Your success is our success.
              </p>
            </div>
            <div className="bg-white rounded-xl p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-t-4 border-blue-500">
              <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-blue-100 text-blue-600 mb-8">
                <Shield className="h-10 w-10" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Trust & Integrity</h3>
              <p className="text-gray-600 leading-relaxed">
                We operate with complete transparency and ethical standards, earning the trust of our customers through every interaction.
              </p>
            </div>
            <div className="bg-white rounded-xl p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-t-4 border-blue-500">
              <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-blue-100 text-blue-600 mb-8">
                <Award className="h-10 w-10" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Excellence</h3>
              <p className="text-gray-600 leading-relaxed">
                We continuously strive to improve our services, technology, and processes to deliver the best possible experience.
              </p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="bg-gradient-to-r from-blue-700 to-blue-900 rounded-2xl shadow-xl p-12 mb-20 text-white">
          <h2 className="text-4xl font-bold text-center mb-16">Our Impact</h2>
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="p-6 bg-white bg-opacity-10 rounded-xl backdrop-filter backdrop-blur-sm">
              <div className="text-5xl font-bold mb-3">10K+</div>
              <div className="text-lg opacity-90">Satisfied Customers</div>
            </div>
            <div className="p-6 bg-white bg-opacity-10 rounded-xl backdrop-filter backdrop-blur-sm">
              <div className="text-5xl font-bold mb-3">₹1000C+</div>
              <div className="text-lg opacity-90">Loans Funded</div>
            </div>
            <div className="p-6 bg-white bg-opacity-10 rounded-xl backdrop-filter backdrop-blur-sm">
              <div className="text-5xl font-bold mb-3">15</div>
              <div className="text-lg opacity-90">Minutes Average Approval</div>
            </div>
            <div className="p-6 bg-white bg-opacity-10 rounded-xl backdrop-filter backdrop-blur-sm">
              <div className="text-5xl font-bold mb-3">4.8/5</div>
              <div className="text-lg opacity-90">Customer Rating</div>
            </div>
          </div>
        </div>

        {/* Team */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-16">Our Leadership Team</h2>
          <div className="grid md:grid-cols-3 gap-10">
            <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="h-60 bg-gray-200">
                <img src={sarah} alt=""className='chief' />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-800">Sarah Johnson</h3>
                <p className="text-blue-600 mb-6 font-medium">Chief Executive Officer</p>
                <p className="text-gray-600 leading-relaxed">
                  With over 15 years in fintech, Sarah leads our company with a passion for financial inclusion and innovation.
                </p>
              </div>
            </div>
            <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="h-60 bg-gray-200">
              <img src={chen} alt="" className='chief' />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-800">Michael Chen</h3>
                <p className="text-blue-600 mb-6 font-medium">Chief Technology Officer</p>
                <p className="text-gray-600 leading-relaxed">
                  Michael brings extensive experience in building secure, scalable financial platforms focused on user experience.
                </p>
              </div>
            </div>
            <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="h-60 bg-gray-200">
              <img src={patel} alt="" className='chief' />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-800">Jessica Patel</h3>
                <p className="text-blue-600 mb-6 font-medium">Chief Customer Officer</p>
                <p className="text-gray-600 leading-relaxed">
                  Jessica ensures that customer satisfaction remains at the heart of everything we do at Quick Funds.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* CTA */}
        <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-16 text-center text-white shadow-xl">
          <h2 className="text-4xl font-bold mb-8">Ready to Get Started?</h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
            Join thousands of satisfied customers who trust Quick Funds for their financial needs.
          </p>
          <button className="bg-white text-blue-700 px-10 py-4 rounded-lg font-bold text-lg hover:bg-blue-50 transition-colors duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1" onClick={handleClick}>
            Apply Now
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default AboutUsPage;