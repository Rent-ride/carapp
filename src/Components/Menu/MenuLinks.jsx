import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
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
const MenuLinks = (props) => {
  const pathname = usePathname();

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
      </div>
    </div>
  );
};

export default MenuLinks;
