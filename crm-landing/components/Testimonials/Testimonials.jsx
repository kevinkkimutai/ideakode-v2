"use client";
import React, { useEffect, useRef } from "react";
import KeenSlider from "keen-slider";
import "keen-slider/keen-slider.min.css";

export default function Testimonials() {
  const sliderRef = useRef(null);
  const keenSliderInstance = useRef(null);

  useEffect(() => {
    if (sliderRef.current) {
      keenSliderInstance.current = new KeenSlider(sliderRef.current, {
        loop: true,
        slides: {
          origin: "center",
          perView: 1.25,
          spacing: 16,
        },
        breakpoints: {
          "(min-width: 1024px)": {
            slides: {
              origin: "auto",
              perView: 1.5,
              spacing: 32,
            },
          },
        },
      });

      // Auto-scroll functionality
      const interval = setInterval(() => {
        keenSliderInstance.current?.next();
      }, 3000); // Change slide every 3 seconds

      return () => {
        keenSliderInstance.current?.destroy();
        clearInterval(interval);
      };
    }
  }, []);

  return (
   <div>
     <section className=" mx-auto max-w-[1340px]">
      <div className=" px-4 py-12 sm:px-6 lg:me-0 lg:py-16 lg:ps-8 lg:pe-0 xl:py-24">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:items-center lg:gap-16">
          <div className="lg:max-w-xl lg:text-center ltr:sm:text-left rtl:sm:text-right">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Trusted by businesses worldwide
            </h2>
            <p className="mt-4 text-gray-700 lg:text-md">
            See how our CRM software has transformed sales processes, improved customer relationships, 
            and boosted revenue for companies of all sizes. Real results from real businesses.
            </p>

            <div className="hidden lg:mt-8 lg:flex lg:gap-4">
              <button
                aria-label="Previous slide"
                onClick={() => keenSliderInstance.current?.prev()}
                className="rounded-full w-14 h-14 flex items-center justify-center border border-green-600 p-3 text-green-600 transition hover:bg-green-600 hover:text-white"
              >
              <svg className="w-6 h-6 text-green-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M5 12l4-4m-4 4 4 4"/>
</svg>

              </button>

              <button
                aria-label="Next slide"
                onClick={() => keenSliderInstance.current?.next()}
                className="rounded-full border  w-14 h-14 flex items-center justify-center border-green-600 p-3 text-green-600 transition hover:bg-green-600 hover:text-white"
              >
              <svg className="w-6 h-6 text-green-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 12H5m14 0-4 4m4-4-4-4"/>
</svg>

              </button>
            </div>
          </div>

          <div className="-mx-6 lg:col-span-2 lg:mx-0">
            <div ref={sliderRef} className="keen-slider">
            <div className="keen-slider__slide p-6 bg-white rounded-lg bg-gradient-to-br from-green-100 via-white to-green-100 border border-green-300">
  <p className="text-xl font-bold text-green-600">300% Increase in Sales Conversion!</p>
  <p className="mt-4 text-gray-700">
    Since implementing this CRM, our sales team's productivity has skyrocketed. The automated lead nurturing and 
    pipeline management features helped us close 3x more deals. The reporting dashboard gives us insights we never had before.
  </p>
  <footer className="mt-4 text-sm font-medium text-gray-700">— Sarah Johnson, Sales Director at TechFlow Solutions</footer>
</div>

<div className="keen-slider__slide p-6 bg-white rounded-lg bg-gradient-to-br from-green-100 via-white to-green-100 border border-green-300">
  <p className="text-xl font-bold text-green-600">Customer Retention Up 45%!</p>
  <p className="mt-4 text-gray-700">
    The customer service features are game-changing. We can track every interaction, set automated follow-ups, 
    and never miss an opportunity to delight our customers. Our retention rates have never been higher.
  </p>
  <footer className="mt-4 text-sm font-medium text-gray-700">— Marcus Chen, Customer Success Manager at BuildRight</footer>
</div>

<div className="keen-slider__slide p-6 bg-white rounded-lg bg-gradient-to-br from-green-100 via-white to-green-100 border border-green-300">
  <p className="text-xl font-bold text-green-600">Finally, All Data in One Place!</p>
  <p className="mt-4 text-gray-700">
    No more scattered spreadsheets or lost leads. This CRM centralized all our customer data and made our entire 
    team more collaborative. The mobile app means we can update records on the go. It's been transformative.
  </p>
  <footer className="mt-4 text-sm font-medium text-gray-700">— Rachel Martinez, Operations Manager at GreenLeaf Consulting</footer>
</div>

<div className="keen-slider__slide p-6 bg-white rounded-lg bg-gradient-to-br from-green-100 via-white to-green-100 border border-green-300">
  <p className="text-xl font-bold text-green-600">Streamlined Our Entire Process!</p>
  <p className="mt-4 text-gray-700">
    From lead generation to deal closure, everything flows seamlessly. The automation saves us 10+ hours per week, 
    and the integration with our email marketing tools means no manual data entry. ROI was immediate.
  </p>
  <footer className="mt-4 text-sm font-medium text-gray-700">— David Thompson, Founder of Digital Marketing Pro</footer>
</div>

            </div>
          </div>
        </div>
      </div>
    </section>
    </div>
  );
}