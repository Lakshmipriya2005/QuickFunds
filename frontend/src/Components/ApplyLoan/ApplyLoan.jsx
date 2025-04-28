import { useState } from "react"
import Layout from "../../Layout"
import { useNavigate } from 'react-router-dom';
export default function LoanApplicationForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    address: "",
    city: "",
    state: "",
    loanType: "",
    amount: 0,
    property: "",
  })
  const navigate=useNavigate();
  

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (e) => {
    setFormData((prev) => ({ ...prev, loanType: e.target.value }))
  }

  const handleAmountChange = (e) => {
    const value = Number.parseInt(e.target.value) || 0
    setFormData((prev) => ({ ...prev, amount: value }))
  }

  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      phoneNumber: "",
      address: "",
      city: "",
      state: "",
      loanType: "",
      amount: 0,
      property: "",
    })
  }
 
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const token = localStorage.getItem('token');
      const userId=localStorage.getItem('userId');
      const dataToSend = {
        ...formData,
        userId: userId  // Add userId to the JSON
      };
      const response = await fetch("http://localhost:8080/loan/apply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(dataToSend),
            
        
      })
  
      if (!response.ok) throw new Error("Failed to submit application")
  
      const result = await response.text()
      console.log("Success:", result)
      alert("Your loan application has been received.")
      handleReset()
    } catch (error) {
      console.error("Error:", error)
      navigate("/Login")
      alert("Please Login!")
    }
  }
  
  return (
  <>
  <Layout>
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-gray-50 to-white p-6">
      <div className="w-full max-w-2xl rounded-xl shadow-xl overflow-hidden bg-white">
        <div className="bg-gradient-to-r from-blue-800 to-indigo-900 text-white p-8">
          <h2 className="text-3xl font-bold tracking-tight">Loan Application</h2>
          <p className="text-blue-100 mt-2">Complete the form below to apply for your loan</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="p-8 space-y-8">
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-800 border-b border-gray-200 pb-3">Personal Information</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                  Address
                </label>
                <input
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                    City
                  </label>
                  <input
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                    State
                  </label>
                  <input
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-800 border-b border-gray-200 pb-3">Loan Details</h3>

              <div className="space-y-2">
                <label htmlFor="loanType" className="block text-sm font-medium text-gray-700">
                  Loan Type
                </label>
                <select
                  id="loanType"
                  name="loanType"
                  value={formData.loanType}
                  onChange={handleSelectChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 bg-white"
                  required
                >
                  <option value="" disabled>Select loan type</option>
                  <option value="mortgage">Mortgage</option>
                  <option value="personal">Personal Loan</option>
                  <option value="auto">Auto Loan</option>
                  <option value="business">Business Loan</option>
                  <option value="student">Student Loan</option>
                </select>
              </div>

              <div className="space-y-2">
                <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                  Loan Amount ($)
                </label>
                <input
                  id="amount"
                  name="amount"
                  type="number"
                  min="0"
                  value={formData.amount || ""}
                  onChange={handleAmountChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="property" className="block text-sm font-medium text-gray-700">
                  Property Details
                </label>
                <input
                  id="property"
                  name="property"
                  value={formData.property}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                  required
                />
              </div>
            </div>
          </div>

          <div className="flex justify-between p-8 border-t border-gray-200 bg-gray-50">
            <button
              type="button"
              onClick={handleReset}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 font-medium"
            >
              Reset Form
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-lg hover:from-blue-700 hover:to-indigo-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 font-medium shadow-md"
            >
              Submit Application
            </button>
          </div>
        </form>
      </div>
    </div>
    </Layout>
    </>
  )
}