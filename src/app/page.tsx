import HeroBanner from "@/components/Home/Home";
import ProductCarousel from "@/components/Home/ProductCarousel";
import Topbar from "@/components/Home/Topbar";



export default function Home() {
  return (
    <div className="flex flex-col">
      <Topbar />
      <HeroBanner />
      <ProductCarousel />
      
    </div>
  );
}
