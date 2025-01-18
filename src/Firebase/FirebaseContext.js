"use client"
import React,{createContext,useContext} from 'react'
import { initializeApp } from "firebase/app";
import {getFirestore,collection,addDoc,getDocs,getDoc,doc,deleteDoc,updateDoc} from "firebase/firestore"
import {getStorage} from "firebase/storage"
import {getAuth, signInWithEmailAndPassword,signOut,sendPasswordResetEmail} from "firebase/auth"
import toast from 'react-hot-toast';

const firebaseConfig = {
    apiKey: "AIzaSyAVCinVK9KERk76J6LujQbFuB1KVgNi6-U",
    authDomain: "car-booking-app-603cc.firebaseapp.com",
    projectId: "car-booking-app-603cc",
    storageBucket: "car-booking-app-603cc.firebasestorage.app",
    messagingSenderId: "134937927468",
    appId: "1:134937927468:web:68e1e79bf7604f6c121689",
    measurementId: "G-BCH5L12D9D"
  };
  const app = initializeApp(firebaseConfig);
  const fireStore=getFirestore(app)
  const storage=getStorage(app)
  const auth=getAuth(app)

  const FirebaseContext=createContext(null)

  export const useFirebase=()=>{
    return useContext(FirebaseContext)
  }

//------->All Handlers 

//------->Manage Admin

 async function manageAdmin({email,password}) {
  try {
    await signInWithEmailAndPassword(auth, email, password)
    window.location.replace("/allcars");
  } catch (error) {
    toast.error(error.message)
  }
}

async function resetPass(email){
  if(!email){
    return toast.error("Please Enter Email")
  }
  try {
    await sendPasswordResetEmail(auth,email)
     toast.success("Reset Link Sent to Your Email")
   
  } catch (error) {
     toast.error("Try Again")
  }
}

//------->Upload Car

async function uploadCar({carName,price,brand,transmission,type,image,model,color,farePerKm}){    
    try {
      const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
      const formdata=new FormData()
      formdata.append("file",image)
      formdata.append("upload_preset",`${cloudName}`)
      formdata.append("cloud_name",`${cloudName}`)
      
      let response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,{
        method : "POST",
        body : formdata,
        upload_preset: `${cloudName}`
      }).then((res)=>res.json()).then((result)=>result.public_id)

    const res= await addDoc(collection(fireStore,"Cars"),{
    carName,
    price,
    brand : brand.label,
    transmission: transmission.label,
    type : type.label,
    imageURL : response,
    model,
    color,
    farePerKm
    }
  
  )
  toast.success("Car Added Sucessfully")
    }
      catch (error) {
        console.log("Error occured :", error);
        return error
    }   
}

//------->Get All Cars

function getAllCars(){
  return  getDocs(collection(fireStore,"Cars"))  
}

//------->Get Single Car

async function getSingleDoc(id){
  const docRef=doc(fireStore,"Cars",id)
  const result =await getDoc(docRef)
  return result
}

//------->Delete Car

async function deleteCar(id,url){ 
  try {
    const docRef=doc(fireStore,"Cars",id)
    const res=await deleteDoc(docRef)
    
     const response = await fetch('/api/routes', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ public_id: url }),
  });

  const result = await response.json();

  return toast.success("Deleted Successfully")
  } catch (error) {
    console.error('Failed to delete', result.error)
  }
    
  }

//------->Update Car

async function updateCar(id,updatedData) {
  try {
      if(updatedData.image){
        const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
      const formdata=new FormData()
      formdata.append("file",updatedData.image)
      formdata.append("upload_preset",`${cloudName}`)
      formdata.append("cloud_name",`${cloudName}`)
      
      let response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,{
        method : "POST",
        body : formdata,
        upload_preset: `${cloudName}`
      }).then((res)=>res.json()).then((result)=>result.public_id)
      updatedData.imageURL = response
      }
    const docRef=doc(fireStore,"Cars",id)
    await updateDoc(docRef,updatedData)
    return toast.success("Data Updated Successfully")
 
  } catch (error) {
    console.log("Error Occured",error)
    alert("Please Try Again") 
  }

}

 /* INSTRUCTOR FUNCTIONS */

 //------->Add instructor

 async function addInstructor({name,experience,gender,age,duration, amount ,profilePic}){
  try {
    let response = null
    if(profilePic){
      const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
    const formdata=new FormData()
    formdata.append("file",profilePic)
    formdata.append("upload_preset",`${cloudName}`)
    formdata.append("cloud_name",`${cloudName}`)
    
       response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,{
      method : "POST",
      body : formdata,
      upload_preset: `${cloudName}`
    }).then((res)=>res.json()).then((result)=>result.public_id)
    }
    
    
   await addDoc(collection(fireStore,"Instructors"),{
    name,
    experience,
    gender,
    age,
    duration,
    profilePic : response ? response : null,
    imageURL : response ? response : null,
    amount,
  }
)
  }
    catch (error) {
      console.log("Error occured :", error);
      return error
  }   
 }
 
 //------->Get All

 function getAllInstructors(){
  return  getDocs(collection(fireStore,"Instructors"))
}

//------->Delete Instructor

async function deleteInstructor(id,url){ 
  try {
    const docRef=doc(fireStore,"Instructors",id)
    const res=await deleteDoc(docRef)
    
     const response = await fetch('/api/routes', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ public_id: url }),
  });

  const result = await response.json();
  
  return toast.success("Instructor Deleted Successfully")
  } catch (error) {
    toast.error("Please Try Again")
  }
}

//------->Update Instructor

async function updateInstructor(id,updatedData){
  try {
    if(updatedData.profilePic){
      const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
    const formdata=new FormData()
    formdata.append("file",updatedData.imageURL)
    formdata.append("upload_preset",`${cloudName}`)
    formdata.append("cloud_name",`${cloudName}`)
    
    let response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,{
      method : "POST",
      body : formdata,
      upload_preset: `${cloudName}`
    }).then((res)=>res.json()).then((result)=>result.public_id)
    updatedData.imageURL = response
    }
  const docRef=doc(fireStore,"Instructors",id)
  await updateDoc(docRef,updatedData)
  return toast.success("Data Updated Successfully")

} catch (error) {
  console.log("Error Occured",error)
  alert("Please Try Again")
}
}



function FirebaseProvider({children}) {
  
  return (
    <FirebaseContext.Provider 
    value={{
        uploadCar,
        getAllCars,
        getSingleDoc,
        deleteCar,
        addInstructor,
        getAllInstructors,
        deleteInstructor,
        updateInstructor,
        updateCar,
        manageAdmin,
        auth,
        signOut,
        resetPass
    }}>
        {children}
    </FirebaseContext.Provider>
  )
}

export default FirebaseProvider