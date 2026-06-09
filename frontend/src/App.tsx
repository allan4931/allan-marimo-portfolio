import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Cursor from './components/Cursor'
import Navbar from './components/Navbar'
import ParticleCanvas from './components/ParticleCanvas'
import Home from './pages/Home'
import Skills from './pages/Skills'
import Contact from './pages/Contact'
import Footer from './components/Footer'

export default function App() {
  return (
    <BrowserRouter>
      <Cursor />
      <ParticleCanvas />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  )
}
