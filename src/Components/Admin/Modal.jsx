import React,{useEffect}from 'react'
import AddCar from "@/app/(AdminPanel)/addcar/page"
import { IoClose } from "react-icons/io5";
import AddInstructor from '@/app/(AdminPanel)/addinstructor/page';


function Modal({edit,cardata,instructordata}) {
    useEffect(() => {
        document.body.style.overflow = "hidden";
    
        return () => {
          document.body.style.overflow = "auto"; // Re-enable scrolling when modal is closed
        };
      }, []);
  return (
    <div className='fixed inset-0 bg-gray-400 overflow-y-auto z-40'>
      {
        cardata ? <AddCar previousData={cardata}/> : <AddInstructor previousData={instructordata} />
      }
      <p className='absolute top-0 right-0 p-2'>
        <IoClose className='text-2xl cursor-pointer ' onClick={()=>edit(false)}/>
      </p>
       
    </div>
  )
}

export default Modal
