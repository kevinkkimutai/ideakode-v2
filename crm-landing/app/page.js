import BuiltForRole from "@/components/BuiltForRole/BuiltForRole";
import CtaSection from "@/components/CTA/CtaSection";
import Features from "@/components/Features/Features";
import HeroSection from "@/components/Hero/HeroSection";
import MultipleBranches from "@/components/MultipleBranches/MultipleBranches";
import Testimonials from "@/components/Testimonials/Testimonials";
import WhyCrm from "@/components/WhyCrm/WhyCrm";
import Image from "next/image";

export default function Home() {
  return (
   <div className="w-full flex flex-col gap-10 lg:gap-20 items-center justify-center">
    <div className="max-w-[1280px] w-full max-lg:px-4 flex flex-col gap-10 lg:gap-20">
    <HeroSection />
    <Features />
    <WhyCrm />
    <BuiltForRole />
    <MultipleBranches />
    </div>
    <div className="bg-blue-50 w-full">
    <Testimonials />
    <div className="w-full bg-black py-10 ">
      <CtaSection />
    </div>
    </div>
  
  
   </div>
  );
}
