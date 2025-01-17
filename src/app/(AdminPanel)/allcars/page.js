"use client"
import CarCard from '@/Components/Admin/CarCard'
import { useFirebase } from '@/Firebase/FirebaseContext'
import Link from 'next/link'
import React,{useState,useEffect} from 'react'

function page() {
    const [data,setData]=useState()
    const {getAllCars}=useFirebase()
    useEffect(()=>{
        document.title="Available Cars | Rent-Ride"
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
    <main>
      <h1 className='font-semibold text-4xl text-center'>Available Cars</h1>
      {
        data ? (
         data.length > 0 ? (data.map((data,i)=>(
            <CarCard key={i} data={data} />
          ))) : <h1 className='text-4xl text-center my-10'>No Cars Available. <Link href={"/addcar"}><span className='text-2xl text-blue-500'>Click here To Add</span></Link></h1>
        )
         : <div className='flex justify-center'><div className='loading my-6'></div></div>
        
      }
    </main>
  )
}




export default page