"use client"
import React,{useEffect,useState} from "react";
import CarsCards from "@/Components/Cards/CarsCards";
import { useFirebase } from '@/Firebase/FirebaseContext'
import Image from "next/image";
import Link from "next/link";


function page() {
  const [data,setData]=useState()
  const {getAllCars}=useFirebase()
  useEffect(()=>{
    document.title="Cars | Rent-Ride"
    getAllCars().then((querySnapshot)=> {
     const carsArray=[]
     querySnapshot.forEach(doc => {
      const car=doc.data()
      car.id=doc.id
      carsArray.push(car)
     });
     setData(carsArray)
    }
  )
  },[])
  
  return (
    <section>
      <div className="md:h-[80vh] h-[50vh] relative w-full bg-red-600 z-10">
        <div className="bg-black/50  inset-0 absolute z-10" />
        <Image src={"/car.jpg"} alt="car" fill className="object-cover " />
      </div>

      <h1 className="text-center my-14 font-semibold text-5xl tracking-wide text-gray-800">Available Cars</h1>

      <div className="w-[95%] md:w-[90%] lg:w[80%] mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8 my-20">
        {data ? (data.map((car, idx) => (
          <Link key={idx} href={`/car/${car.id}`}>
            <CarsCards key={car.title} item={car} />
          </Link>
        ))) : <h1 className="loading mx-auto col-span-4"></h1>}
      </div>
    </section>
  );
}

export default page;
