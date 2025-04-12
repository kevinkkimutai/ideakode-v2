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
     <section className="bg-gren-50 mx-auto max-w-[1340px]">
      <div className=" px-4 py-12 sm:px-6 lg:me-0 lg:py-16 lg:ps-8 lg:pe-0 xl:py-24">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:items-center lg:gap-16">
          <div className="lg:max-w-xl lg:text-center ltr:sm:text-left rtl:sm:text-right">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Don’t just take our word for it...
            </h2>
            <p className="mt-4 text-gray-700 lg:text-md">
            Hear from our satisfied clients! Discover how our expertise in web development, 
            software solutions, and design has helped businesses thrive. 
            See what our clients have to say about working with us!
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
  <p className="text-xl font-bold text-green-600">Seamless E-commerce Launch!</p>
  <p className="mt-4 text-gray-700">
    From product pages to secure checkout, everything was handled professionally. 
    The end result was a stunning and user-friendly e-commerce site that helped us boost sales from day one.
    Truly impressed by the team’s dedication and support!
  </p>
  <footer className="mt-4 text-sm font-medium text-gray-700">— Abdisalani Mohamed, CEO of Cinab</footer>
</div>


<div className="keen-slider__slide p-6 bg-white rounded-lg bg-gradient-to-br from-green-100 via-white to-green-100 border border-green-300">
  <p className="text-xl font-bold text-green-600">Our Brand Finally Speaks!</p>
  <p className="mt-4 text-gray-700">
    The team completely transformed how our brand is perceived. From our logo to color palette and tone, everything now feels aligned with our vision. Clients constantly compliment our new identity.
  </p>
  <footer className="mt-4 text-sm font-medium text-gray-700">— Frankline, Founder of RebakFencing</footer>
</div>


<div className="keen-slider__slide p-6 bg-white rounded-lg bg-gradient-to-br from-green-100 via-white to-green-100 border border-green-300">
  <p className="text-xl font-bold text-green-600">Beautiful, Functional Design!</p>
  <p className="mt-4 text-gray-700">
    We were blown away by the attention to detail and modern aesthetics. Our new site isn’t just pretty — it’s user-friendly, fast, and converts better. The UI/UX upgrade made a huge difference.
  </p>
  <footer className="mt-4 text-sm font-medium text-gray-700">— Kelvin Kimutai, Founder Netiqa</footer>
</div>

            </div>
          </div>
        </div>
      </div>
    </section>
    </div>
  );
}
