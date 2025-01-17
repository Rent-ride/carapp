import Link from "next/link";
import React from "react";
import { FaLongArrowAltRight } from "react-icons/fa";
const HeroSection = () => {
  return (
    <div>
      <section className="relative lg:h-screen h-[60vh] flex flex-col md:justify-center justify-end gap-4 px-10 z-10">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-black/30" />
          <video
            className="w-full h-full lg:object-cover object-cover"
            autoPlay
            loop
            muted
          >
            <source src="/hero-video.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="text-white flex flex-col gap-3  mb">
          <h1 className="text-4xl lg:text-7xl  font-bold uppercase max-w-[15ch] tracking-widest">
            Drive Your Dream
          </h1>
          <p className="text-lg lg:text-3xl">
            Unlock Your Journey with Our Rental Cars
          </p>
        </div>
        <div className="bg-white md:h-[1px] md:w-1/2 h-[0.5px]" />

        <div className="lg:w-1/4 w-1/2 pb-10 md:pb-0">
          <Link href={"/car"}><button
            className="uppercase py-2.5 flex items-center gap-2 justify-center tracking-wider rounded-lg text-white text-base 
        bg-[#FD8D14] hover:bg-[#0D274E] transform transition-all duration-300 w-full"
          >
            Find a Car
            <span>
              <FaLongArrowAltRight />
            </span>
          </button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;
