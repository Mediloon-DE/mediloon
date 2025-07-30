import { HeroCarousel } from "@/components/Home/HeroCarousel";
import HeroBanner from "@/components/Home/Home";
import ProductCarousel from "@/components/Home/ProductCarousel";
import ServicesSection from "@/components/Home/ServicesSection";
import Topbar from "@/components/Home/Topbar";



export default function Home() {
  return (
    <div className="flex flex-col justify-center">
      <Topbar />
      <HeroBanner />
      <HeroCarousel />
      <ServicesSection />
      <ProductCarousel />
      
    </div>
  );
}
