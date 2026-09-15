import Header from './components/Header'
import Hero from './components/Hero'
import DispatchStrip from './components/DispatchStrip'
import ServicesSection from './components/ServicesSection'
import HowItWorks from './components/HowItWorks'
import ServiceArea from './components/ServiceArea'
import RequestService from './components/RequestService'
import SiteFooter from './components/SiteFooter'
import MobileActionBar from './components/MobileActionBar'
import './App.css'

function App() {
  return (
    <div className="app">
      <a className="skip-link" href="#main">
        Skip to main content
      </a>
      <Header />
      <main id="main">
        <Hero />
        <DispatchStrip />
        <ServicesSection />
        <HowItWorks />
        <ServiceArea />
        <RequestService />
      </main>
      <SiteFooter />
      <MobileActionBar />
    </div>
  )
}

export default App
