"use client";
import { ChevronDownIcon } from "@/icons";
import { Modal } from "../ui/modal";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Button from "../ui/button/Button";

export default function ProjectCategoryModal({ isOpen, heading, onClose, formdata, handleChange, handleSave, options }) {
  console.log("form data", formdata);
  
  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-[584px] p-5 lg:p-10">
      <form onSubmit={handleSave}>
        <h4 className="mb-6 text-lg font-medium text-gray-800 dark:text-white/90">
          {heading}
        </h4>

        <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
          <div className="col-span-1">
            <Label>Category Name</Label>
            <Input
              type="text"
              id="name"
              name="name"
              defaultValue={formdata.name}
              onChange={handleChange}
              placeholder="Enter category name"
            />
          </div>
          <div className="col-span-1">
            <Label>Status</Label>
            <div className="relative">
              <select
                className={`h-11 w-full appearance-none rounded-lg border border-gray-300 px-4 py-2.5 pr-11 text-sm shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 ${
                  formdata.status ? "text-gray-800 dark:text-white/90" : "text-gray-400 dark:text-gray-400"
                }`}
                name="status"
                value={formdata.status}
                onChange={handleChange}
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

          <div className="col-span-1 sm:col-span-2">
            <Label>Description</Label>
            <textarea
              name="description"
              placeholder="Category Description"
              value={formdata.description}
              onChange={handleChange}
              rows={6}
              className="w-full  rounded-lg border border-gray-300 px-4 py-2 text-sm dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <Button type="button" onClick={onClose} variant="outline">
            Cancel
          </Button>
          <Button type="submit" variant="primary">
            Save
          </Button>
        </div>
      </form>
    </Modal>
  );
}
