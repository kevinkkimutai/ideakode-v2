import React from 'react'

export default function QuickLinks() {
  const links = [
    { label: 'Deposit', color: 'bg-green-100', text: 'text-green-600' },
    { label: 'Withdrawal', color: 'bg-red-100', text: 'text-red-600' },
    { label: 'Transfer', color: 'bg-blue-100', text: 'text-blue-600' },
    { label: 'Request payment', color: 'bg-purple-100', text: 'text-purple-600' },
    { label: 'Link with Bank', color: 'bg-green-100', text: 'text-green-600' }
  ];

  return (
    <div className="bg-white py-10 rounded-xl  w-full flex flex-col items-center justify-center">
     
      <div className="md:grid flex items-center justify-center flex-wrap md:grid-cols-3 lg:grid-cols-5 gap-10 md:gap-20">
        {links.map((link, i) => (
         <div className='flex flex-col gap-3 items-center justify-center '>
             <button key={i} className={`px-4 py-2 rounded-full h-[62px] w-[62px] ${link.color} ${link.text} text-sm`}></button>
          {link.label}
         </div>
        ))}
      </div>
    </div>
  )
}
