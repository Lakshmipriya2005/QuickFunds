import React, { useState } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Search, LogOut, User } from 'lucide-react';
import logo from '../../assets/logo.jpg'; 
import {Link} from 'react-router-dom' // Adjust the path to your logo
import helena from '../../assets/helena.jpg'; // Adjust the path to your logo
import oscar from '../../assets/oscar.jpg'; // Adjust the path to your logo
import daniel from '../../assets/daniel.jpg'; // Adjust the path to your logo
import danielJay from '../../assets/danielJay.jpeg'; // Adjust the path to your logo
import mark from '../../assets/mark.jpg'; // Adjust the path to your logo


// Mock data for charts
const lineChartData = [
  { name: '24', value: 35000 },
  { name: '25', value: 40000 },
  { name: '26', value: 45000 },
  { name: '27', value: 52000 },
  { name: '28', value: 48000 },
  { name: '29', value: 58000 },
  { name: '30', value: 70000 },
];

const barChartData = [
  { name: 'Jan', value: 50000 },
  { name: 'Feb', value: 70000 },
  { name: 'Mar', value: 55000 },
  { name: 'Apr', value: 60000 },
  { name: 'May', value: 75000 },
  { name: 'Jun', value: 65000 },
  { name: 'Jul', value: 80000 },
  { name: 'Aug', value: 72000 },
  { name: 'Sep', value: 68000 },
  { name: 'Oct', value: 65000 },
  { name: 'Nov', value: 60000 },
  { name: 'Dec', value: 55000 },
];

const userDetails = [
  { name: 'Helena', loanBought: 4321, loanPaid: '+84%', email: 'email@fakeemailddomain.net', avatar: helena },
  { name: 'Oscar', loanBought: 4033, loanPaid: '-8%', email: 'email@fakeemailddomain.net', avatar: oscar },
  { name: 'Daniel', loanBought: 3928, loanPaid: '+7%', email: 'email@fakeemailddomain.net', avatar:  daniel},
  { name: 'Daniel Jay Park', loanBought: 2104, loanPaid: '+33%', email: 'email@fakeemailddomain.net', avatar: danielJay },
  { name: 'Mark Rojas', loanBought: 2003, loanPaid: '+30%', email: 'email@fakeemailddomain.net', avatar: mark },
  { name: 'Shrezram', loanBought: 1894, loanPaid: '+15%', email: 'email@fakeemailddomain.net', avatar: '/api/placeholder/40/40' },
  { name: 'Lakshmipriya', loanBought: 495, loanPaid: '-12%', email: 'email@fakeemailddomain.net', avatar: '/api/placeholder/40/40' },
];

// Top users to display in the users widget
const topUsers = userDetails.slice(0, 5);

function Dashboard() {
  // State to control the dropdown visibility
  const [showDropdown, setShowDropdown] = useState(false);
  
  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  // Close dropdown when clicking outside
  const closeDropdown = () => {
    setShowDropdown(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100" onClick={closeDropdown}>
      <div className="bg-white mx-auto max-w-7xl shadow-xl rounded-xl p-8 my-8">
        {/* Header */}
        <header className="flex justify-between items-center mb-10 border-b border-gray-100 pb-6">
          <div className="flex items-center">
            <div className="flex items-center">
              <Link href="/Dashboard" className="text-2xl font-bold flex items-center">
                <img src={logo} alt="Logo" className="mx-auto h-20 mb-2 logo1" />
                <span className="text-blue-800 font-semibold tracking-tight ml-2">QUICK FUNDS</span>
              </Link>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            <nav className="hidden md:flex space-x-8">
              <Link to="/Dashboard" className="text-blue-800 font-medium hover:text-blue-600 border-b-2 border-blue-600 pb-1 transition-all duration-200">Dashboard</Link>
              <Link to="/DashboardStatus" className="text-gray-600 font-medium hover:text-blue-600 hover:border-b-2 hover:border-blue-600 pb-1 transition-all duration-200">Status</Link>
            </nav>
            
            {/* Profile dropdown container */}
            <div className="relative" onClick={(e) => e.stopPropagation()}>
              <button 
                onClick={toggleDropdown}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 shadow-sm hover:shadow hover:bg-blue-200 transition-all duration-200"
              >
                <span className="text-blue-600 text-sm">👤</span>
              </button>
              
              {/* Dropdown menu */}
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-10 border border-gray-100">
                  <Link to="/profile" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-50">
                    <User className="w-4 h-4 mr-2 text-blue-500" />
                    Profile
                  </Link>
                  <hr className="my-1 border-gray-100" />
                  <Link to="/login" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-50">
                    <LogOut className="w-4 h-4 mr-2 text-blue-500" />
                    Login
                  </Link>
                </div>
              )}
            </div>
          </div>
        </header>
        
        {/* Search Bar */}
        <div className="relative mb-10">
          <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
            <Search className="w-5 h-5 text-blue-500" />
          </div>
          <input
            type="text"
            className="block w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm"
            placeholder="Search..."
          />
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {/* Client Card */}
          <div className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-xl border border-gray-100 shadow-md hover:shadow-lg transition-all duration-300">
            <h2 className="text-sm font-medium text-gray-500 mb-2 uppercase tracking-wider">Client</h2>
            <div className="text-4xl font-bold mb-3 text-blue-800">101</div>
            <p className="text-sm text-green-600 font-medium flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12 7a1 1 0 11-2 0 1 1 0 012 0zm-1 13a1 1 0 100-2 1 1 0 000 2zm7-13a1 1 0 10-2 0 1 1 0 002 0zM7 7a1 1 0 11-2 0 1 1 0 012 0zm13 6a1 1 0 10-2 0 1 1 0 002 0zM16 7a1 1 0 11-2 0 1 1 0 012 0zM9 20a1 1 0 100-2 1 1 0 000 2zM7 13a1 1 0 11-2 0 1 1 0 012 0zM7 19a1 1 0 11-2 0 1 1 0 012 0z" clipRule="evenodd" />
              </svg>
              +20% month over month
            </p>
          </div>
          
          {/* Loan Distributed Card */}
          <div className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-xl border border-gray-100 shadow-md hover:shadow-lg transition-all duration-300">
            <h2 className="text-sm font-medium text-gray-500 mb-2 uppercase tracking-wider">Loan Distributed</h2>
            <div className="text-4xl font-bold mb-3 text-blue-800">1,000,000</div>
            <p className="text-sm text-green-600 font-medium flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12 7a1 1 0 11-2 0 1 1 0 012 0zm-1 13a1 1 0 100-2 1 1 0 000 2zm7-13a1 1 0 10-2 0 1 1 0 002 0zM7 7a1 1 0 11-2 0 1 1 0 012 0zm13 6a1 1 0 10-2 0 1 1 0 002 0zM16 7a1 1 0 11-2 0 1 1 0 012 0zM9 20a1 1 0 100-2 1 1 0 000 2zM7 13a1 1 0 11-2 0 1 1 0 012 0zM7 19a1 1 0 11-2 0 1 1 0 012 0z" clipRule="evenodd" />
              </svg>
              +24% month over month
            </p>
          </div>
          
          {/* Loan Collected Card */}
          <div className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-xl border border-gray-100 shadow-md hover:shadow-lg transition-all duration-300">
            <h2 className="text-sm font-medium text-gray-500 mb-2 uppercase tracking-wider">Loan Collected</h2>
            <div className="text-4xl font-bold mb-3 text-blue-800">600,000</div>
            <p className="text-sm text-green-600 font-medium flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12 7a1 1 0 11-2 0 1 1 0 012 0zm-1 13a1 1 0 100-2 1 1 0 000 2zm7-13a1 1 0 10-2 0 1 1 0 002 0zM7 7a1 1 0 11-2 0 1 1 0 012 0zm13 6a1 1 0 10-2 0 1 1 0 002 0zM16 7a1 1 0 11-2 0 1 1 0 012 0zM9 20a1 1 0 100-2 1 1 0 000 2zM7 13a1 1 0 11-2 0 1 1 0 012 0zM7 19a1 1 0 11-2 0 1 1 0 012 0z" clipRule="evenodd" />
              </svg>
              +8% month over month
            </p>
          </div>
        </div>
        
        {/* Charts Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {/* Line Chart */}
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-md col-span-2 hover:shadow-lg transition-all duration-300">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-blue-800">Loan Growth Trends</h2>
              <div className="flex space-x-2">
                <button className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded-full font-medium">Weekly</button>
                <button className="px-3 py-1 text-xs bg-gray-100 text-gray-600 rounded-full font-medium">Monthly</button>
                <button className="px-3 py-1 text-xs bg-gray-100 text-gray-600 rounded-full font-medium">Yearly</button>
              </div>
            </div>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={lineChartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tickFormatter={(value) => `$${value/1000}k`}
                    domain={['dataMin - 5000', 'dataMax + 5000']}
                  />
                  <Tooltip contentStyle={{borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', border: 'none'}} />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#3b82f6" 
                    strokeWidth={3}
                    dot={{ r: 4, fill: '#3b82f6', strokeWidth: 2, stroke: '#fff' }} 
                    activeDot={{ r: 8, strokeWidth: 0, fill: "#3b82f6" }} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          {/* Users Card */}
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-md hover:shadow-lg transition-all duration-300">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-blue-800">Top Users</h2>
              <button className="text-xs text-blue-600 font-medium">View All</button>
            </div>
            <div className="space-y-5">
              {topUsers.map((user, index) => (
                <div key={index} className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-all duration-200">
                  <img 
                    src={user.avatar} 
                    alt={user.name} 
                    className="w-12 h-12 rounded-full mr-4 border-2 border-blue-100" 
                  />
                  <div className="flex-grow">
                    <p className="text-sm font-semibold text-gray-800">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                  <div className={`text-sm font-bold ${user.loanPaid.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                    {user.loanPaid}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* User Details Table */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Table */}
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-md col-span-2 hover:shadow-lg transition-all duration-300">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-blue-800">User Loan Details</h2>
              <div className="flex space-x-2">
                <button className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded-full font-medium">Export</button>
                <button className="px-3 py-1 text-xs bg-gray-100 text-gray-600 rounded-full font-medium">Filter</button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                    <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Loan Bought</th>
                    <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Loan Paid</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {userDetails.map((user, index) => (
                    <tr key={index} className="hover:bg-gray-50 transition-all duration-200">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{user.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-right font-medium">{user.loanBought}</td>
                      <td className={`px-6 py-4 whitespace-nowrap text-sm font-bold text-right ${user.loanPaid.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                        {user.loanPaid}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          {/* Bar Chart */}
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-md hover:shadow-lg transition-all duration-300">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-blue-800">Monthly Distribution</h2>
              <div className="text-xs text-gray-500 font-medium">2025</div>
            </div>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barChartData}>
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tickFormatter={(value) => `$${value/1000}k`}
                    domain={[0, 'dataMax + 5000']}
                    hide
                  />
                  <Tooltip contentStyle={{borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', border: 'none'}} />
                  <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;