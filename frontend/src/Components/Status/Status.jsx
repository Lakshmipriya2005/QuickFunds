import React, { useState, useEffect } from 'react';
import { Search, FileText, AlertCircle } from 'lucide-react';
import Layout from '../../Layout';

const StatusPage = () => {
  const [statusData, setStatusData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  useEffect(() => {
    const fetchStatusData = async () => {
      if (!isLoggedIn) return; // Don't fetch if not logged in

      setIsLoading(true);
      try {
        const token = localStorage.getItem('token');
        const userId=localStorage.getItem('userId');
        const response = await fetch(`http://localhost:8080/loan/status/${userId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error("Failed to fetch");

        const data = await response.json();
        console.log(data);
        setStatusData(data);
        //console.log('Status data fetched:', data);
        setError(null);
      } catch (err) {
        console.error('Error fetching status data:', err);
        setError('Failed to fetch status data. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchStatusData();
  }, [isLoggedIn]); // Add isLoggedIn as dependency here

  const filteredData = statusData.filter(item =>
    item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.status?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadgeClasses = (status) => {
    switch (status?.toLowerCase()) {
      case 'approved':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'rejected':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'under review':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 py-10 bg-gray-50 min-h-screen">
        {/* Title */}
        <div className="mb-8 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center">
            <FileText className="mr-3 h-8 w-8 text-blue-600" />
            Loan Application Status
          </h1>
          <p className="text-gray-600 pl-11 border-l-2 border-blue-100">
            Check the current status of your loan application below.
          </p>
        </div>

        {/* Search Input */}
        <div className="mb-6 bg-white p-5 rounded-xl shadow-sm border border-gray-100">
          <div className="relative max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search by username, email or status..."
              className="pl-10 pr-4 py-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Table */}
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
          ) : isLoggedIn ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredData.length > 0 ? (
                    filteredData.map((item, index) => (
                      <tr key={index} className="hover:bg-blue-50 transition-colors duration-150">
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
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3" className="px-6 py-16 text-center text-gray-500">
                        <div className="flex flex-col items-center">
                          <Search className="h-12 w-12 text-gray-300 mb-4" />
                          <div className="text-lg font-medium mb-1">No results found for "{searchTerm}"</div>
                          <div className="text-sm">Try a different search term.</div>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-16 text-center">
              <div className="mx-auto w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
                <AlertCircle className="h-8 w-8 text-yellow-500" />
              </div>
              <p className="text-yellow-600 font-medium">Please log in to view your loan status.</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default StatusPage;
