import { useState } from 'react'
function RegisterForm({ switchToLogin }) {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    
    const handleSubmit = (e) => {
      e.preventDefault();
      
      // Validation
      if (password !== confirmPassword) {
        setError("Passwords don't match");
        return;
      }
      
      if (password.length < 8) {
        setError("Password must be at least 8 characters");
        return;
      }
      
      // In a real app, you would send this data to your API
      console.log('Registration data:', { fullName, email, username, password });
      
      // Show success and redirect to login
      alert('Registration successful! Please log in.');
      switchToLogin();
    };
    
    return (
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-blue-600">LOAN MASTER</h1>
        </div>
        
        <h2 className="text-xl text-center text-gray-700 mb-6">Create a new account</h2>
        
        {error && (
          <div className="bg-red-100 text-red-600 p-3 rounded-md mb-4 text-sm">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          
          
          <div className="mb-4">
            <label 
              htmlFor="email" 
              className="block text-sm font-medium text-gray-600 mb-2"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="mb-4">
            <label 
              htmlFor="regUsername" 
              className="block text-sm font-medium text-gray-600 mb-2"
            >
              Username
            </label>
            <input
              type="text"
              id="regUsername"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Choose a username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          
          <div className="mb-4">
            <label 
              htmlFor="regPassword" 
              className="block text-sm font-medium text-gray-600 mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="regPassword"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Create a password (min. 8 characters)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength="8"
            />
          </div>
          
          <div className="mb-6">
            <label 
              htmlFor="confirmPassword" 
              className="block text-sm font-medium text-gray-600 mb-2"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Create Account
          </button>
        </form>
        
        <p className="text-center mt-6 text-sm text-gray-600">
          Already have an account? <button onClick={switchToLogin} className="text-blue-600 font-medium hover:underline">Sign in</button>
        </p>
      </div>
    );
  }
  export default RegisterForm