"use client"
import Image from "next/image";
import React,{useEffect} from "react";
import { FaCarAlt } from "react-icons/fa";
import { MdLocalGasStation } from "react-icons/md";
import "aos/dist/aos.css"
import Aos from 'aos'

const CarsCards = (props) => {
  const cloudName=process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
  useEffect(()=>{
    Aos.init({
      once : false
    })
  },[])
  return (
    <div className="border border-[#C4C4C4] rounded-xl  hover:shadow-xl transition-all duration-300 hover:border-[#FD8D14] shadow-lg" data-aos="fade-up" data-aos-duration="600">
      <div>
        
        <div className="relative h-[400px] rounded-xl">
           <Image
            src={`https://res.cloudinary.com/${cloudName}/image/upload/${props.item.imageURL}`}
            fill
            alt="Cars"
            className="rounded-xl p-1"
          />
        </div>
          
        <div className="p-4">
          <div>
            <h1 className="lg:text-2xl text-xl   text-[#272727] h-16 line-clamp-2 font-bold capitalize">
              {props.item.carName}
            </h1>
          </div>
          <div className="py-2">
            <h1 className="lg:text-2xl text-xl font-bold text-black]">
              Color : 
              <span className="text-gray-500 font-medium text-xl capitalize"> {props.item.color}</span>
            </h1>
          </div>
          <div className="flex items-center gap-10">
            <section className="flex items-center justify-between w-full">

              <article className="flex items-center gap-2 ">
                <span className="lg:text-2xl text-xl">
                  <FaCarAlt color="#0D274E" />
                </span>
                <h1 className="text-gray-500 lg:text-xl text-base font-semibold capitalize">
                  {props.item.transmission}
                </h1>
              </article>

              <span className="h-10 w-[1px] bg-gray-300"></span>

              <article className="flex items-center gap-2 ">
                <span className="lg:text-2xl text-xl">
                  <MdLocalGasStation color="#0D274E" />
                </span>
                <h1 className="text-gray-500 lg:text-xl text-base font-semibold capitalize">
                  {props.item.type}
                </h1>
              </article>
            </section>
          </div>
          <div className="mt-5">
            <button className="transition-all uppercase tracking-wider font-semibold w-full  duration-300 bg-[#FD8D14] hover:text-white hover:bg-[#0D274E] text-white px-5 py-2 rounded-md">
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarsCards;
