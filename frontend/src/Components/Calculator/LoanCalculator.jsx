import { useState, useEffect } from "react"
import Layout from "../../Layout"
export default function LoanCalculator() {
  const [loanAmount, setLoanAmount] = useState(1000000) // 10 lakh rupees default
  const [interestRate, setInterestRate] = useState(8) // 8% is a common rate in India
  const [monthlyInterest, setMonthlyInterest] = useState(0)

  // Calculate monthly interest payment
  useEffect(() => {
    // Monthly interest = (Principal × Annual Interest Rate) / 12
    const monthlyInterestPayment = (loanAmount * (interestRate / 100)) / 12
    setMonthlyInterest(monthlyInterestPayment)
  }, [loanAmount, interestRate])

  const handleLoanAmountChange = (e) => {
    const value = Number.parseFloat(e.target.value) || 0
    setLoanAmount(value)
  }

  const handleInterestRateChange = (e) => {
    const value = Number.parseFloat(e.target.value) || 0
    setInterestRate(value)
  }

  const handleSliderChange = (e) => {
    const value = Number.parseFloat(e.target.value) || 0
    setInterestRate(value)
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <>
      <Layout>
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-gray-50 to-white p-6">
      <div className="w-full max-w-md rounded-xl shadow-xl overflow-hidden bg-white">
        <div className="bg-gradient-to-r from-blue-800 to-indigo-900 text-white p-8">
          <h2 className="text-3xl font-bold tracking-tight">Loan Interest Calculator</h2>
          <p className="text-blue-100 mt-2">Calculate your monthly interest payment easily</p>
        </div>
        
        <div className="p-8 space-y-8">
          <div className="space-y-6">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label htmlFor="loanAmount" className="text-gray-800 font-medium text-lg">
                  Loan Amount
                </label>
                <span className="text-blue-700 font-semibold text-lg">{formatCurrency(loanAmount)}</span>
              </div>
              <input
                id="loanAmount"
                type="number"
                min="0"
                step="10000"
                value={loanAmount}
                onChange={handleLoanAmountChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 bg-gray-50"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>₹0</span>
                <span>₹5,000,000</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label htmlFor="interestRate" className="text-gray-800 font-medium text-lg">
                  Interest Rate (%)
                </label>
                <span className="text-blue-700 font-semibold text-lg">{interestRate.toFixed(2)}%</span>
              </div>
              <div className="flex gap-4 items-center">
                <div className="flex-1">
                  <input
                    type="range"
                    min="0"
                    max="30"
                    step="0.1"
                    value={interestRate}
                    onChange={handleSliderChange}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>0%</span>
                    <span>15%</span>
                    <span>30%</span>
                  </div>
                </div>
                <div className="w-24">
                  <input
                    id="interestRate"
                    type="number"
                    min="0"
                    max="30"
                    step="0.1"
                    value={interestRate}
                    onChange={handleInterestRateChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 bg-gray-50"
                  />
                </div>
              </div>
            </div>

            <div className="mt-10 pt-8 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-gray-800">Monthly Interest Payment</h3>
                <div className="text-3xl font-bold text-blue-700">{formatCurrency(monthlyInterest)}</div>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                This is the amount of interest you will pay each month on your loan.
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-b from-gray-50 to-gray-100 border-t border-gray-200 p-6 rounded-b-xl">
          <div className="w-full text-sm text-gray-600 space-y-2">
            <div className="flex justify-between">
              <span>Annual interest:</span>
              <span className="font-semibold">{formatCurrency(loanAmount * (interestRate / 100))} per year</span>
            </div>
            <div className="flex justify-between">
              <span>Total interest over 1 year:</span>
              <span className="font-semibold">{formatCurrency(monthlyInterest * 12)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    </Layout>
    </>
  )
}