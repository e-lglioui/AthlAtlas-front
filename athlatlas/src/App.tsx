import { useState } from 'react'
import './App.css'
import { LoginForm } from '@/features/auth/components/LoginForm';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
function App(): JSX.Element {


  return (
    <Router>
    <Routes>
      <Route path="/login" element={<LoginForm />} />
     
    </Routes>
  </Router>
  )
}

export default App
