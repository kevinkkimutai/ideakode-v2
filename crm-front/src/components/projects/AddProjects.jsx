'use client'
import { useState, useEffect } from 'react';
import { Calendar, CheckCircle, ChevronDownIcon, DollarSign, Info } from 'lucide-react';
import { useCreateProjectMutation } from '@/redux/actions/projectActions';
import ComponentCard from '../common/ComponentCard';
import Label from '../form/Label';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Button from '../ui/button/Button';
import { toast } from 'react-toastify';
import Alert from '../ui/alert/Alert';
import Notification from '../ui/alert/Notification';
import { useRouter } from 'next/navigation';

export default function AddProjectForm() {
  const [createProject] = useCreateProjectMutation();
  const [formData, setFormData] = useState({
    customerId: '',
    name: '',
    description: '',
    status: 'planning',
    start_date: '',
    end_date: '',
    budget: '',
    managerId: ''
  });
  
  const [customers, setCustomers] = useState([]);
  const [managers, setManagers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [alertData, setAlertData] = useState(null);
  
  const router = useRouter();

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

    const formatDate = (dateString) => {
      if (!dateString) return '';
      const date = new Date(dateString);
      return date.toISOString().split('T')[0];
    };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      // Here you would make an API call to your backend
      const response = await createProject({
        customerId: formData.customerId,
        name: formData.name,
        description: formData.description,
        status: formData.status,
        start_date: formData.start_date,
        end_date: formData.end_date,
        budget: formData.budget,
        managerId: formData.managerId,
      });
      
      if (response.data.message === "Project created successfully") {
        // router.push('/projects')
        setAlertData({
          show: true,
          variant: "success",
          title: "Success!",
          message: "Project created successfully.",
        });
        setFormData(
          {
            customerId: '',
            name: '',
            description: '',
            status: '',
            start_date: '',
            end_date: '',
            budget: '',
            managerId: ''
          }
        )
      }

    
    } catch (err) {
      setAlertData({
        show: true,
        variant: "error",
        title: "Error!",
        message: err.message || "An error occurred.",
      });
    } finally {
      setLoading(false);
    }
  };

  const statusOptions = ['planning', 'in_Progress', 'on_hold', 'completed', 'cancelled'];

  return (
    <div>
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <ComponentCard title="Create New Project">
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
              <label htmlFor="end_date" className="bloc text-sm font-medium  text-gray-700 mb-1 dark:text-white/90 flex flex-row items-center">
                <Calendar className="mr-1" size={16} />
                Start Date
              </label>
              <div className="relative w-full">
                <DatePicker
                  selected={formData.start_date ? new Date(formData.start_date) : null}
                  onChange={(date) => handleDateChange(date, 'start_date')}
                  className="h-11 w-[290px] rounded-lg border border-gray-300 px-4 py-2.5 text-sm shadow-theme-xs focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
                />
              </div>
            </div>
            
            {/* End Date */}
            <div className="col-span-1">
              <label htmlFor="end_date" className="bloc text-sm font-medium  text-gray-700 mb-1 dark:text-white/90 flex flex-row items-center">
                <Calendar className="mr-1" size={16} />
                End Date
              </label>
              <div className="relative">
                <DatePicker
                  selected={formData.end_date ? new Date(formData.end_date) : null}
                  onChange={(date) => handleDateChange(date, 'end_date')}
                  className="h-11 w-[290px] rounded-lg border border-gray-300 px-4 py-2.5 text-sm shadow-theme-xs focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
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
                rows={14}
                value={formData.description}
                onChange={handleChange}
                placeholder="Project Description"
                className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-6 flex items-center justify-center">
            <Button onClick={handleSubmit} disabled={loading} type="button">
              {loading ? "Creating Project..." : "Create Project"}
            </Button>
          </div>
        </div>
      </div>
      {alertData?.show && (
<Notification 
alertData={alertData} 
onClose={() => setAlertData(null)}
/>
)}

    </div>
  );
}