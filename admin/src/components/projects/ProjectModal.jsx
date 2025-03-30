'use client'
import React from 'react'
import ComponentCard from '../common/ComponentCard'
import Label from '../form/Label'
import Input from '../form/input/InputField'
import { ChevronDownIcon } from '@/icons'
import Image from 'next/image'
import Button from '../ui/button/Button'
import { Modal } from '../ui/modal'

export default function ProjectModal({ isOpen, onClose, formData, categories, handleChange, handleSave, options }) {
    console.log("gromdata ", formData);
    
  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-[1084px] p-5 lg:p-10">
         <div>
      <form className="grid grid-cols-1 gap-6 xl:grid-cols-2" onSubmit={handleSave}>
        <ComponentCard title="Update Project">
          <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
            <div className="col-span-1">
              <Label>Title</Label>
              <Input type="text" name="title" placeholder="Enter project title" defaultValue={formData?.title} onChange={handleChange} />
            </div>
            <div className="col-span-1">
              <Label>Link</Label>
              <Input type="text" name="demolink" placeholder="https://netiqa.com" defaultValue={formData?.demolink} onChange={handleChange} />
            </div>
            <div className="col-span-1">
  <Label>Category</Label>
  <div className="relative">
    <select
      className={`h-11 w-full appearance-none rounded-lg border border-gray-300 px-4 py-2.5 pr-11 text-sm shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 ${
        formData?.categoryId ? "text-gray-800 dark:text-white/90" : "text-gray-400 dark:text-gray-400"
      }`}
      name="categoryId" 
      value={formData?.categoryId}
      onChange={handleChange}
    >
      <option value="" disabled>Select Category</option>
      {categories.map((category) => (
        <option key={category?.id} value={category?.id}>
          {category?.name}
        </option>
      ))}
    </select>
    <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
      <ChevronDownIcon />
    </span>
  </div>
</div>


          <div className="col-span-1">
            <Label>Status</Label>
            <div className="relative">
              <select
                className={`h-11 w-full appearance-none rounded-lg border border-gray-300 px-4 py-2.5 pr-11 text-sm shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 ${
                    formData?.status ? "text-gray-800 dark:text-white/90" : "text-gray-400 dark:text-gray-400"
                }`}
                value={formData?.status} onChange={handleChange}
                name="status"
 
              >
                <option value="" disabled>Select Option</option>
                {options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
                <ChevronDownIcon />
              </span>
            </div>
          </div>

          </div>
          <div className="col-span-1 sm:col-span-2">
            <Label>Description</Label>
            <textarea
              name="description"
              rows={10}
              value={formData?.description}
              onChange={handleChange}
              placeholder="Category Description"
              className="w-full  rounded-lg border border-gray-300 px-4 py-2 text-sm dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
            />
          </div>
        </ComponentCard>

        <div>
        <div
      className={`rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] `}
    >
      {/* Card Header */}
      <div className="px-6 py-5">
        <h3 className="text-base font-medium text-gray-800 dark:text-white/90">
         Project Image
        </h3>
       
      </div>
        <div className="p-4 border-t border-gray-100 dark:border-gray-800 sm:p-6">
        <div className="space-y-6">
        <input
      type="file"
      onChange={handleChange}
      className={`focus:border-ring-brand-300 h-11 w-full overflow-hidden rounded-lg border border-gray-300 bg-transparent text-sm text-gray-500 shadow-theme-xs transition-colors file:mr-5 file:border-collapse file:cursor-pointer file:rounded-l-lg file:border-0 file:border-r file:border-solid file:border-gray-200 file:bg-gray-50 file:py-3 file:pl-3.5 file:pr-3 file:text-sm file:text-gray-700 placeholder:text-gray-400 hover:file:bg-gray-100 focus:outline-hidden focus:file:ring-brand-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-400 dark:text-white/90 dark:file:border-gray-800 dark:file:bg-white/[0.03] dark:file:text-gray-400 dark:placeholder:text-gray-400`}
     
    />
        </div>
      </div>
    
{/* selected image preview */}
    <div className='px-4 pb-6 sm:px-6 mt-6 flex items-center justify-center  '>
        <div className='bg-white w-full h-full rounded-2xl '>
            <Image
               src={formData?.imagePreview}
                alt='project image'
                className='object-cover  rounded-2xl h-[220px]'
                height={220}
                width={1000}
             />
        </div>

    </div>
    </div>


          <div className='mt-6 flex items-center justify-center'>
            <Button size="xmd" type="submit">Submit</Button>
          </div>
        </div>
      </form>
    </div>
    </Modal>
  )
}
