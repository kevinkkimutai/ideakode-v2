"use client";
import { PencilIcon, TrashBinIcon } from "@/icons";
import { useCreateSupportCategoryMutation, useDeleteSupportCategoryMutation, useGetAllSupportCategoriesMutation, useUpdateSupportCategoryMutation } from "@/redux/actions/supportCategoryActions";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useModal } from "@/hooks/useModal";
import ProjectCategoryModal from "../category/CategoryModal";
import DeleteModal from "../category/DeleteModal";
import { setSupportCategories } from "@/redux/reducers/SupportCategoryReducer";


export default function SupportCategory() {
  const dispatch = useDispatch();
  const [getSupportCategories] = useGetAllSupportCategoriesMutation();
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPCategories = async () => {
      try {
        setLoading(true);
        const response = await getSupportCategories();
        dispatch(setSupportCategories(response?.data));
        setCategories(response?.data);
        setFilteredCategories(response?.data);
      } catch (error) {
        toast.error("Failed to get support categories");
      } finally {
        setLoading(false);
      }
    };

    getPCategories();
  }, [dispatch]);

  useEffect(() => {
    if (searchTerm) {
      const filtered = categories.filter((category) =>
        category.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCategories(filtered);
    } else {
      setFilteredCategories(categories);
    }
  }, [searchTerm, categories]);



  const options = [
    { value: "1", label: "Active" },
    { value: "0", label: "Inactive" },
  ];

  const [editingCategory, setEditingCategory] = useState(null);
  const { isOpen, openModal, closeModal } = useModal();
  const [createCategory] = useCreateSupportCategoryMutation();
  const [updateCategory] = useUpdateSupportCategoryMutation();
  const [deleteCategory] = useDeleteSupportCategoryMutation();
  const [formdata, setFormdata] = useState({
    name: "",
    status: "",
    description: ""
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormdata((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  
  console.log("editingCategory", editingCategory);
  
  const handleSave = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (editingCategory) {
        response = await updateCategory({
          id: editingCategory,
          name: formdata.name,
          status: formdata.status,
          description: formdata.description
        });
        console.log("Update response:", response);

        if (response.data) {
          toast.success(response.data.message);
          setCategories((prev) =>
            prev.map((cat) =>
              cat.id === editingCategory ? response.data.category : cat
            )
          );
        }
      } else {
        response = await createCategory({
          name: formdata.name,
          status: formdata.status,
          description: formdata.description
        });
  
        if (response.data) {
          toast.success(response.data.message);
          setCategories((prev) => [...prev, response.data.category]);
        }
      }
  
      setFilteredCategories(categories);
      setEditingCategory(null);
      closeModal();
    } catch (error) {
      toast.error("An error occurred");
    }
  };
  const warningModal = useModal();
  const [selecetedDelete, setSelecetedDelete] = useState();
  const showWarning = (selected) => {
    warningModal.openModal();
    setSelecetedDelete(selected);
  };
  const closeWarning = () => {
    warningModal.closeModal();
  };

const handleDelete = async (categoryId) => {
  try {
    const response = await deleteCategory({ id: categoryId });
    if (response.data) {
      toast.success(response.data.message);
      setCategories((prev) => prev.filter((cat) => cat.id !== categoryId));
    }
    setSelecetedDelete(null);
    closeWarning();
  } catch (error) {
    toast.error("Failed to delete category");
  }
};

  
  
  const handleClose = () => {
    setEditingCategory(null);
    setFormdata({ name: "", status: "", description: "" });
    closeModal();
  };
  
  console.log("Warning Modal State:", warningModal.isOpen);

  
  
  return (
    <div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-2">
        {/* Top Section */}
        <div className="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 bg-white dark:bg-gray-900">
          <button onClick={openModal} className="inline-flex items-center font-medium justify-center text-sm gap-2 rounded-lg transition px-4 py-1.5 bg-brand-500 text-white shadow-theme-xs hover:bg-brand-600 disabled:bg-brand-300">
            + Add Support Category
          </button>

          {/* Search Input */}
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="text"
              className="block p-2 ps-10 w-80 rounded-lg border border-gray-600 appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-500 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
              placeholder="Search by Name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Table */}
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-brand-800 dark:text-gray-200">
            <tr>
              <th className="px-6 py-3">#</th>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3 max-md:hidden">Description</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {/* Skeleton Loader */}
            {loading
              ? Array.from({ length: 10 }).map((_, index) => (
                  <tr
                    key={index}
                    className="bg-white border-b dark:bg-white/[0.03] dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    <td className="px-6 py-4">
                      <div className="animate-pulse bg-gray-300 dark:bg-gray-700 h-4 w-6 rounded"></div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="animate-pulse bg-gray-300 dark:bg-gray-700 h-4 w-32 rounded"></div>
                    </td>
                    <td className="px-6 py-4 max-md:hidden">
                      <div className="animate-pulse bg-gray-300 dark:bg-gray-700 h-4 w-48 rounded"></div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="animate-pulse bg-gray-300 dark:bg-gray-700 h-4 w-12 rounded"></div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="animate-pulse bg-gray-300 dark:bg-gray-700 h-4 w-20 rounded"></div>
                    </td>
                  </tr>
                ))
              : filteredCategories?.map((category, index) => (
                  <tr
                    key={index}
                    className="bg-white border-b dark:bg-white/[0.03] dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    <td className="px-6 py-4">{index + 1} <span className="max-md:hidden">.</span></td>
                    <td className="px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                      <div className="text-base font-semibold">
                        {category?.name}
                      </div>
                    </td>
                    <td className="px-6 py-4 max-w-[250px] max-md:hidden">
                      <span className="line-clamp-1">
                        {category?.description}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div
                        className={`flex font-[500] items-center ${
                          category?.status === 1
                            ? "text-green-600"
                            : "text-red-500"
                        }`}
                      >
                        {category?.status === 1 ? "Active" : "Inactive"}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-4">
                      <button 
  className="font-medium text-blue-600 dark:text-blue-500 hover:text-green-500"
  onClick={() => {
    setFormdata({
      name: category.name,
      status: category.status ? "1" : "0",
      description: category.description,
    });
    setEditingCategory(category.id);
    openModal();
  }}
>
  <PencilIcon />
</button>

                        <button onClick={() => showWarning(category.id)}  className="font-medium text-red-600 dark:text-red-500 hover:underline">
                          <TrashBinIcon />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
     
     {/* modal */}
     <div>
     <ProjectCategoryModal
   isOpen={isOpen}
    onClose={handleClose}
    formdata={formdata}
    handleChange={handleChange} 
   handleSave={handleSave}
     heading="Support Category"
    options={options}
   />

   {/* warning modal */}
   <DeleteModal 
  isOpen={warningModal.isOpen} 
  onClose={warningModal.closeModal} 
  handleDelete={handleDelete}
  selected={selecetedDelete}
/>

     </div>
    </div>
  );
}
