"use client"
import React,{useEffect} from 'react'
import Card from '@/Components/Cards/Card'
import Link from 'next/link';
import Aos from 'aos'
import "aos/dist/aos.css"

function CardSection() {
  useEffect(()=>{
      Aos.init({
        once : false
      })
    },[])
  return (
    <section className='w-[80%] mx-auto my-14 lg:h-[70vh]'data-aos="fade-up" data-aos-duration="700">
      <header className="text-center my-20">
        <h1 className="text-5xl font-semibold text-gray-800 my-4 tracking-wide">Our Services</h1>
        <p className="text-xl text-gray-600">
          Explore our range of services designed to make your driving experience better.
        </p>
      </header>
      <div className='flex flex-col gap-10 md:grid md:grid-cols-3 md:gap-3 h-[50%] '>
        <Link href={"/car"}><Card  title={"Rent Cars"} description={"Choose from a wide selection of cars available for rent, whether it's a compact car for a weekend getaway or a luxury car for a special occasion."}/></Link>
        <Link href={"/school"}><Card  title={"Driving Instructors"} color={"#fd8d14"} description={"Our professional and friendly driving instructors are here to help you gain confidence on the road, whether you're a beginner or looking to refine your skills."}/></Link>
        <Link href={"/contact"}><Card  title={"Car Wash"} description={"Keep your car spotless with our car wash services, offering everything from exterior cleaning to complete detailing."}/></Link>
      </div>
      
    </section>
  )
}

export default CardSection
