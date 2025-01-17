"use client"
import Image from "next/image";
import React,{useEffect, useState} from "react";
import { useParams } from "next/navigation";
import { useFirebase } from "@/Firebase/FirebaseContext";
import Link from "next/link";

const page = () => {
  const {id}=useParams()
  const {getSingleDoc}=useFirebase()
  const [item,setItem]=useState()
  const [distance,setDistance]=useState("")
  useEffect(()=>{
    getSingleDoc(id).then((val)=>val.data()).then((data)=>setItem(data))
  },[])
   if(item) 
    document.title = item.carName.toUpperCase() + " | " + "Rent-Ride" 
    const name=process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME

  return (
   
    <main>
      <div className="md:h-[80vh] h-[50vh] relative w-full bg-red-600 -z-10">
          <div className="bg-black/50  inset-0 absolute z-10" />
          <Image src={"/car.jpg"} alt="car" fill className="object-cover " />
        </div>
      {
        item ? (<section>        
        <div className="-mt-20 z-30">
          <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Main content - 7 columns on large screens */}
              <div className="lg:col-span-7">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h2 className="text-2xl font-bold mb-4 capitalize">
                    {item.carName}
                  </h2>
                  <div className="relative w-full aspect-[16/9] sm:aspect-[4/3] md:aspect-[16/9] lg:aspect-[4/3] xl:aspect-[16/9]  rounded-lg overflow-hidden">
                    <Image
                      src={`https://res.cloudinary.com/${name}/image/upload/${item.imageURL}`}
                      alt="car"
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      priority
                      className="object-cover object-center rounded-lg"
                    />
                  </div>
                  <div className="mt-4 text-gray-600">
                    <p>
                      Our commitment to excellence is what keeps customers
                      coming back to us. We provide our cars for charter during
                      festivals, events, parties, business meetings, and regular
                      daily commutes.
                    </p>
                  </div>
                </div>
              </div>

              {/* Sidebar - 5 columns on large screens */}
              <div className="lg:col-span-5">
                <div className="bg-white  rounded-t-xl rounded-b-xl shadow-md">
                  <div className="bg-[#0D274E] text-white p-4 rounded-lg ">
                    <h1 className="text-2xl font-semibold tracking-wider uppercase">
                      Vehicle Rates
                    </h1>
                  </div>
                  <div className="flex justify-between p-4">
                    <div className="w-1/2 text-center">
                      <p className="font-semibold">Duration</p>
                    </div>
                    <div className="w-1/2 text-center border-l-2 border-gray-200">
                      <p className="font-semibold">Rent in PKR</p>
                    </div>
                  </div>
                  <div className="flex justify-between p-4">
                    <div className="w-1/2 text-center">
                      <p className="font-semibold">1 Day</p>
                    </div>
                    <div className="w-1/2 text-center border-l-2 border-gray-200">
                      <p className="font-semibold">Rs.{item.price}</p>
                    </div>
                  </div>
                  <div className="flex justify-between p-4">
                    <div className="w-1/2 text-center">
                      <p className="font-semibold">3 Days</p>
                    </div>
                    <div className="w-1/2 text-center border-l-2 border-gray-200">
                      <p className="font-semibold">Rs.{3 * item.price}</p>
                    </div>
                  </div>
                  <div className="flex justify-between p-4">
                    <div className="w-1/2 text-center">
                      <p className="font-semibold">7 Days</p>
                    </div>
                    <div className="w-1/2 text-center border-l-2 border-gray-200">
                      <p className="font-semibold">Rs.{7 * item.price}</p>
                    </div>
                  </div>
                </div>
                {/* ----------------Second section ---------------- */}
                <section className="bg-white  mt-8 rounded-t-xl rounded-b-xl shadow-md">
                  <div className="bg-[#0D274E] text-white p-4 rounded-lg ">
                    <h1 className="text-2xl font-semibold tracking-wider uppercase">
                      Vehicle Details
                    </h1>
                  </div>
                  <div className="flex justify-between p-4">
                    <div className="w-1/2 text-center">
                      <p className="font-semibold">Name</p>
                    </div>
                    <div className="w-1/2 text-center border-l-2 border-gray-200">
                      <p className="font-semibold line-clamp-1 capitalize">{item.carName}</p>
                    </div>
                  </div>
                  <div className="flex justify-between p-4">
                    <div className="w-1/2 text-center">
                      <p className="font-semibold">Color</p>
                    </div>
                    <div className="w-1/2 text-center border-l-2 border-gray-200">
                      <p className="font-semibold capitalize">{item.color}</p>
                    </div>
                  </div>
                  <div className="flex justify-between p-4">
                    <div className="w-1/2 text-center">
                      <p className="font-semibold">Manufacturer</p>
                    </div>
                    <div className="w-1/2 text-center border-l-2 border-gray-200">
                      <p className="font-semibold capitalize">{item.brand}</p>
                    </div>
                  </div>
                  <div className="flex justify-between p-4">
                    <div className="w-1/2 text-center">
                      <p className="font-semibold">Model Year</p>
                    </div>
                    <div className="w-1/2 text-center border-l-2 border-gray-200">
                      <p className="font-semibold">{item.model}</p>
                    </div>
                  </div>
                  <div className="flex justify-between p-4">
                    <div className="w-1/2 text-center">
                      <p className="font-semibold">Transmission</p>
                    </div>
                    <div className="w-1/2 text-center border-l-2 border-gray-200">
                      <p className="font-semibold capitalize">{item.transmission}</p>
                    </div>
                  </div>
                  <div className="">
                    <Link href={"/contact"}>
                    <button className="bg-[#FD8D14] font-semibold tracking-wider rounded-lg text-white hover:bg-[#0D274E] text-lg w-full py-2">
                      BOOK NOW
                    </button>
                    </Link>
                  </div>
                </section>
              </div>
            </div>
            <div className="flex flex-col md:flex-row justify-evenly my-5">
              <p className="text-2xl capitalize font-semibold">Booking is also available with Driver</p>
              <div className="flex flex-col">
                <h2 className="text-2xl font-semibold">Calculate Fare</h2>
                <div className="my-2 flex flex-col">
                  <label>Enter Distance(in Kilometers)</label>
                  <input type="number" placeholder="Distance" className="border-2 border-black px-3 py-2 rounded-md" onChange={(e)=>setDistance(e.target.value)} value={distance}/>
                </div>
                {
                  distance && <p className="font-bold">Rs : <span className="font-normal">{distance * item.farePerKm}</span></p> 
                }
              </div>
            </div>

          </div>
        </div>
      </section>) : <div className="flex justify-center"><h1 className=" my-32 loading"></h1></div>
      }
      
    </main>
  );
};

export default page;

