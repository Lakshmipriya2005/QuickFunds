import { useState } from 'react'
import Auth from './Components/LoginPage/AuthPages'
import "../src/Components/LoginPage/Style.css"
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Dashboard from './Components/Dashboard/Dashboard'
import ResetPassword from './Components/LoginPage/ResetPassword'
import './App.css'
import Home from './Components/Home/Home'
import Status from './Components/Status/Status'
import DashboardStatus from './Components/Status/DashboardStatus'
import LoanCalculator from './Components/Calculator/LoanCalculator'
import ApplyLoan from './Components/ApplyLoan/ApplyLoan'
import About from './Components/About/About'

//import Layout from "./Layout";
function App() {


  return (
    <>
    <BrowserRouter>
    
    <Routes>
      <Route path="/Login" element={<Auth />} />
      <Route  path="/"   element={<Home/>} />
      <Route  path="/Dashboard"   element={<Dashboard/>} />
      <Route  path="/ResetPassword"   element={<ResetPassword/>} />
      <Route path="/" element={<Auth />} />
      <Route  path="/Status"   element={<Status/>} />
      <Route  path="/LoanCalculator"   element={<LoanCalculator/>} />
      <Route  path="/ApplyLoan"   element={<ApplyLoan/>} />
      <Route  path="/About"   element={<About/>} />
      <Route path="/DashboardStatus" element={<DashboardStatus />} />
    </Routes>
    
    </BrowserRouter>
     
    </>
  )
}

export default App
