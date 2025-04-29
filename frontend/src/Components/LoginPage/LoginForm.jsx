import { useState } from 'react';
import axios from 'axios';


import logo from '../../assets/logo.jpg'; // Adjust the path as necessary
import { useNavigate } from 'react-router-dom';

function LoginForm({ switchToRegister }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showError, setShowError] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status
  const navigate=useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (username === "admin" && password === "admin") {
      navigate("/Dashboard");
    } else {
      try {
        const response = await axios.post(
          'http://localhost:8080/auth/login',
          {
            username: username,
            password: password
          },
          {
            withCredentials: true
          }
        );
  
        const token = response.data.token;
       // console.log(response.data);
        const userId = response.data.id; // Assuming the user ID is also returned in the response

      if (token) {
        localStorage.setItem('token', token);
        localStorage.setItem('userid', userId); // Store the user ID in local storage
        console.log("Token:", token); // Log the token for debugging
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        navigate("/");
      } else {
        setShowError(true);
      }
      } catch (error) {
        console.error('Login failed:', error);
        setShowError(true);
      }
    }
  };

  const handleForgetPassword=()=>{
    navigate("/ResetPassword")
  }

  return (
    <div className="w-full max-w-md p-10 bg-white rounded-xl shadow-xl border border-gray-100">
      <div className="text-center mb-8">
        <div className="">
          <img src={logo} alt="Logo" className="h-30 w-30 object-cover logo" />
        </div>
        <h1 className="text-2xl font-bold text-gray-800 tracking-wide">QUICK FUNDS</h1>
      </div>

      <h2 className="text-xl text-center text-gray-700 mb-8 font-medium">Sign in to your account</h2>

      {showError && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6 text-sm border-l-4 border-red-500 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          Incorrect username or password. Please try again.
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
            Username
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            </div>
            <input
              type="text"
              id="username"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
            Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
            </div>
            <input
              type="password"
              id="password"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="flex justify-end">
          <p 
            className="text-sm text-blue-600 hover:text-blue-800 cursor-pointer font-medium transition-colors duration-200" 
            onClick={handleForgetPassword}
          >
            Forgot password?
          </p>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="remember"
            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          <label htmlFor="remember" className="ml-2 text-sm text-gray-600">
            Remember me
          </label>
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 shadow-md"
        >
          Sign In
        </button>
      </form>

      <p className="text-center mt-8 text-sm text-gray-600">
        Don't have an account?{' '}
        <button onClick={switchToRegister} className="text-blue-600 font-medium hover:text-blue-800 transition-colors duration-200">
          Register now
        </button>
      </p>
    </div>
  );
}
export default LoginForm;