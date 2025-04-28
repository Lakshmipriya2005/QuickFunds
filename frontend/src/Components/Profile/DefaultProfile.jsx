import React, { useEffect, useState } from 'react';
import { User, MapPin, Phone, Mail, Edit2, Loader } from 'lucide-react';

const DefaultProfile = () => {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    address: '',
    city: '',
    state: '',
    profileImage: '',
  });

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');
      console.log(userId);

      try {
        console.log("Hello welcome");
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
          setMessage('Profile retrieved successfully!');
          setError('');
          // Set profile data from API response
          // Assuming the API returns user profile information
          setProfileData({
            name: data.name || 'John Doe',
            email: data.email || 'johndoe@example.com',
            phoneNumber: data.phoneNumber || '+1 (555) 123-4567',
            address: data.address || '123 Main Street',
            city: data.city || 'New York',
            state: data.state || 'NY',
            profileImage: data.profileImage || '/api/placeholder/150/150',
          });
        }
      } catch (error) {
        setError('Error retrieving profile. Please try again.');
        setMessage('');
        // Set default data in case of error
        setProfileData({
          name: 'User',
          email: 'user@example.com',
          phoneNumber: 'Not available',
          address: 'Not available',
          city: 'Not available',
          state: 'Not available',
          profileImage: '/api/placeholder/150/150',
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchProfile();
  }, []);

  const handleEditProfile = () => {
    // Navigate to edit profile page or open edit modal
    console.log("Edit profile clicked");
    // You could add navigation here: navigate('/edit-profile');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <Loader className="w-10 h-10 text-blue-600 animate-spin" />
        <span className="ml-2 text-lg font-medium text-gray-700">Loading profile...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        {/* Header with background */}
        <div className="h-32 bg-gradient-to-r from-blue-500 to-blue-700"></div>
        
        <div className="relative px-6 py-10 sm:px-10">
          {/* Profile image */}
          <div className="absolute -top-16 left-10">
            <div className="relative">
              <img 
                src={profileData.profileImage} 
                alt="Profile" 
                className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover bg-white"
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
              <button 
                onClick={handleEditProfile}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-sm"
              >
                <Edit2 className="w-4 h-4 mr-2" />
                Edit Profile
              </button>
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
                  <p className="text-gray-800">{profileData.phoneNumber}</p>
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
                  <p className="text-gray-800">{profileData.address}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">City</p>
                  <p className="text-gray-800">{profileData.city}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">State</p>
                  <p className="text-gray-800">{profileData.state}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DefaultProfile;