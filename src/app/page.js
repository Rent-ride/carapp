import CardSection from "@/Components/Cards/CardSection";
import HeroSection from "@/Components/Home/HeroSection";

export const metadata = {
  title: "Home | Rent-Ride",
  description: "Car Rental and drivng school services in Jauharabad and khushab",
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
