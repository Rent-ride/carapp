"use client"
import React,{useEffect,useState} from "react";
import { useFirebase } from "@/Firebase/FirebaseContext";
import Image from "next/image";
import Link from "next/link";
import DriverCard from "@/Components/Drivers/DriverCard";

const page = () => {
   const [data,setData]=useState()
  const {getAllInstructors}=useFirebase()
    useEffect(()=>{
      document.title="Instructors | Rent-Ride"
      getAllInstructors().then((querySnapshot)=> {
       const instructorsArray=[]
       querySnapshot.forEach(doc => {
        const car=doc.data()
        car.id=doc.id
        instructorsArray.push(car)
       });
       setData(instructorsArray)
      }
    )
    },[])
  return (
    <section>
      <div className="xl:h-[80vh]  md:h-[60vh] h-[45vh] relative w-full  z-10 ">
        <div className="bg-black/60  inset-0 absolute z-10 flex flex-col md:gap-4  items-center justify-center">
          <p className="text-white md:tracking-wider lg:text-5xl md:text-4xl text-2xl font-semibold w-[80%] lg:w-[70%] mx-auto text-justify">
            Experienced and certified driving instructor dedicated to helping you gain confidence and skills for safe, responsible driving.
          </p>
        </div>
        <Image src={"/driver.jpg"} alt="car" fill className="object-cover " />
      </div>

      <h1 className="text-center my-14 font-semibold text-5xl tracking-wide text-gray-800">Driving Instructors</h1>
      <div className="w-[95%] md:w-[90%] lg:w[80%] mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8 my-20">
        {data ? ( data.map((instructor, idx) => ( 
          <Link key={idx} href={`/contact`}>
            <DriverCard data={instructor} />
          </Link>
        ))) : <h1 className="loading mx-auto col-span-4"></h1>}
      </div>
    </section>
  );
};

export default page;
