import React from "react";
import Image from "next/image";
import DriverCard from "./DriverCard";
import Link from "next/link";



const AboutSection = (props) => {
  return (
    <section>
      <div className="xl:h-[80vh]  md:h-[60vh] h-[45vh] relative w-full  z-10 ">
        <div className="bg-black/60  inset-0 absolute z-10 flex flex-col md:gap-4  items-center justify-center">
          <p className="text-white md:tracking-wider lg:text-5xl md:text-4xl text-2xl font-semibold w-[70%] mx-auto break-words">
            Experienced and certified driving instructor dedicated to helping you gain confidence and skills for safe, responsible driving.
          </p>
        </div>
        <Image src={"/driver.jpg"} alt="car" fill className="object-cover " />
      </div>

      <h1 className="text-center my-14 font-bold text-4xl">Driving Instructors</h1>
      <div className="w-[80%] mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8 my-20">
        {props.data.map((instructor, idx) => (
          <Link key={idx} href={`/drivers/${instructor.id}`}>
            <DriverCard data={instructor} />
          </Link>
        ))}
      </div>
    </section>
  );
};

export default AboutSection;
