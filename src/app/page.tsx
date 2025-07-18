import HomePage from "@/components/Home/Home";
import AllStores from "@/components/Stores/AllStores";


export default function Home() {
  return (
    <div className="flex flex-col">
      <HomePage />
      <AllStores />
    </div>
  );
}
