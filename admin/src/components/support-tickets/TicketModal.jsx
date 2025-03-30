"use client";
import { ChevronDownIcon } from "@/icons";
import { Modal } from "../ui/modal";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Button from "../ui/button/Button";

export default function TicketModal({ isOpen, onClose, heading, ticket }) {
    console.log(ticket);
    
  
  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-[684px] p-5 lg:p-10">
      <form >
        <h4 className="mb-6 text-lg font-medium text-gray-800 dark:text-white/90">
          {heading}
        </h4>

        <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
          <div className="col-span-1">
            <Label>Full Name</Label>
            <Input
              type="text"
              id="name"
              name="name"
              defaultValue={ticket?.fullname}
              placeholder="Enter category name"
            />
          </div>
          <div className="col-span-1">
            <Label>Email</Label>
            <div className="relative">
            <Input
              type="text"
              id="name"
              name="name"
              defaultValue={ticket?.email}
              placeholder="Enter category name"
            />
            </div>
          </div>

          <div className="col-span-1">
            <Label>Phone Number</Label>
            <div className="relative">
            <Input
              type="text"
              id="name"
              name="name"
              defaultValue={ticket?.phone}
              placeholder="Enter category name"
            />
            </div>
          </div>
          <div className="col-span-1">
            <Label>Category</Label>
            <div className="relative">
            <Input
              type="text"
              id="name"
              name="name"
              defaultValue={ticket?.supportcategory.name}
              placeholder="Enter category name"
            />
            </div>
          </div>
          <div className="col-span-1 sm:col-span-2">
            <Label>Subject</Label>
            <div className="relative">
            <Input
              type="text"
              id="name"
              name="name"
              defaultValue={ticket?.supportcategory.name}
              placeholder="Enter category name"
            />
            </div>
          </div>

          <div className="col-span-1 sm:col-span-2">
            <Label>Message</Label>
            <textarea
              name="description"
              placeholder="Category Description"
              value={ticket?.description}
              rows={10}
              className="w-full  rounded-lg border border-gray-300 px-4 py-2 text-sm dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <Button type="button" onClick={onClose} variant="primary">
            Close
          </Button>
          
        </div>
      </form>
    </Modal>
  );
}
