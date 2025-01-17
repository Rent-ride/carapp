"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";

function Contact() {
  useEffect(() => {
    document.title = "Contact | Rent-Ride";
  }, []);
  const phoneNumber=+923077588129
  const preFilledMessage = 'Hello, I\'m interested in renting a car';

  const link = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(preFilledMessage)}`;
 
  return (
    <main className="">
      <div className="md:h-[80vh] h-[50vh] relative w-full bg-red-600 -z-10">
        <div className="bg-black/50  inset-0 absolute z-10" />
        <Image
          src={"/contact-cover.jpg"}
          alt="car"
          fill
          className="object-cover "
        />
      </div>
      <h1 className="text-center my-14 font-semibold text-5xl tracking-wide text-gray-800">Contact Us</h1>
      <div className="border-2 border-black max-w-max mx-4 sm:mx-auto shadow-xl p-4 rounded-md bg-slate-100 flex flex-col items-center gap-2">
        <h1 className="font-bold text-2xl">Information</h1>
        <p className="font-semibold text-lg">Phone : <span className="font-normal text-base">+92 307 7588129</span></p>
        <p className="text-center font-medium text-lg">Address : <span className="font-normal text-base">Rent Ride Zaman Colony main Muzafar Garh road near Police Lines Jauharabad,Khushab</span></p>
        <p className="font-semibold text-lg">Contact On Whatsapp</p>
        <Link href={link} target="blank"><FaWhatsapp size={40} /></Link>
      </div>
      <p className="w-[90%] lg:w-[70%] text-justify lg:text-center mx-auto py-7 ">
        We're thrilled that you're interested in
        getting in touch with us. Whether you have questions about our car
        rental services, need assistance with your booking, or simply want to
        learn more about how we can help, we're here to make your experience
        seamless and enjoyable. Please feel free to reach out to us using the
        form below, and one of our friendly team members will get back to you as
        soon as possible
      </p>
    </main>
  );
}

export default Contact;
