"use client"
import React, { useState } from "react";
import Image from "next/image";
import { useFirebase } from "@/Firebase/FirebaseContext";
import toast from "react-hot-toast";
import {useRouter} from "next/navigation";
import Modal from "@/Components/Admin/Modal"


function InstructorCard(props) {
  const firebase = useFirebase();
  const router = useRouter()
  const [editInstructor,setEditInstructor]=useState(false)
  const [loading,setLoading]=useState(false)
  const handleDelete=async(id,url)=>{
      setLoading(true)
      await firebase.deleteInstructor(id,url)      
      setLoading(false)
      window.location.reload()
  }

  
  const name=process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
  const age=new Date().getFullYear() - new Date(props.data.age).getFullYear()  
 
  
  return (
    <main className="border-2 lg:border-3 border-gray-600 my-8 flex p-3 w-[95%] md:w-[85%] mx-auto ">
      <div className="w-[250px] md:w-[300px] h-[250px] relative">
        <Image
          src={props.data.imageURL ? `https://res.cloudinary.com/${name}/image/upload/${props.data.imageURL}` : "/dp.jpg"}
          alt="Photo"
          fill
        />
      </div>
      <div className="mx-2 w-full">
        <h2 className="text-2xl font-semibold">{props.data.carName}</h2>
        <h2 className="my-1">Khushab | Jauharabad</h2>
        <div className="flex my-3  items-center justify-between">
          <div className="flex gap-3 flex-wrap">
            <p className="capitalize">
              <span className="font-medium capitalize">Name :</span>{" "}
              {props.data.name}
            </p>
            <p>
              <span className="font-medium">Experience :</span> {props.data.experience} Years
            </p>
            <p className="capitalize">
              <span className="font-medium capitalize">Gender :</span> {props.data.gender}
            </p>
            <p>
              <span className="font-medium">Age :</span>{" "} 
                {age} Years
            </p>
            <p>
              <span className="font-medium">Duration :</span>{" "}
              {props.data.duration} Hours
            </p>
          </div>
        </div>
        <div>
          <p><span className="font-medium">Package :</span> Rs.{props.data.amount}</p>
        </div>
        <div className="flex gap-4 mt-10">
            <button
              className="bg-red-600 px-4 py-2 rounded-lg hover:opacity-90 text-white"              
              onClick={()=>handleDelete(props.data.id,props.data.imageURL)}
            >
              {loading ? <p className="spinner"></p> : "Delete"}
            </button>
            <button className="bg-green-600 px-4 py-2 rounded-lg hover:opacity-90 text-white" onClick={()=>setEditInstructor(true)} >
              Edit
            </button>
          </div>
      </div>
      {
        editInstructor && <Modal edit={setEditInstructor} instructordata={props.data}/>
      }
    </main>
  );
}

export default InstructorCard;
