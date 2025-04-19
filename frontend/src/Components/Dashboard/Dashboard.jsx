import React from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Search } from 'lucide-react';
import logo from '../../assets/logo.jpg'; 
import {Link} from 'react-router-dom' // Adjust the path to your logo

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
  { name: 'Helena', loanBought: 4321, loanPaid: '+84%', email: 'email@fakeemailddomain.net', avatar: '/api/placeholder/40/40' },
  { name: 'Oscar', loanBought: 4033, loanPaid: '-8%', email: 'email@fakeemailddomain.net', avatar: '/api/placeholder/40/40' },
  { name: 'Daniel', loanBought: 3928, loanPaid: '+7%', email: 'email@fakeemailddomain.net', avatar: '/api/placeholder/40/40' },
  { name: 'Daniel Jay Park', loanBought: 2104, loanPaid: '+33%', email: 'email@fakeemailddomain.net', avatar: '/api/placeholder/40/40' },
  { name: 'Mark Rojas', loanBought: 2003, loanPaid: '+30%', email: 'email@fakeemailddomain.net', avatar: '/api/placeholder/40/40' },
  { name: 'Shrezram', loanBought: 1894, loanPaid: '+15%', email: 'email@fakeemailddomain.net', avatar: '/api/placeholder/40/40' },
  { name: 'Lakshmipriya', loanBought: 495, loanPaid: '-12%', email: 'email@fakeemailddomain.net', avatar: '/api/placeholder/40/40' },
];

// Top users to display in the users widget
const topUsers = userDetails.slice(0, 5);

function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white mx-auto max-w-7xl shadow-sm rounded-lg p-6">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <div className="flex items-center">
          <div className="flex items-center">
                     <Link href="/Dashboard" className="text-2xl  font-bold flex items-center">
                      
                      <img src={logo} alt="Logo" className="mx-auto h-20 mb-2 logo1" />
                       <span className="text-gray-600">  QUICK FUNDS</span>
                     </Link>
                   </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <nav className="hidden md:flex space-x-6">
              <Link to="/Dashboard" className="text-gray-600 hover:text-gray-800">Dashboard</Link>
              <Link to="/LoanCalculator" className="text-gray-600 hover:text-gray-800">Loan Calculator</Link>
              <Link to="/Status" className="text-gray-600 hover:text-gray-800">Status</Link>
           
            </nav>
            
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-100">
              <span className="text-purple-600 text-sm">👤</span>
            </div>
          </div>
        </header>
        
        {/* Search Bar */}
        <div className="relative mb-8">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="w-5 h-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Search..."
          />
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Client Card */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h2 className="text-sm font-medium text-gray-500 mb-1">Client</h2>
            <div className="text-3xl font-bold mb-2">101</div>
            <p className="text-xs text-green-600">+20% month over month</p>
          </div>
          
          {/* Loan Distributed Card */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h2 className="text-sm font-medium text-gray-500 mb-1">Loan Distributed</h2>
            <div className="text-3xl font-bold mb-2">1000000</div>
            <p className="text-xs text-green-600">+24% month over month</p>
          </div>
          
          {/* Loan Collected Card */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h2 className="text-sm font-medium text-gray-500 mb-1">Loan Collected</h2>
            <div className="text-3xl font-bold mb-2">600000</div>
            <p className="text-xs text-green-600">+8% month over month</p>
          </div>
        </div>
        
        {/* Charts Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Line Chart */}
          <div className="bg-white p-6 rounded-lg border border-gray-200 col-span-2">
            <h2 className="text-sm font-medium text-gray-700 mb-4">Title</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={lineChartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tickFormatter={(value) => `$${value/1000}k`}
                    domain={['dataMin - 5000', 'dataMax + 5000']}
                  />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#000000" 
                    strokeWidth={2} 
                    dot={{ r: 0 }} 
                    activeDot={{ r: 6, strokeWidth: 0, fill: "#000" }} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          {/* Users Card */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h2 className="text-sm font-medium text-gray-700 mb-4">User</h2>
            <div className="space-y-4">
              {topUsers.map((user, index) => (
                <div key={index} className="flex items-center">
                  <img 
                    src={user.avatar} 
                    alt={user.name} 
                    className="w-10 h-10 rounded-full mr-3" 
                  />
                  <div>
                    <p className="text-sm font-medium text-gray-800">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* User Details Table */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Table */}
          <div className="bg-white p-6 rounded-lg border border-gray-200 col-span-2">
            <h2 className="text-sm font-medium text-gray-700 mb-4">User Details</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Loan Bought</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Loan Paid</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {userDetails.map((user, index) => (
                    <tr key={index}>
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-800">{user.name}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800 text-right">{user.loanBought}</td>
                      <td className={`px-4 py-3 whitespace-nowrap text-sm text-right ${user.loanPaid.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                        {user.loanPaid}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          {/* Bar Chart */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h2 className="text-sm font-medium text-gray-700 mb-4">Title</h2>
            <div className="h-64">
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
                  <Tooltip />
                  <Bar dataKey="value" fill="#000000" />
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