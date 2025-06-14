import React from "react";

export default function WhyCrm() {
    const benefits = [
        {
          text: "Increase sales by 41% with organized lead management",
          icon: (
            <svg className="w-10 h-10 text-green-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.891 15.107 15.11 8.89m-5.183-.52h.01m3.089 7.254h.01M14.08 3.902a2.849 2.849 0 0 0 2.176.902 2.845 2.845 0 0 1 2.94 2.94 2.849 2.849 0 0 0 .901 2.176 2.847 2.847 0 0 1 0 4.16 2.848 2.848 0 0 0-.901 2.175 2.843 2.843 0 0 1-2.94 2.94 2.848 2.848 0 0 0-2.176.902 2.847 2.847 0 0 1-4.16 0 2.85 2.85 0 0 0-2.176-.902 2.845 2.845 0 0 1-2.94-2.94 2.848 2.848 0 0 0-.901-2.176 2.848 2.848 0 0 1 0-4.16 2.849 2.849 0 0 0 .901-2.176 2.845 2.845 0 0 1 2.941-2.94 2.849 2.849 0 0 0 2.176-.901 2.847 2.847 0 0 1 4.159 0Z"/>
          </svg>          
          
          )
        },
        {
          text: "Save 2.4 hours daily with automated workflows",
          icon: (
            <svg className="w-10 h-10 text-green-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3M3.22302 14C4.13247 18.008 7.71683 21 12 21c4.9706 0 9-4.0294 9-9 0-4.97056-4.0294-9-9-9-3.72916 0-6.92858 2.26806-8.29409 5.5M7 9H3V5"/>
</svg>

          )
        },
        {
          text: "Improve customer retention by 27% with better insights",
          icon: (
            <svg className="w-10 h-10 text-green-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.5 21h13M12 21V7m0 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm2-1.8c3.073.661 2.467 2.8 5 2.8M5 8c3.359 0 2.192-2.115 5.012-2.793M7 9.556V7.75m0 1.806-1.95 4.393a.773.773 0 0 0 .37.962.785.785 0 0 0 .362.089h2.436a.785.785 0 0 0 .643-.335.776.776 0 0 0 .09-.716L7 9.556Zm10 0V7.313m0 2.243-1.95 4.393a.773.773 0 0 0 .37.962.786.786 0 0 0 .362.089h2.436a.785.785 0 0 0 .643-.335.775.775 0 0 0 .09-.716L17 9.556Z"/>
</svg>


          )
        },
        {
          text: "Reduce manual data entry by 80% with smart automation",
          icon: (
            <svg className="w-10 h-10 text-green-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 6c0 1.657-3.134 3-7 3S5 7.657 5 6m14 0c0-1.657-3.134-3-7-3S5 4.343 5 6m14 0v6M5 6v6m0 0c0 1.657 3.134 3 7 3s7-1.343 7-3M5 12v6c0 1.657 3.134 3 7 3s7-1.343 7-3v-6"/>
          </svg>
          
          )
        }
      ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-20 items-center">
      <div className="flex-1 rounded-2xl h-[450px] w-full relative z-10 flex items-center justify-end max-md:h-[400px]">
        <div className="h-[90%] w-[90%] bg-white z-30 rounded-xl shadow-2xl flex items-center justify-center border border-green-300">
          <div className="text-center text-gray-600">
            <div className="w-16 h-16 bg-green-600 rounded-lg mx-auto mb-4 flex items-center justify-center">
              <svg
                className="w-8 h-8 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-semibold text-lg">CRM Dashboard Preview</h3>
            <p className="text-sm">Interactive demo coming soon</p>
          </div>
        </div>

        <div className="w-[30%] z-20 bg-gradient-to-tl rounded-l-2xl from-white to-blue-200 absolute h-full top-0 left-0 opacity-80"></div>
      </div>

      <div className=" max-md:w-full max-md:text-center max-md:px-4">
      <h2 className="text-[24px] md:text-[40px] font-bold">
         Why <span className="text-green-500">Smart CRM?</span>
        </h2>
        <h3 className="text-[18px] mt-3 lg:text-[32px] font-semibold text-gray-900 leading-tight mb-6">
        Turn Prospects Into Loyal Customers
        </h3>
        <p className="text-lg text-gray-600 mb-8 leading-relaxed">
        Our CRM doesn't just organize your contacts—it transforms how you build relationships, close deals,
         and grow your business. See measurable results from day one.
        </p>
        <div className="grid grid-cols-2 gap-5 ">
            {benefits.map((benefit, index) => (
            <p key={index} className="flex items-center justify-center gap-3">
             <span className="flex items-center justify-center">
             {benefit.icon}
             </span>
               {benefit.text}
            </p>
))}
        </div>
      </div>
    </div>
  );
}
