'use client'
import React, { useEffect, useState } from 'react'
import ComponentCard from '../common/ComponentCard'
import Label from '../form/Label'
import { Calendar, CheckCircle, ChevronDownIcon, DollarSign, Info } from 'lucide-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Button from '../ui/button/Button'
import { Modal } from '../ui/modal'
import { useUpdateProjectMutation } from '@/redux/actions/projectActions'

export default function ProjectModal({ isOpen, onClose, project, setAlertData, setProject }) {
  const [updateProject] = useUpdateProjectMutation();
  const [loading, setLoading] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [managers, setManagers] = useState([]);
  
  // Initialize form data with project data when available
  const [formData, setFormData] = useState({
    id: '',
    customerId: '',
    name: '',
    description: '',
    status: '',
    start_date: '',
    end_date: '',
    budget: '',
    managerId: ''
  });
  
  // Track original data to compare changes
  const [originalData, setOriginalData] = useState({});

  // Populate form data when project changes
  useEffect(() => {
    if (project) {
      const initialData = {
        id: project.id || '',
        customerId: project.customerId || '',
        name: project.name || '',
        description: project.description || '',
        status: project.status || '',
        start_date: project.start_date || '',
        end_date: project.end_date || '',
        budget: project.budget || '',
        managerId: project.managerId || ''
      };
      
      setFormData(initialData);
      setOriginalData(initialData);
    }
  }, [project]);

  // Fetch customers and managers on component mount
  useEffect(() => {
    // In a real app, these would be API calls
    // For demo purposes, using mock data
    setCustomers([
      { id: 1, name: 'Acme Corporation' },
      { id: 2, name: 'Globex Industries' },
      { id: 3, name: 'Wayne Enterprises' }
    ]);
    
    setManagers([
      { id: 1, name: 'John Doe' },
      { id: 2, name: 'Jane Smith' },
      { id: 3, name: 'Mike Johnson' }
    ]);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Specific handler for date fields
  const handleDateChange = (date, field) => {
    setFormData(prev => ({
      ...prev,
      [field]: date ? date.toISOString().split('T')[0] : ''
    }));
  };
  
  // Get only changed fields
  const getChangedFields = () => {
    const changedFields = { id: project?.id };
    
    Object.keys(formData).forEach(key => {
      // Check if the field has changed
      if (formData[key] !== originalData[key]) {
        changedFields[key] = formData[key];
      }
    });
    
    return changedFields;
  };
  
  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Only get the fields that have been changed
      const changedFields = getChangedFields();
      
      // If nothing has changed, don't make the API call
      if (Object.keys(changedFields).length <= 1) { // Only id is present
        setAlertData({
          show: true,
          variant: "info",
          title: "No Changes",
          message: "No changes were made to the project.",
        });
        setLoading(false);
        return;
      }
      
      const response = await updateProject(changedFields);
  
      if (response.data) {
        setProject(response.data.project);
        // Now we can access the full project data with all its associations
        setAlertData({
          show: true,
          variant: "success",
          title: "Success!",
          message: "Project updated successfully. 🎉",
        });
        
        // Pass the updated project back to the parent component if needed
        if (typeof onClose === 'function') {
          onClose(response.data.project);
        }
      }
    } catch (error) {
      setAlertData({
        show: true,
        variant: "error",
        title: "Error!",
        message: error.response?.data?.message || "Project update failed. 🥶",
      });
    } finally {
      setLoading(false);
    }
  };

  const statusOptions = ['planning', 'in_progress', 'on_hold', 'completed', 'cancelled'];
    
  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-[1084px] w-full p-5 lg:p-10 max-md:mt-96 ">
       <div>
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2 ">
        <ComponentCard title="Update Project">
          {/* Project Name */}
          <div className="col-spa-1 mb-5">
            <Label>Project Name</Label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter Project name"
              className="h-11 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm shadow-theme-xs focus:border-brand-300 focus:outline-none focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
            />
          </div>
          <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
            {/* Customer Selection */}
            <div className="col-span-1">
              <Label>Customer</Label>
              <div className="relative">
                <select
                  className={`h-11 w-full appearance-none rounded-lg border border-gray-300 px-4 py-2.5 pr-11 text-sm shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 ${
                    formData.customerId ? "text-gray-800 dark:text-white/90" : "text-gray-400 dark:text-gray-400"
                  }`}
                  name="customerId"
                  value={formData.customerId}
                  onChange={handleChange}
                >
                  <option value="" disabled>Select Customer</option>
                  {customers.map((customer) => (
                    <option key={customer.id} value={customer.id}>
                      {customer.name}
                    </option>
                  ))}
                </select>
                <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
                  <ChevronDownIcon />
                </span>
              </div>
            </div>
            
            {/* Project Manager */}
            <div className="col-span-1">
              <Label>Project Manager</Label>
              <div className="relative">
                <select
                  className={`h-11 w-full appearance-none rounded-lg border border-gray-300 px-4 py-2.5 pr-11 text-sm shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 ${
                    formData.managerId ? "text-gray-800 dark:text-white/90" : "text-gray-400 dark:text-gray-400"
                  }`}
                  name="managerId"
                  value={formData.managerId}
                  onChange={handleChange}
                >
                  <option value="" disabled>Select Manager</option>
                  {managers.map((manager) => (
                    <option key={manager.id} value={manager.id}>
                      {manager.name}
                    </option>
                  ))}
                </select>
                <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
                  <ChevronDownIcon />
                </span>
              </div>
            </div>
            
            {/* Status */}
            <div className="col-span-1">
              <Label>Status</Label>
              <div className="relative">
                <select
                  className={`h-11 w-full appearance-none rounded-lg border border-gray-300 px-4 py-2.5 pr-11 text-sm shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 ${
                    formData.status ? "text-gray-800 dark:text-white/90" : "text-gray-400 dark:text-gray-400"
                  }`}
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option value="" disabled>Select Status</option>
                  {statusOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
                  <ChevronDownIcon />
                </span>
              </div>
            </div>

            {/* Start Date */}
            <div className="col-span-1">
              <label htmlFor="start_date" className="bloc text-sm font-medium text-gray-700 mb-1 dark:text-white/90 flex flex-row items-center">
                <Calendar className="mr-1" size={16} />
                Start Date
              </label>
              <div className="relative w-full">
                <DatePicker
                  selected={formData.start_date ? new Date(formData.start_date) : null}
                  onChange={(date) => handleDateChange(date, 'start_date')}
                  className="h-11 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm shadow-theme-xs focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
                />
              </div>
            </div>
            
            {/* End Date */}
            <div className="col-span-1">
              <label htmlFor="end_date" className="bloc text-sm font-medium text-gray-700 mb-1 dark:text-white/90 flex flex-row items-center">
                <Calendar className="mr-1" size={16} />
                End Date
              </label>
              <div className="relative w-full">
                <DatePicker
                  selected={formData.end_date ? new Date(formData.end_date) : null}
                  onChange={(date) => handleDateChange(date, 'end_date')}
                  className="h-11 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm shadow-theme-xs focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
                />
              </div>
            </div>
            
            {/* Budget */}
            <div className="col-span-1">
              <Label>Budget</Label>
              <div className="relative">
                <input
                  type="number"
                  name="budget"
                  placeholder="0.00"
                  value={formData.budget || ''}
                  onChange={handleChange}
                  className="h-11 w-full pl-10 rounded-lg border border-gray-300 px-4 py-2.5 text-sm shadow-theme-xs focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
                />
                <span className="absolute text-gray-500 pointer-events-none left-3 top-1/2 -translate-y-1/2">
                  <DollarSign size={16} />
                </span>
              </div>
            </div>
          </div>
        </ComponentCard>

        <div>
          {/* Project Description Card */}
          <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
            <div className="px-6 py-5">
              <h3 className="text-base font-medium text-gray-800 dark:text-white/90">
                Project Description
              </h3>
            </div>
            <div className="p-6 border-t border-gray-100 dark:border-gray-800">
              <textarea
                name="description"
                rows={10}
                value={formData.description}
                onChange={handleChange}
                placeholder="Project Description"
                className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-6 flex items-center justify-center">
            <Button onClick={handleSave} disabled={loading} type="button">
              {loading ? "Updating Project..." : "Update Project"}
            </Button>
          </div>
        </div>
      </div>
     
    </div>
    </Modal>
  )
}