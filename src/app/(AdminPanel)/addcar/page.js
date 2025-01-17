"use client";
import CustomInput from "@/Components/FormFields/CustomInput";
import Dropdown from "@/Components/FormFields/Dropdown";
import { useFirebase } from "@/Firebase/FirebaseContext";
import React, { useState,useEffect } from "react";


const options = [
  { value: "suzuki", label: "Suzuki" },
  { value: "changan", label: "Changan" },
  { value: "toyota", label: "Toyota" },
  { value: "honda", label: "Honda" },
  { value: "nissan", label: "Nissan" },
];
const TransmittionType = [
  {
    value: "Automatic",
    label: "Automatic",
  },
  {
    value: "Manual",
    label: "Manual",
  },
];
const Cartype = [
  {
    value: "Petrol",
    label: "Petrol",
  },
  {
    value: "Diesel",
    label: "Diesel",
  },
  {
    value: "Hybrid",
    label: "Hybrid",
  },
];



const index = ({previousData}) => {

  useEffect(()=>{
    document.title="Add-Car | Rent-Ride"
  },[])

  const [carDetails, setCarDetails] = useState({
    carName: previousData ? previousData.carName : "",
    price: previousData ? previousData.price : "",
    brand: previousData ? previousData.brand : "",
    transmission:previousData ? previousData.transmission : "",
    type:previousData ? previousData.type : "",
    image:  "",
    model :previousData ? previousData.model : "",
    color :previousData ? previousData.color :  "",
    farePerKm :previousData ? previousData.farePerKm : ""
  }); // State to store all car details
  

  const [errors,setErrors]=useState({})
  const [isLoading,setIsLoading]=useState(false)
  const firebase=useFirebase();

  const handleChange = (key, value) => {    
      setCarDetails({ ...carDetails, [key]: value }); // Update state with the selected option    
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) =>
        setCarDetails({ ...carDetails, image: e.target.result });
      reader.readAsDataURL(file);
    }
  };
   
  const handleSubmit=async(e)=>{
   e.preventDefault()
   setIsLoading(true)
   let allerrors={}
   if(!carDetails.carName) allerrors.name="Enter Name"
   if(!carDetails.price) allerrors.price="Enter Price"
   if(!carDetails.brand) allerrors.brand="Enter Brand"
   if(!carDetails.transmission) allerrors.transmission="Enter Transmisison"
   if(!carDetails.type) allerrors.type="Enter Engine Type"
   if(!carDetails.image) allerrors.image="Upload Image"
   if(!carDetails.model) allerrors.model="Enter Model Year"
   if(!carDetails.color) allerrors.color="Enter Color"
   if(!carDetails.farePerKm) allerrors.fare="Enter Fare per Kilometer"

   if (Object.keys(allerrors).length > 0) {
    setErrors(allerrors);
    setIsLoading(false)
    return;
   }
   else{
    
    setErrors({})    
      await firebase.uploadCar(carDetails)
    }     
    setIsLoading(false)
    setCarDetails({
    carName: "",
    price: "",
    brand: null,
    transmission: null,
    type: null,
    image: null,
    model : "",
    color : "",
    farePerKm : ""
  })   
}   
  const handleUpdate=async (e)=>{
    e.preventDefault();
    setIsLoading(true)
    await firebase.updateCar(previousData.id,carDetails)
    setIsLoading(false)
    window.location.replace("/allcars")
  }
  return (
      <div>
        <div>
          <div className="relative">
            <h1 className="text-black font-semibold text-3xl md:text-4xl ml-3 uppercase tracking-wider">
              Add Cars Details
            </h1>
            <div className="absolute -bottom-3 left-0 w-1 h-14 bg-[#FD8D14] rounded-full"></div>
          </div>
        </div>
        <div>
          {/* ---------add Cars Input fields------------------- */}

          <div className="grid grid-cols-1 md:grid-cols-2 p-2 gap-8  md:gap-10 xl:gap-12 mt-7  md:mt-14 ">
            <div className="w-full h-full">
              <div className="rounded-xl h-full">
                <div className="relative h-96">
                  {carDetails.image || previousData ? (
                    <img
                      src={carDetails.image ? carDetails.image : `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/${previousData.imageURL }`}
                      alt="Car Image"
                      className="object-cover mx-auto h-full rounded-md"
                    />
                  ) : (
                    <img
                      src={"/placeholder.png"}
                      alt="Car Image"
                      className="object-cover w-full h-full rounded-xl"                      
                    />
                  )}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <label
                      htmlFor="imageUpload"
                      className="cursor-pointer text-white bg-black bg-opacity-50 px-4 py-2 rounded-lg"
                    >
                      Upload Image
                    </label>
                    <input
                      type="file"
                      id="imageUpload"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </div>
                </div>
              </div>
              <p className="text-base text-red-600">{errors.image ? errors.image : null}</p>
            </div>
            <div className="flex flex-col gap-5">
              <div className="w-full">
                <CustomInput
                  placeholder="Enter Car Name "
                  onChange={(e) => handleChange("carName", e.target.value)}
                  value={carDetails.carName}
                />
                <p className="text-base text-red-600">{errors.name ? errors.name : null}</p>
              </div>
              <div className="w-full">
                <CustomInput
                  placeholder="Enter Model"
                  onChange={(e) => handleChange("model", e.target.value)}
                  value={carDetails.model}
                />
                <p className="text-base text-red-600">{errors.model ? errors.model : null}</p>
              </div>
              <div className="w-full">
                <CustomInput
                  placeholder="Enter Color"
                  onChange={(e) => handleChange("color", e.target.value)}
                  value={carDetails.color}
                />
                <p className="text-base text-red-600">{errors.color ? errors.color : null}</p>
              </div>
              <div className="w-full ">
                <CustomInput
                  placeholder="Enter Price"
                  onChange={(e) => handleChange("price", e.target.value)}
                  value={carDetails.price}
                />
                <p className="text-base text-red-600">{errors.price ? errors.price : null}</p>
              </div>
              <div className="w-full ">
                <CustomInput
                  placeholder="Enter Fare per Kilometer"
                  onChange={(e) => handleChange("farePerKm", e.target.value)}
                  value={carDetails.farePerKm}
                />
                <p className="text-base text-red-600">{errors.fare ? errors.fare : null}</p>
              </div>

              <div className="w-full">
                <Dropdown
                  placeholder={"Select Model"}
                  data={options}
                  handleChange={(value) => handleChange("brand", value)}
                  value={carDetails.brand}
                />
                <p className="text-base text-red-600">{errors.brand ? errors.brand : null}</p>
              </div>
              <div className="w-full ">
                <Dropdown
                  placeholder={"Select Transmission"}
                  data={TransmittionType}
                  handleChange={(value) => handleChange("transmission", value)}
                  value={carDetails.transmission}
                  
                />
                <p className="text-base text-red-600">{errors.transmission ? errors.transmission : null}</p>
              </div>

              <div className="w-full">
                <Dropdown
                  placeholder={"Select Engine type"}
                  data={Cartype}
                  handleChange={(value) => handleChange("type", value)}
                  value={carDetails.type}
                />
                <p className="text-base text-red-600">{errors.type ? errors.type : null}</p>
              </div>
              <button className="uppercase py-2.5 tracking-wider rounded-lg text-white text-base 
        bg-[#FD8D14] hover:bg-[#0D274E] transform transition-all duration-300" onClick={previousData ? handleUpdate : handleSubmit} disabled={isLoading}>{isLoading ? <div className="spinner mx-auto"></div> : previousData ? "Update" : "Add Car" }</button>
            </div>
          </div>
        </div>
      </div>
  );
};

export default index;
