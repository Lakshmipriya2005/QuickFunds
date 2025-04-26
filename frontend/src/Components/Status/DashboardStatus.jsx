import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, Check, X, AlertCircle, Filter } from 'lucide-react';
import { LogOut, User } from 'lucide-react';
import {Link} from 'react-router-dom'
import logo from '../../assets/logo.jpg'
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
        //console.log('Status data fetched:', response.data);
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
  
      setStatusData(prevData =>
        prevData.map(item =>
          item.id === id ? { ...item, status: 'Approved' } : item
        )
      );
     
  
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
      setStatusData(prevData =>
        prevData.map(item =>
          item.id === id ? { ...item, status: 'Rejected' } : item
        )
      );
   
  
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
  

  // Should actions be disabled for this status
  const isActionDisabled = (status) => {
    return ['approved', 'rejected'].includes(status.toLowerCase());
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 bg-gray-50 min-h-screen">
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
              <Link to="/Dashboard" className="text-gray-600 font-medium hover:text-blue-600 hover:border-b-2 hover:border-blue-600 pb-1 transition-all duration-200">Dashboard</Link>
              <Link to="/DashboardStatus" className="text-blue-800 font-medium hover:text-blue-600 border-b-2 border-blue-600 pb-1 transition-all duration-200">Status</Link>
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
           
      {/* Notification */}
      {notification && (
        <div className={`fixed top-20 right-4 z-50 p-4 rounded-md shadow-lg flex items-center ${
          notification.type === 'success' ? 'bg-green-100 border-l-4 border-green-500' : 'bg-red-100 border-l-4 border-red-500'
        } transition-all duration-300 transform`}>
          <AlertCircle className={`h-5 w-5 mr-2 ${notification.type === 'success' ? 'text-green-500' : 'text-red-500'}`} />
          <span className="text-sm font-medium">{notification.message}</span>
        </div>
      )}

      <div className="mb-8 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center">
          <div className="w-2 h-8 bg-blue-600 rounded-full mr-3"></div>
          Admin Loan Status Management
        </h1>
        <p className="text-gray-600 pl-5 border-l-2 border-gray-200">
          Review and manage loan applications. Approve or reject pending applications as needed.
        </p>
      </div>

      {/* Status summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        <div 
          className={`p-5 rounded-xl shadow-sm border border-gray-200 cursor-pointer transition-all duration-200 transform hover:scale-105 hover:shadow-md ${statusFilter === 'all' ? 'bg-blue-50 border-blue-400' : 'bg-white'}`}
          onClick={() => setStatusFilter('all')}
        >
          <div className="text-sm text-gray-500 mb-1 font-medium">All Applications</div>
          <div className="text-3xl font-bold text-blue-700">{statusCounts.all}</div>
        </div>
        
        <div 
          className={`p-5 rounded-xl shadow-sm border cursor-pointer transition-all duration-200 transform hover:scale-105 hover:shadow-md ${
            statusFilter === 'approved' ? 'bg-green-50 border-green-400' : 'bg-white border-gray-200'
          }`}
          onClick={() => setStatusFilter('approved')}
        >
          <div className="text-sm text-gray-500 mb-1 font-medium">Approved</div>
          <div className="text-3xl font-bold text-green-600">{statusCounts.approved}</div>
        </div>
        
        <div 
          className={`p-5 rounded-xl shadow-sm border cursor-pointer transition-all duration-200 transform hover:scale-105 hover:shadow-md ${
            statusFilter === 'pending' ? 'bg-yellow-50 border-yellow-400' : 'bg-white border-gray-200'
          }`}
          onClick={() => setStatusFilter('pending')}
        >
          <div className="text-sm text-gray-500 mb-1 font-medium">Pending</div>
          <div className="text-3xl font-bold text-yellow-600">{statusCounts.pending}</div>
        </div>
        
        
        <div 
          className={`p-5 rounded-xl shadow-sm border cursor-pointer transition-all duration-200 transform hover:scale-105 hover:shadow-md ${
            statusFilter === 'rejected' ? 'bg-red-50 border-red-400' : 'bg-white border-gray-200'
          }`}
          onClick={() => setStatusFilter('rejected')}
        >
          <div className="text-sm text-gray-500 mb-1 font-medium">Rejected</div>
          <div className="text-3xl font-bold text-red-600">{statusCounts.rejected}</div>
        </div>
      </div>

      {/* Search and filter controls */}
      <div className="flex flex-col md:flex-row justify-between space-y-4 md:space-y-0 mb-6 bg-white p-5 rounded-xl shadow-sm border border-gray-100">
        {/* Search input */}
        <div className="relative max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search by username or email..."
            className="pl-10 pr-4 py-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
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
              className="appearance-none pl-10 pr-8 py-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
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
        <div className="mb-4 flex items-center bg-white p-3 rounded-lg shadow-sm w-fit">
          <span className="text-sm text-gray-500 mr-2 font-medium">Filtered by:</span>
          <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full border ${getStatusBadgeClasses(statusFilter)}`}>
            {statusFilter.charAt(0).toUpperCase() + statusFilter.slice(1)}
          </span>
          <button 
            className="ml-2 text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
            onClick={() => setStatusFilter('all')}
          >
            Clear filter
          </button>
        </div>
      )}

      {/* Status table */}
      <div className="bg-white shadow-md rounded-xl overflow-hidden border border-gray-100">
        {isLoading ? (
          <div className="p-16 text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-6 text-gray-600 font-medium">Loading status data...</p>
          </div>
        ) : error ? (
          <div className="p-16 text-center">
            <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <AlertCircle className="h-8 w-8 text-red-500" />
            </div>
            <p className="text-red-600 font-medium">{error}</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Username
                  </th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredData.length > 0 ? (
                  filteredData.map((item) => (
                    <tr key={item.id} className="hover:bg-blue-50 transition-colors duration-150">
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
                            className={`inline-flex items-center px-3 py-2 border border-transparent rounded-md text-xs font-medium transition-colors duration-200 ${
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
                            className={`inline-flex items-center px-3 py-2 border border-transparent rounded-md text-xs font-medium transition-colors duration-200 ${
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
                    <td colSpan="4" className="px-6 py-16 text-center text-gray-500">
                      {searchTerm ? (
                        <div className="flex flex-col items-center">
                          <Search className="h-12 w-12 text-gray-300 mb-4" />
                          <div className="text-lg font-medium mb-1">No results found for "{searchTerm}"</div>
                          <div className="text-sm">Try a different search term.</div>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center">
                          <AlertCircle className="h-12 w-12 text-gray-300 mb-4" />
                          <div className="text-lg font-medium">No {statusFilter !== 'all' ? statusFilter : ''} applications found.</div>
                        </div>
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