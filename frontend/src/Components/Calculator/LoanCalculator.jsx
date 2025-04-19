

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
    <div className="flex justify-center items-center min-h-screen bg-white p-4">
      <div className="w-full max-w-md border border-black rounded-lg overflow-hidden shadow-md">
        <div className="bg-black text-white p-6">
          <h2 className="text-2xl font-bold">Loan Interest Calculator</h2>
          <p className="text-gray-300">Calculate your monthly interest payment</p>
        </div>
        
        <div className="p-6 space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <label htmlFor="loanAmount" className="text-black font-medium">
                  Loan Amount
                </label>
                <span className="text-black font-medium">{formatCurrency(loanAmount)}</span>
              </div>
              <input
                id="loanAmount"
                type="number"
                min="0"
                step="10000"
                value={loanAmount}
                onChange={handleLoanAmountChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <label htmlFor="interestRate" className="text-black font-medium">
                  Interest Rate (%)
                </label>
                <span className="text-black font-medium">{interestRate.toFixed(2)}%</span>
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <input
                    type="range"
                    min="0"
                    max="30"
                    step="0.1"
                    value={interestRate}
                    onChange={handleSliderChange}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
                <div className="w-20">
                  <input
                    id="interestRate"
                    type="number"
                    min="0"
                    max="30"
                    step="0.1"
                    value={interestRate}
                    onChange={handleInterestRateChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
                  />
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-black">Monthly Interest Payment</h3>
                <div className="text-2xl font-bold text-black">{formatCurrency(monthlyInterest)}</div>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                This is the amount of interest you will pay each month on your loan.
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-50 border-t border-gray-200 p-6">
          <div className="w-full text-sm text-gray-500">
            <p>Annual interest: {formatCurrency(loanAmount * (interestRate / 100))} per year</p>
            <p className="mt-1">Total interest over 1 year: {formatCurrency(monthlyInterest * 12)}</p>
          </div>
        </div>
      </div>
    </div>
    </Layout>
    </>
  )
}