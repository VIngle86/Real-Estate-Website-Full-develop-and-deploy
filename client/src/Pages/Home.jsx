import React from 'react'
import Hero from '../Components/Hero';
import About from '../Components/About';
import FeaturedProperties from '../Components/FeaturedProperties';
import Faq from '../Components/Faq';
import Cta from '../Components/Cta';
import Testimonials from '../Components/Testimonials';
import Title from '../Components/Title'
import Footer from '../Components/Footer';

const Home = () => {
  return (
    <div className='bg-linear-to-r from-[#fffbee] to-white'>
      <Hero />
      <About />
      <FeaturedProperties />
      <Faq />
      <Cta />
      <Testimonials />
      <Footer />
    </div>
  )
}

export default Home
