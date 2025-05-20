'use client'
import { useState, useEffect } from 'react';
import { Calendar, CheckCircle, ChevronDownIcon, DollarSign, Info, Link, Image as ImageIcon, GitBranch } from 'lucide-react';
import { useCreateProductMutation } from '@/redux/actions/productActions';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useRouter } from 'next/navigation';
import ComponentCard from '@/components/common/ComponentCard';
import Label from '@/components/form/Label';
import Button from '@/components/ui/button/Button';
import Notification from '@/components/ui/alert/Notification';
import PageBreadcrumb from '@/components/common/PageBreadCrumb';
import { useGetAllProductCategoriesMutation } from '@/redux/actions/productCategoryActions';
import { useDispatch } from 'react-redux';
import { setProductCategories } from '@/redux/reducers/productCategoryReducers';

export default function AddProductForm() {
  const [createProduct] = useCreateProductMutation();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    categoryId: "",
    subCategoryId: "",
    image: null,
    start_date: "",
    end_date: "",
    stagging_link: "",
    live_link: "",
    price: "",
    status: "",
    repo_link: "",
    is_active: false,
    managerId: "",
  });
  
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [managers, setManagers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [alertData, setAlertData] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const dispatch = useDispatch();
  const router = useRouter();
  const [getAllCategories] = useGetAllProductCategoriesMutation();

  useEffect(() => {
    const getCategories = async () => {
      try {
        setLoading(true);
        const response = await getAllCategories();
        if (response.data) {
          dispatch(setProductCategories(response?.data));
          setCategory(response?.data);
          setLoading(false);
        } else if (response?.error) {
          // Correctly extracting the error message
          const errorMessage = response?.error?.data?.error || "Failed to fetch Categories. Please try again. 🥶";
          setAlertData({
            show: true,
            variant: "error",
            title: "Error!",
            message: errorMessage,
          });
          setLoading(false);
        }
      } catch (error) {
        setAlertData({
          show: true,
          variant: "error",
          title: "Error!",
          message: "Failed to fetch categories.",
        });
        setLoading(false);
      }
    };

    getCategories();
  }, [dispatch, getAllCategories]);
  // Fetch category and managers on component mount
  useEffect(() => {
    // Mock data for the example
    // setCategory([
    //   { id: 1, name: 'Web Development' },
    //   { id: 2, name: 'Mobile Apps' },
    //   { id: 3, name: 'E-commerce Solutions' }
    // ]);

    setSubCategory([
      { id: 1, name: 'Frontend Development' },
      { id: 2, name: 'Backend Development' },
      { id: 3, name: 'Full Stack' },
    ]);

    setManagers([
      { id: 1, name: 'John Doe' },
      { id: 2, name: 'Jane Smith' },
      { id: 3, name: 'Mike Johnson' }
    ]);
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        image: file
      }));

      // Create preview for the image
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Specific handler for date fields
  const handleDateChange = (date, field) => {
    setFormData(prev => ({
      ...prev,
      [field]: date ? date.toISOString().split('T')[0] : ''
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      // Create FormData object for file upload
      const productData = new FormData();
      
      // Append all form fields to FormData
      Object.keys(formData).forEach(key => {
        if (key === 'image' && formData[key]) {
          productData.append('image', formData[key]);
        } else if (formData[key] !== null && formData[key] !== undefined) {
          productData.append(key, formData[key]);
        }
      });
      
      // Make API call to create product
      const response = await createProduct(productData);
      
      if (response.data && response.data.message === "Product created successfully 🎉") {
        setAlertData({
          show: true,
          variant: "success",
          title: "Success!",
          message: "Product created successfully 🎉",
        });
        
        // Reset form
        setFormData({
          name: "",
          description: "",
          categoryId: "",
          subCategoryId: "",
          image: null,
          start_date: "",
          end_date: "",
          stagging_link: "",
          live_link: "",
          price: "",
          status: "",
          repo_link: "",
          is_active: false,
          managerId: "",
        });
        setImagePreview(null);
        
        // Optional: redirect to products page
        // router.push('/products');
      }
    } catch (err) {
      setAlertData({
        show: true,
        variant: "error",
        title: "Error!",
        message: err.message || "An error occurred while creating the product.",
      });
    } finally {
      setLoading(false);
    }
  };

  const statusOptions = ['planning', 'in_progress', 'on-hold', 'completed', 'cancelled'];

  return (
    <div>
       <PageBreadcrumb pageTitle="Add Product" />
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <ComponentCard title="Create New Product">
          {/* Product Name */}
          <div className="col-spa-1 mb-5">
            <Label>Product Name</Label>
         <div className='flex max-md:flex-col gap-6 justify-cente'>
         <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter Product name"
              className="h-11 md:w-[70%] rounded-lg border border-gray-300 px-4 py-2.5 text-sm shadow-theme-xs focus:border-green-300 focus:outline-none focus:ring-3 focus:ring-green-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
            />


            {/* Is Active */}
            <div className="flex flex-1 max-md:py-3 w-[50%] items-center justify-center rounded-lg border border-gray-300 px-4 shadow-theme-xs focus:border-green-300 focus:outline-none focus:ring-3 focus:ring-green-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90">
                
                <input
                  type="checkbox"
                  id="is_active"
                  name="is_active"
                  checked={formData.is_active}
                  onChange={handleChange}
                  className="h-5 w-5 rounded border-gray-300 text-green-600 focus:ring-green-500"
                />
                <label htmlFor="is_active" className="ml-4 block text-sm text-gray-700 dark:text-white/90">
                  Is Active
                </label>
              </div>
         </div>
          </div>
          
          <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
            {/* Category Selection */}
            <div className="col-span-1">
              <Label>Category</Label>
              <div className="relative">
                <select
                  className={`h-11 w-full appearance-none rounded-lg border border-gray-300 px-4 py-2.5 pr-11 text-sm shadow-theme-xs placeholder:text-gray-400 focus:border-green-300 focus:outline-hidden focus:ring-3 focus:ring-green-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-green-800 ${
                    formData.categoryId ? "text-gray-800 dark:text-white/90" : "text-gray-400 dark:text-gray-400"
                  }`}
                  name="categoryId"
                  value={formData.categoryId}
                  onChange={handleChange}
                >
                  <option value="" disabled>Select Category</option>
                  {category.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
                <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
                  <ChevronDownIcon />
                </span>
              </div>
            </div>
            
            {/* Sub Category */}
            <div className="col-span-1">
              <Label>Sub Category</Label>
              <div className="relative">
                <select
                  className={`h-11 w-full appearance-none rounded-lg border border-gray-300 px-4 py-2.5 pr-11 text-sm shadow-theme-xs placeholder:text-gray-400 focus:border-green-300 focus:outline-hidden focus:ring-3 focus:ring-green-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-green-800 ${
                    formData.subCategoryId ? "text-gray-800 dark:text-white/90" : "text-gray-400 dark:text-gray-400"
                  }`}
                  name="subCategoryId"
                  value={formData.subCategoryId}
                  onChange={handleChange}
                >
                  <option value="" disabled>Select Sub Category</option>
                  {subCategory.map((subCat) => (
                    <option key={subCat.id} value={subCat.id}>
                      {subCat.name}
                    </option>
                  ))}
                </select>
                <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
                  <ChevronDownIcon />
                </span>
              </div>
            </div>
            
            {/* Product Manager */}
            <div className="col-span-1">
              <Label>Product Manager</Label>
              <div className="relative">
                <select
                  className={`h-11 w-full appearance-none rounded-lg border border-gray-300 px-4 py-2.5 pr-11 text-sm shadow-theme-xs placeholder:text-gray-400 focus:border-green-300 focus:outline-hidden focus:ring-3 focus:ring-green-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-green-800 ${
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
                  className={`h-11 w-full appearance-none rounded-lg border border-gray-300 px-4 py-2.5 pr-11 text-sm shadow-theme-xs placeholder:text-gray-400 focus:border-green-300 focus:outline-hidden focus:ring-3 focus:ring-green-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-green-800 ${
                    formData.status ? "text-gray-800 dark:text-white/90" : "text-gray-400 dark:text-gray-400"
                  }`}
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option value="" disabled>Select Status</option>
                  {statusOptions.map((option) => (
                    <option key={option} value={option}>
                      {option.charAt(0).toUpperCase() + option.slice(1).replace('_', ' ')}
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
              <label htmlFor="start_date" className="blo text-sm font-medium text-gray-700 mb-1 dark:text-white/90 flex flex-row items-center">
                <Calendar className="mr-1" size={16} />
                Start Date
              </label>
              <div className="relative w-full">
                <DatePicker
                  selected={formData.start_date ? new Date(formData.start_date) : null}
                  onChange={(date) => handleDateChange(date, 'start_date')}
                  className="h-11 w-full  md:w-[290px] rounded-lg border border-gray-300 px-4 py-2.5 text-sm shadow-theme-xs focus:border-green-300 focus:outline-hidden focus:ring-3 focus:ring-green-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
                  placeholderText="Select start date"
                />
              </div>
            </div>
            
            {/* End Date */}
            <div className="col-span-1 ">
              <label htmlFor="end_date" className="bloc text-sm font-medium text-gray-700 mb-1 dark:text-white/90 flex flex-row items-center">
                <Calendar className="mr-1" size={16} />
                End Date
              </label>
              <div className="relative">
                <DatePicker
                  selected={formData.end_date ? new Date(formData.end_date) : null}
                  onChange={(date) => handleDateChange(date, 'end_date')}
                  className="h-11 w-full md:w-[290px] rounded-lg border border-gray-300 px-4 py-2.5 text-sm shadow-theme-xs focus:border-green-300 focus:outline-hidden focus:ring-3 focus:ring-green-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
                  placeholderText="Select end date"
                />
              </div>

            </div>
 
            
            {/* Price */}
            <div className="col-span-1">
              <Label>Price</Label>
              <div className="relative">
                <input
                  type="number"
                  name="price"
                  placeholder="0.00"
                  value={formData.price || ''}
                  onChange={handleChange}
                  className="h-11 w-full pl-12 rounded-lg border border-gray-300 px-4 py-2.5 text-sm shadow-theme-xs focus:border-green-300 focus:outline-hidden focus:ring-3 focus:ring-green-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
                />
                <span className="absolute text-gray-500 pointer-events-none left-3 top-1/2 -translate-y-1/2">
                 ksh:
                </span>
              </div>
            </div>

            {/* Staging Link */}
            <div className="col-span-1">
              <Label>Staging Link</Label>
              <div className="relative">
                <input
                  type="text"
                  name="stagging_link"
                  placeholder="https://staging.example.com"
                  value={formData.stagging_link || ''}
                  onChange={handleChange}
                  className="h-11 w-full pl-10 rounded-lg border border-gray-300 px-4 py-2.5 text-sm shadow-theme-xs focus:border-green-300 focus:outline-hidden focus:ring-3 focus:ring-green-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
                />
                <span className="absolute text-gray-500 pointer-events-none left-3 top-1/2 -translate-y-1/2">
                  <Link size={16} />
                </span>
              </div>
            </div>

            {/* Live Link */}
            <div className="col-span-1">
              <Label>Live Link</Label>
              <div className="relative">
                <input
                  type="text"
                  name="live_link"
                  placeholder="https://example.com"
                  value={formData.live_link || ''}
                  onChange={handleChange}
                  className="h-11 w-full pl-10 rounded-lg border border-gray-300 px-4 py-2.5 text-sm shadow-theme-xs focus:border-green-300 focus:outline-hidden focus:ring-3 focus:ring-green-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
                />
                <span className="absolute text-gray-500 pointer-events-none left-3 top-1/2 -translate-y-1/2">
                  <Link size={16} />
                </span>
              </div>
            </div>

            {/* Repository Link */}
            <div className="col-span-1">
              <Label>Repository Link</Label>
              <div className="relative">
                <input
                  type="text"
                  name="repo_link"
                  placeholder="https://github.com/username/repo"
                  value={formData.repo_link || ''}
                  onChange={handleChange}
                  className="h-11 w-full pl-10 rounded-lg border border-gray-300 px-4 py-2.5 text-sm shadow-theme-xs focus:border-green-300 focus:outline-hidden focus:ring-3 focus:ring-green-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
                />
                <span className="absolute text-gray-500 pointer-events-none left-3 top-1/2 -translate-y-1/2">
                  <GitBranch size={16} />
                </span>
              </div>
            </div>


       
          </div>
        </ComponentCard>

        <div>
          {/* Product Description Card */}
          <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
            <div className="px-6 py-6 lg:py-3.5 border-b border-gray-100 dark:border-gray-800 w-full flex items-center justify-between">
              <h3 className="text-base font-medium text-gray-800 dark:text-white/90">
                Product Description
              </h3>
                  {/* Submit Button */}
          <div className="mt- flex items-center justify-center max-lg:hidden">
            <Button onClick={handleSubmit} disabled={loading} type="button" size="sm" variant="secondary">
              {loading ? "Creating Product..." : "Create Product"}
            </Button>
          </div>
            </div>

                 {/* Image Upload */}
                 <div className="col-span- px-6 py-6">
              <Label>Product Image (optional)</Label>
              <div className="mt-1 flex items-center relative w-full ">
                <label className="relative cursor-pointer flex items-center justify-center h-64 md:h-64 w-full rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600">
                  {imagePreview ? (
                    <img 
                      src={imagePreview} 
                      alt="Preview" 
                      className="h-full w-full object-contain rounded-lg"
                    />
                  ) : (
                    <div className="space-y-1 text-center">
                      <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="text-xs text-gray-500">Upload</div>
                    </div>
                  )}
                  <input
                    type="file"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    name="image"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </label>
                {imagePreview && (
                  <button
                    type="button"
                    className="ml-4 text-sm md:text-lg text-red-500 hover:text-red-700 absolute mx-auto w-full"
                    onClick={() => {
                      setFormData(prev => ({ ...prev, image: null }));
                      setImagePreview(null);
                    }}
                  >
                  <span className='px-2 bg-red-100 rounded-lg py-1 items-center justify-center'>Remove</span>
                  </button>
                )}
              </div>
            </div>
            
            <div className="p-6 border-t border-gray-100 dark:border-gray-800">
            <Label>Product Description</Label>
              <textarea
                name="description"
                rows={8}
                value={formData.description}
                onChange={handleChange}
                placeholder="Product Description"
                className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
              />
            </div>
          </div>

             {/* Submit Button */}
             <div className="mt-6 lg:hidden flex items-center justify-center">
            <Button onClick={handleSubmit} disabled={loading} type="button" variant="secondary">
              {loading ? "Creating Product..." : "Create Product"}
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