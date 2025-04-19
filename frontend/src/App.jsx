import { useState } from 'react'
import Auth from './Components/LoginPage/AuthPages'
import "../src/Components/LoginPage/Style.css"
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Dashboard from './Components/Dashboard/Dashboard'
import ResetPassword from './Components/LoginPage/ResetPassword'
import './App.css'
import Home from './Components/Home/Home'
import Status from './Components/Status/Status'
import LoanCalculator from './Components/Calculator/LoanCalculator'
import { Contact } from 'lucide-react'
import ApplyLoan from './Components/ApplyLoan/ApplyLoan'
import About from './Components/About/About'


function App() {


  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Auth />} />
      <Route  path="/Home"   element={<Home/>} />
      <Route  path="/Dashboard"   element={<Dashboard/>} />
      <Route  path="/ResetPassword"   element={<ResetPassword/>} />
      <Route path="/" element={<Auth />} />
      <Route  path="/Status"   element={<Status/>} />
      <Route  path="/LoanCalculator"   element={<LoanCalculator/>} />
      <Route  path="/Contact"   element={<Contact/>} />
      <Route  path="/ApplyLoan"   element={<ApplyLoan/>} />
      <Route  path="/About"   element={<About/>} />
    </Routes>
    </BrowserRouter>
     
    </>
  )
}

export default App
