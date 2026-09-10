import { Header } from './components/layout/Header'
import { Footer } from './components/layout/Footer'
import { MobileBar } from './components/layout/MobileBar'
import { Hero } from './components/sections/Hero'
import { Capabilities } from './components/sections/Capabilities'
import { Services } from './components/sections/Services'
import { Projects } from './components/sections/Projects'
import { Process } from './components/sections/Process'
import { WhyUs } from './components/sections/WhyUs'
import { CtaBand } from './components/sections/CtaBand'
import { Faq } from './components/sections/Faq'
import { Contact } from './components/sections/Contact'

export default function App() {
  return (
    <>
      <a className="skip-link" href="#tresc">
        Przejdź do treści
      </a>
      <Header />
      <main id="tresc">
        <Hero />
        <Capabilities />
        <Services />
        <Projects />
        <Process />
        <WhyUs />
        <CtaBand />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <MobileBar />
    </>
  )
}
