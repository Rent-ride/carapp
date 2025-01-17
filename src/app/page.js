import CardSection from "@/Components/Cards/CardSection";
import HeroSection from "@/Components/Home/HeroSection";
import Image from "next/image";

export const metadata = {
  title: "Home | Rent-Ride",
  description: "Home Page",
};

export default function Home() {
  return (
    <>
      <div>
        <div>
          <HeroSection />
        </div>
        <CardSection />
      </div>
    </>
  );
}
