"use client"
import InstructorCard from '@/Components/Admin/InstructorCard'
import { useFirebase } from '@/Firebase/FirebaseContext'
import Link from 'next/link'
import React,{useState,useEffect} from 'react'


function Instructors() {
    const [data,setData]=useState()
    
    const {getAllInstructors}=useFirebase()
    useEffect(()=>{
        document.title="Available Instructors | Rent-Ride"
        getAllInstructors().then((querySnapshot)=> {
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
      <h1 className='font-semibold text-4xl text-center'>Available Instructors</h1>
      {
        data ? (
         data.length > 0 ? (data.map((data,i)=>(
            <InstructorCard key={i} data={data} />
          ))) : <h1 className='text-4xl text-center my-10'>No Instructors Available. <Link href={"/addinstructor"}><span className='text-2xl text-blue-500'>Click here To Add</span></Link></h1>
        )
         : <div className='flex justify-center'><div className='loading my-6'></div></div>
        
      }
      
    </main>
  )
}




export default Instructors