import React, { useEffect, useState, useRef } from 'react';
import { User, MapPin, Phone, Mail, Edit2, Loader, Save, X, Camera, DollarSign, CreditCard } from 'lucide-react';
import Layout from '../../Layout'; 


const DefaultProfile = () => {
  const fileInputRef = useRef(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [isEditMode, setIsEditMode] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    address: '',
    city: '',
    state: '',
    profileImage: '',
  });
  const [editedData, setEditedData] = useState({
    phoneNumber: '',
    address: '',
    city: '',
    state: '',
    profileImage: '',
  });
  const [loans, setLoans] = useState([]);
  const [totalLoanAmount, setTotalLoanAmount] = useState(0);

  useEffect(() => {
    fetchProfile();
    fetchLoans();
  }, []);

  const fetchProfile = async () => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userid');
    console.log(userId);

    try {
      setLoading(true);
      const response = await fetch(`http://localhost:8080/profile/get/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });
     
      const data = await response.json();

      if (response.status === 200) {
        setMessage('');
        setError('');
        // Set profile data from API response
        const userData = {
          name: data.username || 'John Doe',
          email: data.email || 'johndoe@example.com',
          phoneNumber: data.phoneNumber || 'Not Available',
          address: data.address || 'Not Available',
          city: data.city || 'Not Available',
          state: data.state || 'Not Available',
          profileImage: data.profileImage || '/api/placeholder/150/150',
        };
        setProfileData(userData);
        setEditedData({
          phoneNumber: userData.phoneNumber,
          address: userData.address,
          city: userData.city,
          state: userData.state,
          profileImage: userData.profileImage,
        });
      }
    } catch (error) {
      setError('Error retrieving profile. Please try again.');
      setMessage('');
      // Set default data in case of error
      const defaultData = {
        name: 'User',
        email: 'user@example.com',
        phoneNumber: 'Not available',
        address: 'Not available',
        city: 'Not available',
        state: 'Not available',
        profileImage: '/api/placeholder/150/150',
      };
      setProfileData(defaultData);
      setEditedData({
        phoneNumber: defaultData.phoneNumber,
        address: defaultData.address,
        city: defaultData.city,
        state: defaultData.state,
        profileImage: defaultData.profileImage,
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchLoans = async () => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userid');

    try {
      const response = await fetch(`http://localhost:8080/loan/getLoanDetails/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });
      

      if (response.status === 200) {
        const data = await response.json();
        console.log(data);
        setLoans(data);
        console.log(data);
        
        // Calculate total loan amount
        const total = data.reduce((sum, loan) => sum + parseFloat(loan.amount || 0), 0);
        setTotalLoanAmount(total);
      } else {
        console.error("Failed to fetch loan data");
        // Set empty array if error
        setLoans([]);
        setTotalLoanAmount(0);
      }
    } catch (error) {
      console.error("Error fetching loans:", error);
      setLoans([]);
      setTotalLoanAmount(0);
    }
  };

  const handleEditProfile = () => {
    setIsEditMode(true);
    setImagePreview(null);
  };

  const handleCancelEdit = () => {
    // Reset edited data to original profile data
    setEditedData({
      phoneNumber: profileData.phoneNumber,
      address: profileData.address,
      city: profileData.city,
      state: profileData.state,
      profileImage: profileData.profileImage,
    });
    setIsEditMode(false);
    setError('');
    setMessage('');
    setImagePreview(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedData({
      ...editedData,
      [name]: value,
    });
  };

  const handleImageClick = () => {
    if (isEditMode) {
      fileInputRef.current.click();
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Preview the selected image
      const reader = new FileReader();
      reader.onload = (event) => {
        setImagePreview(event.target.result);
      };
      reader.readAsDataURL(file);
      
      // Store file in editedData for upload
      setEditedData({
        ...editedData,
        profileImageFile: file
      });
    }
  };

  const handleSaveProfile = async () => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userid');

    try {
      setLoading(true);

      // First save the profile data
      let response = await fetch(`http://localhost:8080/profile/createOrUpdate/${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          phoneNumber: editedData.phoneNumber,
          address: editedData.address,
          city: editedData.city,
          state: editedData.state,
        }),
      });
      
      // If there's an image to upload, do it in a separate request
      if (editedData.profileImageFile) {
        const formData = new FormData();
        formData.append('profileImage', editedData.profileImageFile);
        
        response = await fetch(`http://localhost:8080/profile/updateImage/${userId}`, {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${token}`,
          },
          body: formData,
        });
      }

      const data = await response.json();

      if (response.status === 200) {
        setMessage('Profile updated successfully!');
        setError('');
        
        // Update profile data with new values including image if provided
        setProfileData({
          ...profileData,
          phoneNumber: editedData.phoneNumber,
          address: editedData.address,
          city: editedData.city,
          state: editedData.state,
          profileImage: data.profileImage || profileData.profileImage, // Use returned image URL or keep current
        });
        
        setIsEditMode(false);
        setImagePreview(null);
      } else {
        setError(data.message || 'Error updating profile');
      }
    } catch (error) {
      console.error("Profile update error:", error);
      setError('Error updating profile. Please try again.');
      setMessage('');
    } finally {
      setLoading(false);
    }
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2
    }).format(amount);
  };
  

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
          <Loader className="w-10 h-10 text-blue-600 animate-spin" />
          <span className="ml-2 text-lg font-medium text-gray-700">Loading profile...</span>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Profile Card */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
            {/* Header with background */}
            <div className="h-32 bg-gradient-to-r from-blue-500 to-blue-700"></div>
            
            <div className="relative px-6 py-10 sm:px-10">
              {/* Profile image */}
              <div className="absolute -top-16 left-10">
                <div className="relative">
                  <div 
                    onClick={handleImageClick}
                    className={`relative w-32 h-32 rounded-full border-4 border-white shadow-lg overflow-hidden ${isEditMode ? 'cursor-pointer' : ''}`}
                  >
                    <img 
                      src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
                      alt="Profile" 
                      className="w-full h-full object-cover bg-white"
                    />
                    {isEditMode && (
                      <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center transition-opacity hover:bg-opacity-60">
                        <Camera className="w-10 h-10 text-white" />
                      </div>
                    )}
                  </div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                  <div className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow-md">
                    <div className="bg-green-500 w-4 h-4 rounded-full"></div>
                  </div>
                </div>
              </div>
              
              {/* Error/Success Messages */}
              {error && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">
                  {error}
                </div>
              )}
              {message && (
                <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md text-sm">
                  {message}
                </div>
              )}
              
              {/* User info */}
              <div className="mt-16 sm:mt-5 sm:ml-32">
                <div className="flex justify-between items-center mb-6">
                  <h1 className="text-2xl font-bold text-gray-800">{profileData.name}</h1>
                  {!isEditMode ? (
                    <button 
                      onClick={handleEditProfile}
                      className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-sm"
                    >
                      <Edit2 className="w-4 h-4 mr-2" />
                      Edit Profile
                    </button>
                  ) : (
                    <div className="flex space-x-2">
                      <button 
                        onClick={handleCancelEdit}
                        className="flex items-center px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all duration-200 shadow-sm"
                      >
                        <X className="w-4 h-4 mr-2" />
                        Cancel
                      </button>
                      <button 
                        onClick={handleSaveProfile}
                        className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-200 shadow-sm"
                      >
                        <Save className="w-4 h-4 mr-2" />
                        Save
                      </button>
                    </div>
                  )}
                </div>
                
                {/* Contact Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100">
                      <Mail className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="text-gray-800">{profileData.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100">
                      <Phone className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      {isEditMode ? (
                        <input
                          type="text"
                          name="phoneNumber"
                          value={editedData.phoneNumber}
                          onChange={handleChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        />
                      ) : (
                        <p className="text-gray-800">{profileData.phoneNumber}</p>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Address Information */}
                <div className="bg-gray-50 p-6 rounded-xl">
                  <div className="flex items-center mb-4">
                    <MapPin className="w-5 h-5 text-blue-600 mr-2" />
                    <h2 className="text-lg font-semibold text-gray-800">Address Information</h2>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Street Address</p>
                      {isEditMode ? (
                        <input
                          type="text"
                          name="address"
                          value={editedData.address}
                          onChange={handleChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        />
                      ) : (
                        <p className="text-gray-800">{profileData.address}</p>
                      )}
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-500">City</p>
                      {isEditMode ? (
                        <input
                          type="text"
                          name="city"
                          value={editedData.city}
                          onChange={handleChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        />
                      ) : (
                        <p className="text-gray-800">{profileData.city}</p>
                      )}
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-500">State</p>
                      {isEditMode ? (
                        <input
                          type="text"
                          name="state"
                          value={editedData.state}
                          onChange={handleChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        />
                      ) : (
                        <p className="text-gray-800">{profileData.state}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Total Loan Summary Card */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
            <div className="bg-gradient-to-r from-green-500 to-green-700 p-4">
              <div className="flex items-center">
                <DollarSign className="w-6 h-6 text-white mr-2" />
                <h2 className="text-lg font-semibold text-white">Total Loan Summary</h2>
              </div>
            </div>
            
            <div className="p-6">
              <div className="flex justify-between items-center">
                <span className="text-gray-700 font-medium">Total Amount Borrowed:</span>
                <span className="text-2xl font-bold text-green-600">{formatCurrency(totalLoanAmount)}</span>
              </div>
            </div>
          </div>
          
          {/* Loan Details Card */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 to-blue-700 p-4">
              <div className="flex items-center">
                <CreditCard className="w-6 h-6 text-white mr-2" />
                <h2 className="text-lg font-semibold text-white">Loan Details</h2>
              </div>
            </div>
            
            <div className="p-6">
              {loans.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Name
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Amount
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {loans
                        .filter(loan => loan.status === "Approved") 
                        .map((loan, index) => (
                          <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {loan.name || 'Personal Loan'}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {formatCurrency(loan.amount || 0)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                ${loan.status === "Approved" ? 'bg-green-100 text-green-800' : 
                                loan.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' : 
                                'bg-red-100 text-red-800'}`}>
                                {loan.status || 'PENDING'}
                              </span>
                            </td>
                          </tr>
                      ))}
                    </tbody>

                  </table>
                </div>
              ) : (
                <div className="text-center py-6 text-gray-500">
                  No loan information available
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DefaultProfile;