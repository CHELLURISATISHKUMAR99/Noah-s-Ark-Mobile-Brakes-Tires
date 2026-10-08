import { lazy, Suspense } from 'react'
import Analytics from './components/Analytics'
import Header from './components/Header'
import Hero from './components/Hero'
import MobileActionBar from './components/MobileActionBar'
import './App.css'

const PageRest = lazy(() => import('./components/PageRest'))

function App() {
  return (
    <div className="app">
      <Analytics />
      <a className="skip-link" href="#main">
        Skip to main content
      </a>
      <Header />
      <main id="main">
        <Hero />
        <Suspense fallback={null}>
          <PageRest />
        </Suspense>
      </main>
      <MobileActionBar />
    </div>
  )
}

export default App
