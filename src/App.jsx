import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import VibrantString from './components/VibrantString'
import Vision from './components/Vision'
import Services from './components/Services'
import Crowdfunding from './components/Crowdfunding'
import Footer from './components/Footer'
import NotFound from './components/NotFound'
import { LanguageProvider, useLanguage } from './store/LanguageContext'

function HomePage() {
  return (
    <>
      <Navbar />
      <Hero />
      <VibrantString />
      <Services />
      <Vision />
      <Crowdfunding />
      <Footer />
    </>
  )
}

function Content() {
  const { isLoading } = useLanguage()

  return (
    <>
      {isLoading && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          background: 'rgba(255, 255, 242, 0.9)',
          backdropFilter: 'blur(5px)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div className="spinner"></div>
        </div>
      )}

      <Routes>
        <Route index element={<HomePage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

function App() {
  return (
    <LanguageProvider>
      <Content />
    </LanguageProvider>
  )
}

export default App
