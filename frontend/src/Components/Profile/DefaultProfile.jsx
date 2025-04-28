import React, { useEffect,useState } from 'react'

const DefaultProfile = () => {
    const [message, setMessage] = useState('');
      const [error, setError] = useState('');
    

    useEffect(()=>{
        const fetchProfile= async()=>{
            const token=localStorage.getItem('token');
            const userId=localStorage.getItem('userId');
            console.log(userId);
            

    try {
        console.log("Hello welcome");
        const response = await fetch(`http://localhost:8080/profile/get/${userId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });
        console.log("Hello welcome");
        const data = await response.json();
         console.log(data)
        //console.log(response.data);
  
        if (response.status === 200) {
          setMessage('Profile updated successfully!');
          setError('');
        }
      } catch (error) {
        setError('Error updating profile. Please try again.');
        setMessage('');
      }
    
    }
    fetchProfile();
}

,[])
  return (
    <div>
      hi {message}
    </div>
  )
}

export default DefaultProfile
