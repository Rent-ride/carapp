"use client"
import CustomInput from "@/Components/FormFields/CustomInput";
import { useFirebase } from "@/Firebase/FirebaseContext";
import React, { useState,useEffect } from "react";
import toast from "react-hot-toast";

const addInstructor = ({previousData}) => {

  
  useEffect(()=>{
    document.title="Add-Instructor | Rent-Ride"
  },[])
    const [isLoading,setIsLoading]=useState(false)
    const [errors,setErrors]=useState({})
    const firebase=useFirebase()
    const [driverData, setDriverData] = useState({
      name: previousData ? previousData.name :  "",
      experience:previousData ? previousData.experience : "",
      gender:previousData ? previousData.gender :  "",
      age :previousData ? previousData.age : "",
      duration :previousData ? previousData.duration : "",
      amount :previousData ? previousData.amount : "",
      profilePic : ""
  });

  const handleChange = (key, value) => {
    setDriverData({ ...driverData, [key]: value });
   
  };

  const handleProfilePicUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setDriverData({ ...driverData, profilePic: e.target.result });
      reader.readAsDataURL(file);
    }
  };

  const handleCreateDriver = async(e) => {
    e.preventDefault()
   setIsLoading(true)
   let allerrors={}
   if(!driverData.name) allerrors.name="Enter Name"
   if(!driverData.experience) allerrors.experience="Enter Experience"
   if(!driverData.gender) allerrors.gender="Enter Gender"
   if(!driverData.duration) allerrors.duration="Enter Duration"
   if(!driverData.age) allerrors.age="Enter Age"
   if(!driverData.amount) allerrors.amount="Enter Package(in PKR)"

   if (Object.keys(allerrors).length > 0) {
    setErrors(allerrors);
    setIsLoading(false)
    return;
   }
   else{
    
    setErrors({})
    await firebase.addInstructor(driverData)
    toast.success("Instructor Added Sucessfully")
    setIsLoading(false)
    setDriverData({
      name: "",
      experience: "",
      gender: "",
      age : "",
      duration : "",
      amount : "",
      profilePic : ""
    })   
   }
   
  }

  const handleUpdate=async (e)=>{
    e.preventDefault();
    setIsLoading(true)
    await firebase.updateInstructor(previousData.id,driverData)
    setIsLoading(false)
    window.location.replace("/allinstructors")
  }

  return (
      <div className="">
        <div>
          <div className="relative ">
            <h1 className="text-black font-semibold md:text-4xl text-3xl ml-3 mr-2 uppercase tracking-wider">
              Add Instructor Details
            </h1>
            <div className="absolute -bottom-3 left-0 w-1 h-14 bg-[#FD8D14] rounded-full"></div>
          </div>
        </div>
        <div>
          <div className="flex flex-col items-center gap-4 mt-12 md:mt-0">
            <div className="lg:w-[50%] xl:w-[20%] h-[50%]  flex items-center flex-col ">
              {driverData.profilePic || previousData ? (
                <img
                  src={ driverData.profilePic ? driverData.profilePic  :  `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/${previousData.imageURL}`}
                  alt="Profile Picture"
                  className="object-cover w-60 h-60  rounded-full"
                />
              ) : (
                <img
                  src="https://placehold.co/400"
                  alt="Profile Picture Placeholder"
                  className="object-cover w-60 h-60  rounded-full"
                />
              )}
              <div className=" mt-4 flex items-center justify-center">
                <label
                  htmlFor="profilePicUpload"
                  className="cursor-pointer text-white bg-[#FD8D14]  px-4 py-2 rounded-lg"
                >
                  Upload Profile Picture
                </label>                
                
                <input
                  type="file"
                  id="profilePicUpload"
                  onChange={handleProfilePicUpload}
                  className="hidden"
                />
              </div>
              {errors.profilePic ? <p className="text-red-500">{errors.profilePic}</p> : null}
            </div>
          </div>
          <div className="w-[95%] mx-auto mt-8">
            <div className="flex md:flex-row flex-col gap-3 mt-8 ">
              <div className="flex-1">
                <CustomInput placeholder={"Driver Name "} onChange={(e) => handleChange("name", e.target.value)} value={driverData.name}/>
                {errors.name ? <p className="text-red-500">{errors.name}</p> : null}
              </div>
              <div className="flex-1">
                <CustomInput placeholder={"Driver Experience in Years"} type="number" onChange={(e) => handleChange("experience",(e.target.value))} value={driverData.experience}/>
                {errors.experience ? <p className="text-red-500">{errors.experience}</p> : null}
              </div>
              <div className="flex-1">
                <CustomInput placeholder={"Driver DOB "} type="date" onChange={(e) => handleChange("age", (e.target.value))} value={driverData.age}/>
                {errors.age ? <p className="text-red-500">{errors.age}</p> : null}
              </div>
            </div>
            
            {/* _____________Safe Driving and Navigation Skill_________________ */}
            <div className="flex md:flex-row flex-col gap-3 my-3 ">
              <div className="flex-1">
                <CustomInput placeholder={"Driver Gender"} type="text" onChange={(e) => handleChange("gender", (e.target.value))} value={driverData.gender}/>
                {errors.gender ? <p className="text-red-500">{errors.gender}</p> : null}
              </div>
              <div className="flex-1">
                <CustomInput placeholder={"Course Duration"} type="number" onChange={(e) => handleChange("duration",(e.target.value))} value={driverData.duration}/>
                {errors.duration ? <p className="text-red-500">{errors.duration}</p> : null}
              </div>
              <div className="flex-1">
                <CustomInput placeholder={"Package in Rupees"} type="number" onChange={(e) => handleChange("amount",(e.target.value))} value={driverData.amount} />
                {errors.amount ? <p className="text-red-500">{errors.amount}</p> : null}  
              </div>
            </div>
            <div className="flex items-center justify-center mt-8">
              <button
                onClick={previousData ? handleUpdate : handleCreateDriver}
                className="uppercase py-2.5 flex items-center gap-2 justify-center tracking-wider rounded-lg text-white text-base 
        bg-[#FD8D14] hover:bg-[#0D274E] transform transition-all duration-300 w-full md:w-1/2"
             disabled={isLoading}
              >
                {isLoading ? <div className="spinner mx-auto"></div> : previousData ? "Update" : "Add Instructor" }
              </button>
            </div>
          </div>
        </div>
      </div>
  );
};

export default addInstructor;

