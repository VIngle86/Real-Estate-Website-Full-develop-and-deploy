import React from 'react'
import { dummyProperties } from '../assets/data'
import { useState } from 'react'

const PropertyImages = ({ property }) => {
  const [hoveredIndex, setHoveredIndex] = useState(0);//Initially first image is expanded
  const imageCaptions = [
    {
      heading: "Front View",
      desc: "experience a stunning first impression with elegant curb appeal."
    },
    {
      heading: "Front View",
      desc: "experience a stunning first impression with elegant curb appeal."
    },
    {
      heading: "Front View",
      desc: "experience a stunning first impression with elegant curb appeal."
    },
    {
      heading: "Front View",
      desc: "experience a stunning first impression with elegant curb appeal."
    },
  ];
  return (
    <div className="flex max-sm;gap-1 max-md:gap-3 gap-5 h-[400px] w-full">
      {property.images.map((pImg1, index) => {
        const caption = imageCaptions[index];
        const isHovered = hoveredIndex === index;

        return (
          <div
            key={index}
            className={`relative group transition-all duration-500 h-[400px] overflow-hidden rounded-2xl ${isHovered ? "flex-grow w-full" : "max-sm:w-10 max-md:w-20 w-56"}`}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(0)}>

            <img src={pImg1} alt="property" className='h-full w-full object-cover object-center rounded-2xl' />
            <div className='absolute inset-0 flex flex-col justify-end p-10 text-white bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-2xl'>
              <h3 className='h3'>{caption.heading}</h3>
              <p className='text-white/90'> {caption.desc}</p>
            </div>
          </div>


        )
      }
      )}
    </div>
  )
}

export default PropertyImages

