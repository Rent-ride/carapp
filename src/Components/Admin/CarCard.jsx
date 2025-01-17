import React, { useState } from "react";
import Image from "next/image";
import { useFirebase } from "@/Firebase/FirebaseContext";
import toast from "react-hot-toast";
import Modal from "@/Components/Admin/Modal"


function CarCard(props) {
  const firebase = useFirebase();
  const [edit,setEdit]=useState(false)
  const [loading,setLoading]=useState(false)

  const handleDelete=async(id,url)=>{
      setLoading(true)
      await firebase.deleteCar(id,url)
      setLoading(false)
      window.location.reload()
  }
  const name=process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
  
  return (
    <main className="border-2 lg:border-3 border-gray-600 my-4 flex p-3 w-[95%] lg:w-[85%] mx-auto">
      <div className="w-[250px] md:w-[300px] h-[250px]  relative">
        <Image
          src={`https://res.cloudinary.com/${name}/image/upload/${props.data.imageURL}`}
          alt="Photo"
          fill
        />
      </div>
      <div className="mx-2 w-full">
        <h2 className="text-2xl font-semibold capitalize">{props.data.carName}</h2>
        <h2 className="my-1">Khushab | Jauharabad</h2>
        <div className="flex my-3  items-center justify-between">
          <div className="flex gap-3 flex-wrap">
            <p>
              <span className="font-medium capitalize">Manufacturer:</span>{" "}
              {props.data.brand}
            </p>
            <p>
              <span className="font-medium">Model :</span> {props.data.model}
            </p>
            <p className="capitalize">
              <span className="font-medium ">Color :</span> {props.data.color}
            </p>
            <p>
              <span className="font-medium">Transmission :</span>{" "}
              {props.data.transmission}
            </p>
            <p>
              <span className="font-medium">Engine Type :</span>{" "}
              {props.data.type}
            </p>
          </div>
        </div>
        <div>
          <p><span className="font-medium">Price per Day :</span> Rs.{props.data.price}</p>
          <p><span className="font-medium">Pice per km :</span> Rs.{props.data.farePerKm}</p>
        </div>
        <div className="flex gap-4 my-8">
            <button
              className="bg-red-600 px-4 py-2 rounded-lg hover:opacity-90 text-white"
              onClick={()=>handleDelete(props.data.id,props.data.imageURL)}
            >
              {loading ? <p className="spinner"></p> : "Delete"}
            </button>
            <button className="bg-green-600 px-4 py-2 rounded-lg hover:opacity-90 text-white" onClick={()=>setEdit(true)}>
              Edit
            </button>
        
          </div>
      </div>
      {
        edit && <Modal edit={setEdit} cardata={props.data}/>
      }
    </main>
  );
}

export default CarCard;
