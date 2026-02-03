
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import WheelPage from './pages/WheelPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import BlogPage from './pages/BlogPage'
import BlogPostPage from './pages/BlogPostPage'
import BabyNameGeneratorWheel from './pages/BabyNameGeneratorWheel'
import CustomWheelOfNames from './pages/CustomWheelOfNames'
import HubPage from './pages/HubPage'
import PrivacyPage from './pages/PrivacyPage'
import TermsPage from './pages/TermsPage'

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
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<BlogPostPage />} />
        <Route path="/hub" element={<HubPage />} />
        <Route path="/wheels" element={<HubPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsPage />} />
      </Routes>
    </Layout>
  )
}

export default App
