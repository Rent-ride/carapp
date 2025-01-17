"use client";
import React, { useEffect,useState } from 'react'
import HeaderNavbar from '@/Components/Admin/Header/HeaderNavbar'
import {useFirebase} from "@/Firebase/FirebaseContext"
import { onAuthStateChanged } from "firebase/auth";

function layout({children}) {

  const firebase=useFirebase();
  const [loading, setLoading] = useState(true);
  useEffect(()=>{ 
    onAuthStateChanged(firebase.auth,(user)=>{
      if(!user){
        window.location.replace("/login")
      }
      else{
        setLoading(false)
      }
    })
  } ,[])

  if (loading) {
    return <div className='flex items-center justify-center h-screen'><div className='loading'></div></div>;
  }

  return (
    <main>
      <nav>
        <HeaderNavbar />
      </nav>
      <div className="max-w-7xl mx-auto  my-10">{children}</div>
    </main>
  )
}

export default layout