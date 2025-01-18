"use client"
import React,{useEffect} from "react";
import Image from "next/image";
import "aos/dist/aos.css"
import Aos from 'aos'

const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

function DriverCard({ data }) {
  useEffect(()=>{
      Aos.init({
        once : false
      })
  },[])
  const age = new Date().getFullYear() - new Date(data.age).getFullYear();

  return (
    <div className=" border  border-[#C4C4C4] rounded-xl  hover:shadow-xl transition-all duration-300 hover:border-[#FD8D14]" data-aos="fade-up" data-aos-duration="600">
      <div className="relative h-[425px] rounded-xl  ">
        <Image
          src={
            data.imageURL
              ? `https://res.cloudinary.com/${cloudName}/image/upload/${data.imageURL}`
              : "/dp.jpg"
          }
          fill
          alt="Instructor"
          className="rounded-xl p-1 "
        />
      </div>
      <div className="flex flex-col items-center gap-2">
        <p className="my-2 capitalize">
          <span className="text-2xl font-semibold p-2 capitalize">
            {data.name}
          </span>
          ({data.gender})
        </p>
        <p>
          <span className="font-semibold">Age : </span>
          {age} Years
        </p>
        <p className="my-2">
          <span className=" font-semibold">Experience : </span>
          {data.experience} Years
        </p>
        <div className="flex gap-4">
          <p>
            <span className=" font-semibold">Duration : </span>
            {data.duration} Hours
          </p>
          <p>
            <span className=" font-semibold">Package : </span>Rs.{data.amount}
          </p>
        </div>

        <button className="bg-[#FD8D14] text-white p-2 transition-all  duration-300 uppercase tracking-wider font-semibold my-3 rounded-lg w-[90%] hover:bg-[#0D274E]">
          Contact Now
        </button>
      </div>
    </div>
  );
}

export default DriverCard;
