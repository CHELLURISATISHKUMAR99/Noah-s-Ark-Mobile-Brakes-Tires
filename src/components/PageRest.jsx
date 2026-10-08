import DispatchStrip from './DispatchStrip'
import GoogleReviews from './GoogleReviews'
import HowItWorks from './HowItWorks'
import RequestService from './RequestService'
import ServiceArea from './ServiceArea'
import ServicesSection from './ServicesSection'
import SiteFooter from './SiteFooter'

function PageRest() {
  return (
    <>
      <DispatchStrip />
      <ServicesSection />
      <HowItWorks />
      <ServiceArea />
      <RequestService />
      <GoogleReviews />
      <SiteFooter />
    </>
  )
}

export default PageRest
