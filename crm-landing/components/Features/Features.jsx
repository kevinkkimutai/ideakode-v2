import React from 'react'

export default function Features() {

    const features = [
        {
          title: "Contact Management",
          description: "Organize and track all customer interactions in one place",
          icon: (
            <svg className='w-6 h-6 text-green-600' fill='currentColor' viewBox='0 0 20 20'>
              <path d='M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z'/>
            </svg>
          ),
        },
        {
          title: "Sales Pipeline",
          description: "Visualize and manage your sales process from lead to close",
          icon: (
            <svg className='w-6 h-6 text-green-600' fill='currentColor' viewBox='0 0 20 20'>
              <path fillRule='evenodd' d='M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'/>
            </svg>
          ),
        },
        {
          title: "Marketing Automation",
          description: "Automate email campaigns and nurture leads effectively",
          icon: (
            <svg className='w-6 h-6 text-green-600' fill='currentColor' viewBox='0 0 20 20'>
              <path d='M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z'/>
              <path d='M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z'/>
            </svg>
          ),
        },
        {
          title: "Analytics & Reports",
          description: "Get insights with powerful dashboards and custom reports",
          icon: (
            <svg className='w-6 h-6 text-green-600' fill='currentColor' viewBox='0 0 20 20'>
              <path d='M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z'/>
            </svg>
          ),
        },
        {
          title: "Task Management",
          description: "Never miss a follow-up with smart task scheduling and reminders",
          icon: (
            <svg className='w-6 h-6 text-green-600' fill='currentColor' viewBox='0 0 20 20'>
              <path fillRule='evenodd' d='M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z'/>
            </svg>
          ),

        }
      ];
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mx-auto'>
    {features.map((feature, index) => (
     
        <div  key={index} className={`flex items-center justify-center  rounded-2xl bg-green-100 p-4 shadow-lg transition-shadow`}>
          <div className={`w-10 h-10  rounded-xl flex items-center justify-center  group-hover:scale-110 transition-transform`}>
            {feature.icon}
          </div>
          <h3 className='text-md font-semibold text-gray-900 text-center'>
            {feature.title}
          </h3>
        </div>
     
    ))}
  </div>
  )
}
