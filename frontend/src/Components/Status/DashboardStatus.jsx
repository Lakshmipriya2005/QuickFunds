import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, Check, X, AlertCircle, Filter } from 'lucide-react';

const AdminStatusPage = () => {
    const [statusData, setStatusData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [actionInProgress, setActionInProgress] = useState(null);
  const [notification, setNotification] = useState(null);
  const [statusFilter, setStatusFilter] = useState('all');
  
  // Status options for the filter
  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'approved', label: 'Approved' },
    { value: 'rejected', label: 'Rejected' },
  ];

  useEffect(() => {
    // Fetch status data from your backend
    const fetchStatusData = async () => {
      setIsLoading(true);
      try {
        // Replace with your actual API endpoint
        const response = await axios.get('http://localhost:8080/loan/status');
        setStatusData(response.data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch status data. Please try again later.');
        console.error('Error fetching status data:', err);
        
        // Temporary mock data for development
      
      } finally {
        setIsLoading(false);
      }
    };

    fetchStatusData();
  }, []);

  // Filter the data based on search term and status filter
  const filteredData = statusData.filter(item => {
    // First apply text search filter
    const matchesSearch = 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.status.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Then apply status filter
    const matchesStatus = statusFilter === 'all' || item.status.toLowerCase() === statusFilter.toLowerCase();
    
    return matchesSearch && matchesStatus;
  });

  // Get status counts for dashboard metrics
  const getStatusCounts = () => {
    const counts = {
      all: statusData.length,
      approved: 0,
      rejected: 0,
      pending: 0,
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

  // Handle application approval
  const handleApprove = async (id) => {
    setActionInProgress(id);
    try {
      await axios.post(`http://localhost:8080/loan/updateStatus/${id}`, {
        status: 'Approved',
      });
  
   
  
      showNotification('Application approved successfully', 'success');
    } catch (err) {
      console.error('Error approving application:', err);
      showNotification('Failed to approve application', 'error');
    } finally {
      setActionInProgress(null);
    }
  };
  
  const handleReject = async (id) => {
    setActionInProgress(id);
    try {
      await axios.post(`http://localhost:8080/loan/updateStatus/${id}`, {
        status: 'Rejected',
      });
  
   
  
      showNotification('Application rejected successfully', 'success');
    } catch (err) {
      console.error('Error rejecting application:', err);
      showNotification('Failed to reject application', 'error');
    } finally {
      setActionInProgress(null);
    }
  };
  
      
      

  // Show notification
  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

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

  // Should actions be disabled for this status
  const isActionDisabled = (status) => {
    return ['approved', 'rejected'].includes(status.toLowerCase());
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Notification */}
      {notification && (
        <div className={`fixed top-20 right-4 z-50 p-4 rounded-md shadow-lg flex items-center ${
          notification.type === 'success' ? 'bg-green-100 border-l-4 border-green-500' : 'bg-red-100 border-l-4 border-red-500'
        }`}>
          <AlertCircle className={`h-5 w-5 mr-2 ${notification.type === 'success' ? 'text-green-500' : 'text-red-500'}`} />
          <span className="text-sm">{notification.message}</span>
        </div>
      )}

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Admin Loan Status Management</h1>
        <p className="text-gray-600">
          Review and manage loan applications. Approve or reject pending applications as needed.
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
            placeholder="Search by username or email..."
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
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredData.length > 0 ? (
                  filteredData.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{item.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{item.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full border ${getStatusBadgeClasses(item.status)}`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleApprove(item.id)}
                            disabled={isActionDisabled(item.status) || actionInProgress === item.id}
                            className={`inline-flex items-center px-3 py-1 border border-transparent rounded-md text-xs font-medium ${
                              isActionDisabled(item.status)
                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                : 'bg-green-100 text-green-700 hover:bg-green-200'
                            }`}
                          >
                            {actionInProgress === item.id ? (
                              <span className="inline-block h-3 w-3 rounded-full border-2 border-t-transparent border-green-500 animate-spin mr-1"></span>
                            ) : (
                              <Check className="h-3 w-3 mr-1" />
                            )}
                            Approve
                          </button>
                          <button
                            onClick={() => handleReject(item.id)}
                            disabled={isActionDisabled(item.status) || actionInProgress === item.id}
                            className={`inline-flex items-center px-3 py-1 border border-transparent rounded-md text-xs font-medium ${
                              isActionDisabled(item.status)
                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                : 'bg-red-100 text-red-700 hover:bg-red-200'
                            }`}
                          >
                            {actionInProgress === item.id ? (
                              <span className="inline-block h-3 w-3 rounded-full border-2 border-t-transparent border-red-500 animate-spin mr-1"></span>
                            ) : (
                              <X className="h-3 w-3 mr-1" />
                            )}
                            Reject
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="px-6 py-10 text-center text-gray-500">
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
  );
};

export default AdminStatusPage;