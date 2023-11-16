import React from 'react'
import { BrowserRouter as RouterContainer, Routes, Route } from 'react-router-dom'
import SignIn from './Pages/SignIn.jsx'
import SignUp from './Pages/SignUp.jsx'

export default function Router() {
  return (
    <>
      <RouterContainer>
        <Routes>
          {/* <Route path="/" element={} /> */}
          <Route path="/" element={SignIn} />
          <Route path="/about" element={SignUp} />
        </Routes>
      </RouterContainer>
    </>
  )
}

