import Navbar from './components/Navbar'
import Hero from './components/Hero'
import VibrantString from './components/VibrantString'
import Vision from './components/Vision'
import Services from './components/Services'
import Crowdfunding from './components/Crowdfunding'
import Footer from './components/Footer'
import { LanguageProvider, useLanguage } from './store/LanguageContext'

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

function App() {
  return (
    <LanguageProvider>
      <Content />
    </LanguageProvider>
  )
}

export default App
