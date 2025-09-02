import BuiltForRole from "@/components/BuiltForRole/BuiltForRole";
import CtaSection from "@/components/CTA/CtaSection";
import Features from "@/components/Features/Features";
import HeroSection from "@/components/Hero/HeroSection";
import MultipleBranches from "@/components/MultipleBranches/MultipleBranches";
import Testimonials from "@/components/Testimonials/Testimonials";
import WhyCrm from "@/components/WhyCrm/WhyCrm";
import { ProductSchema, HowToSchema } from "@/components/SEO/StructuredData";
import { SemanticContent } from "@/components/SEO/LLMOptimization";
import Image from "next/image";

export default function Home() {
  return (
   <>
     <ProductSchema />
     <HowToSchema />
     <SemanticContent type="main-content">
       <div className="w-full flex flex-col gap-10 lg:gap-20 items-center justify-center">
        <div className="max-w-[1280px] w-full max-lg:px-4 flex flex-col gap-10 lg:gap-20">
        <HeroSection />
        <SemanticContent type="features">
          <Features />
        </SemanticContent>
        <SemanticContent type="benefits">
          <WhyCrm />
        </SemanticContent>
        <SemanticContent type="use-cases">
          <BuiltForRole />
        </SemanticContent>
        <MultipleBranches />
        </div>
        <div className="bg-blue-50 w-full">
        <SemanticContent type="testimonials">
          <Testimonials />
        </SemanticContent>
        <div className="w-full bg-black py-10 ">
          <SemanticContent type="cta">
            <CtaSection />
          </SemanticContent>
        </div>
        </div>
       </div>
     </SemanticContent>
   </>
  );
}
