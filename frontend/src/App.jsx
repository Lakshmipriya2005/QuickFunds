import { useState } from 'react'
import Auth from './Components/LoginPage/AuthPages'
import "../src/Components/LoginPage/Style.css"
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Auth/>
    </>
  )
}

export default App
