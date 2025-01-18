import React,{useEffect} from 'react'
import Image from 'next/image'
import Aos from 'aos'
import "aos/dist/aos.css"


function Card({title,color,description}) {
  useEffect(()=>{
        Aos.init({
          once : false
        })
      },[])
  
  return (
    <div className='border-2  flex flex-col items-center rounded-lg cursor-pointer hover:scale-[1.03] transition ease-in duration-150 h-full' data-aos="fade-up" data-aos-duration="700">
        <div className={`${color ? "bg-[#fd8d14]" : "bg-[#0d274e]"} text-white inline-block p-3 rounded-[50%] absolute translate-y-[-50%] shadow-lg`}><Image src={"/logo.png"} alt='photo' width={50} height={50}/></div>
        <div className='bg-[#f2f4f9] w-full p-10 md:p-12'></div>        
        <div className='flex justify-center items-center flex-col mt-5'>
          <h1 className='font-semibold text-2xl xl:text-3xl p-2 text-gray-800 text-center'>{title}</h1>
          <p className='text-lg text-gray-600 mb-6 p-4 text-center'>{description}</p>
        </div>
    </div>
  )
}

export default Card
