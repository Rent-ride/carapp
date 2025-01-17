"use client"
import React from "react";

import Image from "next/image";
import { FaPhone } from "react-icons/fa6";
import { ImHome3 } from "react-icons/im";
import { usePathname } from "next/navigation";
import Link from "next/link";

const NavLinks = [
  {
    name: "Home",
    Link: "/",
  },
  {
    name: "Cars",
    Link: "/car",
  },
  {
    name: "Driving School",
    Link: "/school",
  },
  {
    name: "Contact",
    Link: "/contact",
  },
  
];

const CustomFotter = () => {
  const path=usePathname()
  return (
    <footer className={`bg-[#0D274E] py-5 ${path==="/login" ? "hidden":""}`}>
      <div className="max-w-4xl mx-auto xl:px-0 px-5">
        <div>
          <Image src={"/logo.png"} height={100} width={100} alt="Logo"/>
        </div>
        <div className=" flex items-center justify-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-14">
            <div className="text-white col-span-2">
              <div className="relative">
                <h2 className="text-2xl font-bold">About Rent Ride</h2>
                <div className="absolute  left-0 w-24 h-0.5 bg-[#FD8D14] rounded-full" />
              </div>
              <p className="mt-4 text-base capitalize tracking-wide text-justify">
                Offering Pakistan's most rapidly expanding online car rental and
                taxi booking services, catering to diverse clientele including
                individuals, corporations, families, VIPs, tourists, wedding
                parties, and organizers of special events.
              </p>
              <div className="mt-6 flex flex-col items-start gap-4">
                <div className="flex items-center gap-2">
                  <div className="bg-[#FD8D14] p-2 w-fit rounded-full hover:scale-110 transform transition-all duration-500">
                    <FaPhone size={18} />
                  </div>
                  <div>
                    <p className="text-base">+92 307 7588129</p>
                  </div>
                  </div>
                  <div className="flex items-center gap-2">
                  <div className="bg-[#FD8D14] p-2 w-fit rounded-full hover:scale-110 transform transition-all duration-500">
                    <ImHome3 size={18}/>
                  </div>
                <div>
                  <p className="text-base">Rent Ride Zaman Colony main Muzafar Garh road near Police Lines Jauharabad,Khushab</p>
                </div>
                </div>
              </div>
            </div>
            <div className="text-white flex flex-col md:items-center">
              <div className="relative">
                <h2 className="text-2xl font-bold">Quick Links</h2>
                <div className="absolute  left-0 w-20 h-0.5 bg-[#FD8D14] rounded-full" />
              </div>
              <div className="mt-4 flex md:flex-col md:gap-2 justify-between">
                {NavLinks.map((item,index) => (
                  <div key={index}>
                  <Link href={item.Link}>
                  <h1
                    className="hover:text-[#FD8D14] hover:scale-110 transform transition-all duration-500 cursor-pointer"
                  >
                    {item.name}
                  </h1>
                  </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <p className="text-white text-center mt-4">&copy; 2025 Rent Ride. All rights reserved.</p>
    </footer>
  );
};

export default CustomFotter;
