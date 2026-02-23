import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import LoadingScreen from './components/LoadingScreen'
import CustomCursor from './components/CustomCursor'
import Home from './pages/Home'
import Skills from './pages/Skills'
import Contact from './pages/Contact'

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </AnimatePresence>
  )
}

function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2400)
    return () => clearTimeout(timer)
  }, [])

  return (
    <BrowserRouter>
      <div className="noise">
        <CustomCursor />
        <AnimatePresence>{loading && <LoadingScreen key="loader" />}</AnimatePresence>
        {!loading && (
          <>
            <Navbar />
            <main className="min-h-screen">
              <AnimatedRoutes />
            </main>
            <Footer />
          </>
        )}
      </div>
    </BrowserRouter>
  )
}

export default App
