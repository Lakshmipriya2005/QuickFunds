import { useState } from 'react'
import Auth from './Components/LoginPage/AuthPages'
import "../src/Components/LoginPage/Style.css"
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Dashboard from './Components/Dashboard/Dashboard'
import ResetPassword from './Components/LoginPage/ResetPassword'


function App() {


  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Auth />} />
      <Route  path="/Dashboard"   element={<Dashboard/>} />
      <Route  path="/ResetPassword"   element={<ResetPassword/>} />
    </Routes>
    
    </BrowserRouter>
     
    </>
  )
}

export default App
