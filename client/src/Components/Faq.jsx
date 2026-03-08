import React from 'react'
import { assets } from '../assets/data'
import Title from './Title'

const Faq = () => {


  const [openIndex, setOpenIndex] = React.useState(null)
  const faqsData = [
    {
      question: 'Lightning-Fast Performance',
      answer: 'Built with speed — minimal load times and optimized rendering.'
    },
    {
      question: 'Fully Customizable Components',
      answer: 'Easily adjust styles, structure, and behavior to match your project needs.'
    },
    {
      question: 'Responsive by Default',
      answer: 'Every component are responsive by default — no extra CSS required.'
    },
    {
      question: 'Tailwind CSS Powered',
      answer: 'Built using Tailwind utility classes — no extra CSS or frameworks required.'
    },
    {
      question: 'Dark Mode Support',
      answer: 'All components come ready with light and dark theme support out of the box.'
    }
  ]
  return (
    <section className='max-padd-container py-16 xl:py-22'>
      {/*container*/}
      <div className='flex flex-col gap-y-12 xl:flex-row'>
        {/*Image-left side*/}
        <div className='flex-1'>
          <div className='relative rounded-3xl overflow-hidden inline-block'>
            <img src={assets.faq} alt="faqImg" className='block w-full' />
            <div className='absolute top-5 left-5 right-5 bg-white p-3 rounded-2xl flex items-center gap-4 z-10'>
              <img src={assets.signature} alt="signImg" width={55} />
              <div>
                <h5>
                  Trusted Real Estate Experts
                </h5>
                <p>
                  Trust, clarity and simplicity are at the core of everything we do to make your property journey easy.
                </p>
              </div>
            </div>
          </div>
        </div>


        {/*faqs- right side*/}
        <div className='flex-1 flex flex-col justify-center'>
          <Title title1={"Homes Made for Living"}
            title2={"simplifying Your Property Search Every Step"}
            para={
              "From finding the right location to finalizing the deal, we ensure your real estate journey is smooth, efficient and fulfilling"
            }
            titleStyles={'mb-10'}
          />
          <div>
            <>
              <style>{`@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap'); * {              font-family: 'Poppins', sans-serif;
} `}</style>
              <div>

                <div className='max-w-xl w-full flex flex-col gap-4 items-start text-left'>
                  {faqsData.map((faq, index) => (
                    <div key={index} className='flex flex-col items-start w-full'>
                      <div className='flex items-center justify-between w-full cursor-pointer bg-secondary/10 border border-slate-900/10 p-2 px-4 rounded-lg' onClick={() => setOpenIndex(openIndex === index ? null : index)}>
                        <h2 className='text-sm'>{faq.question}</h2>
                        <img src={assets.down} alt="" />

                      </div>
                      <p className={`text-sm text-slate-500 px-4 transition-all duration-500 ease-in-out ${openIndex === index ? "opacity-100 max-h-300px translate-y-0 pt-4" : "opacity-0 max-h-0 -translate-y-2"}`} >
                        {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </>

          </div>
        </div>
      </div>
    </section>
  )
}

export default Faq
