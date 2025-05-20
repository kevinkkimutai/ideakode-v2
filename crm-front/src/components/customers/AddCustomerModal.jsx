"use client";
import { Modal } from "../ui/modal";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Button from "../ui/button/Button";
import { useState, useEffect } from "react";
import { useCreateCustomerMutation } from "@/redux/actions/customerActions";

export default function ProductCustomerModal({ 
  isOpen, 
  heading, 
  onClose, 
  setAlertData, 
  onSuccess = null 
}) {
  const [createCustomer] = useCreateCustomerMutation();
  
  const [formData, setFormData] = useState({
    customer_name: "",
    industry: "",
    website: "",
    tax_id: "",
    notes: ""
  });
  
  const [loading, setLoading] = useState(false);
  
  // This effect runs when the modal opens or when initialData/mode changes
  useEffect(() => {
      // Reset form when opening in create mode
      setFormData({
        customer_name: "",
    industry: "",
    website: "",
    tax_id: "",
    notes: "",
      });
    
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {

        // Create new customer
      const response = await createCustomer(formData);
        
        if (response.data) {
          setFormData({
            customer_name: "",
    industry: "",
    website: "",
    tax_id: "",
    notes: ""
          });
          setAlertData({
            show: true,
            variant: "success",
            title: "Success!",
            message: "Customer created successfully.",
          });
          
          // Call the success callback with new data and operation type
          if (onSuccess) {
            onSuccess(response.data);
          }
        }
      
      
      onClose(); // Close modal after successful operation
      
    } catch (err) {
      console.error(`Errorcreating customer:`, err);
      
      setAlertData({
        show: true,
        variant: "error",
        title: "Error!",
        message: err.data?.message || err.message || `An error occurred while creating the Customer.`,
      });
    } finally {
      setLoading(false);
    }
  };


  // Log the current form state for debugging
  console.log("Current form state:", formData);
  console.log("Current initialData:", initialData);

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-[584px] p-5 lg:p-10 relative">
      <form onSubmit={handleSubmit} className="p-6">
      <h4 className="mb-6 text-lg font-medium text-gray-800 dark:text-white/90">
          {heading}
        </h4>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="customer_name">Customer Name</Label>
            <Input
              id="customer_name"
              name="customer_name"
              placeholder="Enter customer name"
              defaultValue={formData.customer_name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="industry">Industry</Label>
            <Input
              id="industry"
              name="industry"
              placeholder="Enter industry name"
              defaultValue={formData.industry}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="website">Website Url</Label>
            <Input
              id="website"
              name="website"
              placeholder="Enter website url"
              defaultValue={formData.website}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="name">Tax_id</Label>
            <Input
              id="tax_id"
              name="tax_id"
              placeholder="Enter tax_id"
              defaultValue={formData.tax_id}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-span-1 sm:col-span-2">
            <Label>notes</Label>
            <textarea
              name="notes"
              placeholder="Customer Notes"
              value={formData.notes}
              onChange={handleChange}
              rows={6}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
            />
          </div>
    
        </div>
        
        <div className="mt-6 flex justify-end gap-3">
          <Button type="button" onClick={onClose} variant="outline">
            Cancel
          </Button>
          <Button type="submit" variant="primary">
           { loading ? "Saving" : "Save"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}