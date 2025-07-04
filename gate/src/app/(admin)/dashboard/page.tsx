import type { Metadata } from "next";
import React from "react";
import StatisticsChart from "@/components/dashboard/StatisticsChart";
import WalletCard from "@/components/dashboard/WalletCard";
import { Balances } from "@/components/dashboard/Balances";
import QuickLinks from "@/components/dashboard/QuickLinks";
import TransactionHistory from "@/components/dashboard/RecentOrders";

export const metadata: Metadata = {
  title:
    "Next.js E-commerce Dashboard | gateway - Next.js Dashboard Template",
  description: "This is Next.js Home for gateway Dashboard Template",
};

export default function page() {
  return (
    <div>
    <div className="grid grid-cols-12 gap-4 md:gap-6">
      <div className="col-span-12 space-y-6 xl:col-span-7">
        <Balances />


      </div>

      <div className="col-span-12 xl:col-span-5">
               <WalletCard />
      </div>


    </div>

      <div className="grid grid-cols-1 hidden md:grid-cols-2  gap-5 mt-5 md:mt-10 ">
            <div className="c"><StatisticsChart /></div>
             <div className=""><StatisticsChart /></div>

     
      </div>
      <div className="flex flex-col mt-10">
         <h3 className="font-semibold mb-4">Quick links</h3>
        <QuickLinks />
      </div>
       <div className="w-full mt-10">
        <TransactionHistory />
      </div>
    </div>
  );
}
