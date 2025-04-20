import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, Filter } from 'lucide-react';
import Layout from '../../Layout';

const StatusPage = () => {
  const [statusData, setStatusData] = useState([
    { id: 1, username: 'johndoe', email: 'john.doe@example.com', status: 'Approved' },
    { id: 2, username: 'janedoe', email: 'jane.doe@example.com', status: 'Pending' },
    { id: 3, username: 'mikebrown', email: 'mike.brown@example.com', status: 'Rejected' },
    { id: 4, username: 'sarahlee', email: 'sarah.lee@example.com', status: 'Pending' },
    { id: 5, username: 'davidwilson', email: 'david.wilson@example.com', status: 'Approved' },
    { id: 6, username: 'emmajohnson', email: 'emma.johnson@example.com', status: 'Pending' },
    { id: 7, username: 'alexgarcia', email: 'alex.garcia@example.com', status: 'Approved' },
    { id: 8, username: 'oliviasmith', email: 'olivia.smith@example.com', status: 'Pending' },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Status options for the filter
  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'approved', label: 'Approved' },
    { value: 'pending', label: 'Pending' },
    { value: 'rejected', label: 'Rejected' },
  ];

  /*useEffect(() => {
    // Fetch status data from your backend
    const fetchStatusData = async () => {
      setIsLoading(true);
      try {
        // Replace with your actual API endpoint
        const response = await axios.get('your-api-endpoint/status');
        setStatusData(response.data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch status data. Please try again later.');
        console.error('Error fetching status data:', err);
        
        // Temporary mock data for development
        setStatusData([
          { id: 1, username: 'johndoe', email: 'john.doe@example.com', status: 'Approved' },
          { id: 2, username: 'janedoe', email: 'jane.doe@example.com', status: 'Pending' },
          { id: 3, username: 'mikebrown', email: 'mike.brown@example.com', status: 'Rejected' },
          { id: 4, username: 'sarahlee', email: 'sarah.lee@example.com', status: 'Pending' },
          { id: 5, username: 'davidwilson', email: 'david.wilson@example.com', status: 'Approved' },
          { id: 6, username: 'emmajohnson', email: 'emma.johnson@example.com', status: 'Pending' },
          { id: 7, username: 'alexgarcia', email: 'alex.garcia@example.com', status: 'Approved' },
          { id: 8, username: 'oliviasmith', email: 'olivia.smith@example.com', status: 'Pending' },
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStatusData();
  }, []);*/

  // Get status counts for dashboard metrics
  const getStatusCounts = () => {
    const counts = {
      all: statusData.length,
      approved: 0,
      pending: 0,
      rejected: 0,
    };
    
    statusData.forEach(item => {
      const status = item.status.toLowerCase();
      if (counts[status] !== undefined) {
        counts[status]++;
      }
    });
    
    return counts;
  };
  
  const statusCounts = getStatusCounts();

  // Filter the data based on search term and status filter
  const filteredData = statusData.filter(item => {
    // First apply text search filter
    const matchesSearch = 
      item.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.status.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Then apply status filter
    const matchesStatus = statusFilter === 'all' || item.status.toLowerCase() === statusFilter.toLowerCase();
    
    return matchesSearch && matchesStatus;
  });

  // Get status badge style based on status value
  const getStatusBadgeClasses = (status) => {
    switch (status.toLowerCase()) {
      case 'approved':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'rejected':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <>
    <Layout>
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Loan Application Status</h1>
        <p className="text-gray-600">
          Check the current status of your loan application below.
        </p>
      </div>

      {/* Status summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        <div 
          className={`p-4 rounded-lg shadow-sm border border-gray-200 cursor-pointer ${statusFilter === 'all' ? 'bg-gray-50 border-gray-400' : 'bg-white'}`}
          onClick={() => setStatusFilter('all')}
        >
          <div className="text-sm text-gray-500 mb-1">All Applications</div>
          <div className="text-2xl font-bold">{statusCounts.all}</div>
        </div>
        
        <div 
          className={`p-4 rounded-lg shadow-sm border cursor-pointer ${
            statusFilter === 'approved' ? 'bg-green-50 border-green-400' : 'bg-white border-gray-200'
          }`}
          onClick={() => setStatusFilter('approved')}
        >
          <div className="text-sm text-gray-500 mb-1">Approved</div>
          <div className="text-2xl font-bold text-green-600">{statusCounts.approved}</div>
        </div>
        
        <div 
          className={`p-4 rounded-lg shadow-sm border cursor-pointer ${
            statusFilter === 'pending' ? 'bg-yellow-50 border-yellow-400' : 'bg-white border-gray-200'
          }`}
          onClick={() => setStatusFilter('pending')}
        >
          <div className="text-sm text-gray-500 mb-1">Pending</div>
          <div className="text-2xl font-bold text-yellow-600">{statusCounts.pending}</div>
        </div>
        
        <div 
          className={`p-4 rounded-lg shadow-sm border cursor-pointer ${
            statusFilter === 'rejected' ? 'bg-red-50 border-red-400' : 'bg-white border-gray-200'
          }`}
          onClick={() => setStatusFilter('rejected')}
        >
          <div className="text-sm text-gray-500 mb-1">Rejected</div>
          <div className="text-2xl font-bold text-red-600">{statusCounts.rejected}</div>
        </div>
        
       
      </div>

      {/* Search and filter controls */}
      <div className="flex flex-col md:flex-row justify-between space-y-4 md:space-y-0 mb-6">
        {/* Search input */}
        <div className="relative max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search by username, email or status..."
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        {/* Filter dropdown (for mobile) */}
        <div className="md:hidden">
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="appearance-none pl-10 pr-8 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {statusOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Filter className="h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Active filter indicator */}
      {statusFilter !== 'all' && (
        <div className="mb-4 flex items-center">
          <span className="text-sm text-gray-500 mr-2">Filtered by:</span>
          <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full border ${getStatusBadgeClasses(statusFilter)}`}>
            {statusFilter.charAt(0).toUpperCase() + statusFilter.slice(1)}
          </span>
          <button 
            className="ml-2 text-sm text-gray-500 hover:text-gray-700"
            onClick={() => setStatusFilter('all')}
          >
            Clear filter
          </button>
        </div>
      )}

      {/* Status table */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200">
        {isLoading ? (
          <div className="p-10 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading status data...</p>
          </div>
        ) : error ? (
          <div className="p-10 text-center">
            <p className="text-red-500">{error}</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Username
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredData.length > 0 ? (
                  filteredData.map((item) => (
                    <tr  className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{item.username}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{item.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full border ${getStatusBadgeClasses(item.status)}`}>
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="px-6 py-10 text-center text-gray-500">
                      {searchTerm ? (
                        <div>No results found for "{searchTerm}". Try a different search term.</div>
                      ) : (
                        <div>No {statusFilter !== 'all' ? statusFilter : ''} applications found.</div>
                      )}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
    </Layout></>
  );
};

export default StatusPage;