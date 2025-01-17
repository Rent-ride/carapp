"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { useFirebase } from "@/Firebase/FirebaseContext";

const NavLinks = [
  {
    name: "Home",
    Link: "/",
  },
  {
    name: "Add Instructor",
    Link: "/addinstructor",
  },
  {
    name : "Add Car",
    Link : "/addcar"
  },
  {
    name: "All Cars",
    Link: "/allcars",
  },
  {
    name: "All Instructors",
    Link: "/allinstructors",
  },
  
];
const HeaderLinks = (props) => {
  const pathname = usePathname();
  const {auth,signOut}=useFirebase()

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-6">
        {NavLinks.map((itm, idx) => (
          <div key={idx} className="">
            <Link
              className={`font-medium hover:text-[#FD8D14] transition-all transform duration-300 ${
                pathname === itm.Link ? "text-[#FD8D14]" : "text-white"
              }`}
              href={itm.Link}
              onClick={props.isDrawerOpen ? ()=>props.setIsDrawerOpen(false) : null}
            >
              {itm.name}
            </Link>
          </div>
        ))}
        <button className={`font-medium hover:text-[#FD8D14] transition-all transform duration-300 text-white`} onClick={()=>signOut(auth)}>
          Logout
        </button>
      </div>
 
    </div>
  );
};

export default HeaderLinks;
