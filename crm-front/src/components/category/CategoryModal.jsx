"use client";
import { ChevronDownIcon } from "@/icons";
import { Modal } from "../ui/modal";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Button from "../ui/button/Button";
import { 
  useCreateProductCategoryMutation,
  useUpdateProductCategoryMutation,
} from "@/redux/actions/productCategoryActions";
import { useState, useEffect } from "react";

export default function ProductCategoryModal({ 
  isOpen, 
  heading, 
  onClose, 
  setAlertData, 
  initialData = null, 
  mode = "create", // "create" or "update" mode
  onSuccess = null // Callback prop to notify parent component
}) {
  const [createProductCategory] = useCreateProductCategoryMutation();
  const [updateProductCategory] = useUpdateProductCategoryMutation();
  
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });
  
  const [loading, setLoading] = useState(false);
  
  // This effect runs when the modal opens or when initialData/mode changes
  useEffect(() => {
    console.log("Modal effect running with initialData:", initialData);
    
    if (mode === "update" && initialData) {
      console.log("Setting form data for update:", initialData.name);
      setFormData({
        name: initialData.name || "",
        description: initialData.description || "",
        // Add any other fields that are part of your category object
        // status: initialData.status
      });
    } else {
      console.log("Resetting form data for create mode");
      // Reset form when opening in create mode
      setFormData({
        name: "",
        description: "",
      });
    }
  }, [initialData, mode, isOpen]);

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
      let response;
      
      if (mode === "update" && initialData) {
        // Update existing category
        response = await updateProductCategory({ 
          id: initialData.id, 
          ...formData 
        });
        
        if (response.data) {
          setAlertData({
            show: true,
            variant: "success",
            title: "Success!",
            message: "Category updated successfully.",
          });
          
          // Call the success callback with updated data and operation type
          if (onSuccess) {
            // Create updated category object with all original properties and updated fields
            const updatedCategory = {
              ...initialData,
              ...formData
            };
            onSuccess(updatedCategory, "update");
          }
        }
      } else {
        // Create new category
        response = await createProductCategory(formData);
        
        if (response.data) {
          setFormData({
            name: "",
            description: "",
          });
          setAlertData({
            show: true,
            variant: "success",
            title: "Success!",
            message: "Category created successfully.",
          });
          
          // Call the success callback with new data and operation type
          if (onSuccess) {
            onSuccess(response.data, "create");
          }
        }
      }
      
      onClose(); // Close modal after successful operation
      
    } catch (err) {
      console.error(`Error ${mode === "update" ? "updating" : "creating"} category:`, err);
      
      setAlertData({
        show: true,
        variant: "error",
        title: "Error!",
        message: err.data?.message || err.message || `An error occurred while ${mode === "update" ? "updating" : "creating"} the Category.`,
      });
    } finally {
      setLoading(false);
    }
  };

  const buttonText = loading 
    ? (mode === "update" ? "Updating..." : "Saving...") 
    : (mode === "update" ? "Update" : "Save");

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
            <Label htmlFor="name">Category Name</Label>
            <Input
              id="name"
              name="name"
              placeholder="Enter category name"
              defaultValue={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-span-1 sm:col-span-2">
            <Label>Description</Label>
            <textarea
              name="description"
              placeholder="Category Description"
              value={formData.description}
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
            {buttonText}
          </Button>
        </div>
      </form>
    </Modal>
  );
}