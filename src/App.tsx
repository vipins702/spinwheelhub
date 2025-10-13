
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import WheelPage from './pages/WheelPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import BabyNameGeneratorWheel from './pages/BabyNameGeneratorWheel'
import CustomWheelOfNames from './pages/CustomWheelOfNames'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/wheel/:category" element={<WheelPage />} />
        <Route path="/wheel-of-names" element={<BabyNameGeneratorWheel />} />
        <Route path="/custom-wheel-of-names" element={<CustomWheelOfNames />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </Layout>
  )
}

export default App
