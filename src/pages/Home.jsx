import Seo from '../components/Seo'
import Hero from '../components/home/Hero'
import TrustBar from '../components/home/TrustBar'
import About from '../components/home/About'
import Services from '../components/home/Services'
import FeaturedProjects from '../components/home/FeaturedProjects'
import WhyChooseUs from '../components/home/WhyChooseUs'
import Testimonials from '../components/home/Testimonials'
import Partners from '../components/home/Partners'
import Faq from '../components/home/Faq'
import FinalCta from '../components/home/FinalCta'

export default function Home() {
  return (
    <>
      <Seo
        title="ZUR Construction — Building Excellence From Design To Completion"
        description="ZUR Construction delivers world-class architectural design, construction, engineering, renovation, and project management solutions."
      />
      <Hero />
      <TrustBar />
      <About />
      <Services />
      <FeaturedProjects />
      <WhyChooseUs />
      <Testimonials />
      <Partners />
      <Faq />
      <FinalCta />
    </>
  )
}

