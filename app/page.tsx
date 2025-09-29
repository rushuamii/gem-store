import Image from "next/image";
import Hero from "./components/hero";
import Newest from "./components/newest";
import Banner from "./components/banner";
import Footer from "./components/footer";

export default function Home() {
  return (
    <div className="bg-white pb-6 sm:pb-8 lg:pb-12">
      <Hero />
      <Newest />
      <Banner />
      <Footer />
    </div>
  );
}
