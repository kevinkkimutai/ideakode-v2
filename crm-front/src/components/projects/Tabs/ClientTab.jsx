import React from 'react'

export default function ClientTab({project}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 transition-colors duration-200">
      <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Client Information</h2>
      <div className="space-y-4">
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Company Name</p>
          <p className="font-medium text-gray-900 dark:text-white">{project.Customer.company_name}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Industry</p>
          <p className="font-medium text-gray-900 dark:text-white">{project.Customer.industry}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Website</p>
          <a href={`https://${project.Customer.website}`} target="_blank" className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 font-medium">
            {project.Customer.website}
          </a>
        </div>
      </div>
    </div>
    
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 transition-colors duration-200">
      <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Primary Contact</h2>
      {project.Customer.Contacts.length > 0 && project.Customer.Contacts.filter(c => c.is_primary).map(contact => (
        <div key={contact.id} className="space-y-4">
          <div className="flex items-center">
            <div className="bg-indigo-100 dark:bg-indigo-900 rounded-full p-3 mr-4">
              <span className="text-xl font-medium text-indigo-700 dark:text-indigo-300">
                {contact.first_name.charAt(0)}{contact.last_name.charAt(0)}
              </span>
            </div>
            <div>
              <p className="font-medium text-gray-900 dark:text-white">{contact.first_name} {contact.last_name}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{contact.job_title}</p>
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Email</p>
            <a href={`mailto:${contact.email}`} className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 font-medium">
              {contact.email}
            </a>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Phone</p>
              <p className="font-medium text-gray-900 dark:text-white">{contact.phone}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Mobile</p>
              <p className="font-medium text-gray-900 dark:text-white">{contact.mobile}</p>
            </div>
          </div>
          {contact.notes && (
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Notes</p>
              <p className="text-gray-700 dark:text-gray-300">{contact.notes}</p>
            </div>
          )}
        </div>
      ))}
    </div>
    
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 transition-colors duration-200">
      <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Address</h2>
      {project.Customer.Addresses.length > 0 && project.Customer.Addresses.filter(a => a.is_primary).map(address => (
        <div key={address.id} className="space-y-4">
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Address Type</p>
            <p className="font-medium text-gray-900 dark:text-white capitalize">{address.address_type}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Street</p>
            <p className="font-medium text-gray-900 dark:text-white">{address.street}</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">City</p>
              <p className="font-medium text-gray-900 dark:text-white">{address.city}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">State/Province</p>
              <p className="font-medium text-gray-900 dark:text-white">{address.state}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Postal Code</p>
              <p className="font-medium text-gray-900 dark:text-white">{address.postal_code}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Country</p>
              <p className="font-medium text-gray-900 dark:text-white">{address.country}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
  )
}
