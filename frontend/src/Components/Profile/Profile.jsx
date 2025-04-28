import React, { useState } from 'react';
import axios from 'axios';

const ProfileForm = () => {
  const [profileImg, setProfileImg] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Handle profile image change
  const handleImageChange = (event) => {
    setProfileImg(event.target.files[0]); // Store the image file
  };

  // Handle name input change
  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('profileImg', profileImg);  // Append profile image
    formData.append('name', name);  // Append name

    try {
      const response = await axios.post('http://localhost:8080/profile/createOrUpdate', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`,  // Assuming the token is stored in localStorage
        },
      });

      if (response.status === 200) {
        setMessage('Profile updated successfully!');
        setError('');
      }
    } catch (error) {
      setError('Error updating profile. Please try again.');
      setMessage('');
    }
  };

  return (
    <div>
      <h2>Update Profile</h2>
      {message && <div style={{ color: 'green' }}>{message}</div>}
      {error && <div style={{ color: 'red' }}>{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={handleNameChange}
            required
          />
        </div>
        <div>
          <label>Profile Image:</label>
          <input
            type="file"
            onChange={handleImageChange}
            required
          />
        </div>
        <button type="submit">Save Profile</button>
      </form>
    </div>
  );
};

export default ProfileForm;
