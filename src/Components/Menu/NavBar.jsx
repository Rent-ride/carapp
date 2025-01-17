"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { IoIosMenu } from "react-icons/io";
import logo from "../../../public/logo.png";
import MenuLinks from "./MenuLinks";
import { RxCross2 } from "react-icons/rx";
import { usePathname } from "next/navigation";
import Link from "next/link";
const NavBar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isDrawerOpen]);

  const toggleDrawer = () => {
    setIsDrawerOpen((prev) => !prev);
  };
  const pathname = usePathname();
  return (
    <header
      className={`absolute top-3 w-full px-8 z-20 ${
        pathname === "/addcar" || pathname === "/addinstructor" || pathname === "/allcars" || pathname === "/allinstructors" || pathname === "/login" ? "hidden" : ""
      }`}
    >
      <div
        className={`bg-white/50 w-full flex items-center px-8 md:py-2 py-1 rounded-lg justify-between`}
      >
        {/* Logo */}
        <div>
          <Link href={"/"}>
          <Image
            src={logo}
            width={70}
            height={70}
            className="shadow-xl rounded-full "
            alt="Logo"
          />
          </Link>
        </div>

        {/* Other Navigation Links or Elements */}
        <div className="hidden md:block">
          <MenuLinks />
        </div>

        {/* Toggle Drawer Button */}
        <div className="text-center ml-auto md:hidden">
          <button
            className="text-white bg-[#FD8D14]  text-2xl rounded-lg  p-2 focus:outline-none"
            onClick={toggleDrawer}
          >
            <IoIosMenu />
          </button>
        </div>
      </div>

      {/* Drawer Navigation */}
      <div
        className={`fixed flex flex-col top-0 left-0 !z-40 w-60 h-screen p-4 overflow-y-auto transition-transform duration-300  ${
          isDrawerOpen ? "translate-x-0" : "-translate-x-full"
        } bg-[#0D274E] dark:bg-gray-800`}
      >
        <div className="flex items-center justify-between">
          <div>
            <Image
              src={logo}
              width={70}
              height={70}
              className="shadow-xl rounded-full "
              alt="Logo"
            />
          </div>
          <div>
            <button
              className="text-[#FD8D14] bg-[white]  text-2xl rounded-lg  p-2 focus:outline-none"
              onClick={toggleDrawer}
            >
              <RxCross2 />
            </button>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center flex-1">
          <MenuLinks setIsDrawerOpen={setIsDrawerOpen} isDrawerOpen={isDrawerOpen} />
        </div>
      </div>
    </header>
  );
};

export default NavBar;
