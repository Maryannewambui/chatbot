import React from 'react'
import banner1 from '../assets/banner1.jpg'

const Hero = () => {
  return (
    <div className='pt-8'>
    <h1 className='text-6xl my-4 font-bold text-center'>AFFORDABLE LIVING</h1>
    
    <div style={{backgroundImage: `url(${banner1})`}} className=' bg-cover relative overflow-hidden my-4 rounded-xl mx-16 h-[60vh]'>
      <div className='absolute top-0 right-0 w-full h-full bg-black bg-opacity-30'></div>
    </div>

    <div className='w-1/3 mx-auto my-8'>
      <h2 className='text-center font-medium italic text-lg'>"Be able to reach your student goals by staying in affordable rooms next to other students and closer to school"</h2>
    </div>

  </div>  )
}

export default Hero