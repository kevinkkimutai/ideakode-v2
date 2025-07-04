"use client";
import React from "react";


export const Balances = () => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
      {/* <!-- Metric Item Start --> */}
        <div className="grid col-span-3 grid-cols-1 sm:grid-cols-3 gap-4">
      <div className="bg-white p-4 rounded-xl shadow">
        <p className="text-sm text-gray-500">Current balance</p>
        <h2 className="text-2xl font-bold">254,000</h2>
        <p className="text-green-500 text-sm mt-1">+26.4%</p>
      </div>
      <div className="bg-white p-4 rounded-xl shadow">
        <p className="text-sm text-gray-500">Income</p>
        <h2 className="text-2xl font-bold">150,000</h2>
        <p className="text-green-500 text-sm mt-1">+38.2%</p>
      </div>
      <div className="bg-white p-4 rounded-xl shadow">
        <p className="text-sm text-gray-500">Expenditure</p>
        <h2 className="text-2xl font-bold">54,000</h2>
        <p className="text-green-500 text-sm mt-1">+18.0%</p>
      </div>
    </div>
      {/* <!-- Metric Item End --> */}
    </div>
  );
};
