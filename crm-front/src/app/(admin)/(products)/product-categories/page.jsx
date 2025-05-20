"use client";
import { PencilIcon, TrashBinIcon } from "@/icons";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "@/hooks/useModal";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import { useRouter } from "next/navigation";
import Notification from "@/components/ui/alert/Notification";
import DeleteModal from "@/components/category/DeleteModal";
import { setProductCategories } from "@/redux/reducers/productCategoryReducers";
import { useDeleteProductCategoryMutation, useGetAllProductCategoriesMutation } from "@/redux/actions/productCategoryActions";
import ProjectCategoryModal from "@/components/category/CategoryModal";


export default function Products() {
  const dispatch = useDispatch();
  const [getAllCategories] = useGetAllProductCategoriesMutation();
  const [allCategories, setAllCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [mode, setMode] = useState("create");
  const [selectedCategoryData, setSelectedCategoryData] = useState(null);

  useEffect(() => {
    const getCategories = async () => {
      try {
        setLoading(true);
        const response = await getAllCategories();
        if (response.data) {
          dispatch(setProductCategories(response?.data));
          setAllCategories(response?.data);
          setFilteredCategories(response?.data);
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

  useEffect(() => {
    if (searchTerm) {
      const filtered = allCategories.filter((category) =>
        category.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCategories(filtered);
    } else {
      setFilteredCategories(allCategories);
    }
  }, [searchTerm, allCategories]);

  const { closeModal } = useModal();
  const [deleteCategory] = useDeleteProductCategoryMutation();

  const warningModal = useModal();
  const [selecetedDelete, setSelecetedDelete] = useState();
  const [addModal, setAddModal] = useState(false);
  const [alertData, setAlertData] = useState(null);
  
  const showWarning = (selected) => {
    warningModal.openModal();
    setSelecetedDelete(selected);
  };
  
  const closeWarning = () => {
    warningModal.closeModal();
  };

  const handleDelete = async (categoryId) => {
    try {
      const response = await deleteCategory(categoryId);
      if (response.data) {
        // Update local state to remove the deleted category
        const updatedCategories = allCategories.filter(cat => cat.id !== categoryId);
        setAllCategories(updatedCategories);
        setFilteredCategories(searchTerm ? 
          updatedCategories.filter(category => 
            category.name.toLowerCase().includes(searchTerm.toLowerCase())
          ) : 
          updatedCategories
        );
        
        // Update Redux store
        dispatch(setProductCategories(updatedCategories));
        
        setAlertData({
          show: true,
          variant: "success",
          title: "Success!",
          message: "Category deleted successfully.",
        });
      }
      setSelecetedDelete(null);
      closeWarning();
    } catch (error) {
      setAlertData({
        show: true,
        variant: "error",
        title: "Error!",
        message: "Failed to delete category.",
      });
    }
  };

  const handleAddCategory = () => {
    setMode("create");
    setSelectedCategoryData(null);
    setAddModal(true);
  };

  const handleEditCategory = (categoryId) => {
    // Find the category object by ID
    const categoryToEdit = allCategories.find(category => category.id === categoryId);
    
    if (categoryToEdit) {
      setMode("update");
      setSelectedCategoryData({...categoryToEdit}); // Create a copy of the category object
      setAddModal(true);
    } else {
      setAlertData({
        show: true,
        variant: "error",
        title: "Error!",
        message: "Category not found.",
      });
    }
  };

  const handleCloseAddCategoryModal = () => {
    setAddModal(false);
    // Reset selected category after modal closes
    setTimeout(() => {
      setSelectedCategoryData(null);
    }, 300); // Small delay to prevent visual glitches
  };

  // Handle successful category operations (create/update)
  const handleCategoryChange = (updatedCategory, operation) => {
    let updatedCategories;
    
    if (operation === "create") {
      // Add the new category to the list
      updatedCategories = [...allCategories, updatedCategory];
    } else if (operation === "update") {
      // Update the category in the list
      updatedCategories = allCategories.map(cat => 
        cat.id === updatedCategory.id ? updatedCategory : cat
      );
    }
    
    // Update all relevant states
    setAllCategories(updatedCategories);
    setFilteredCategories(searchTerm ? 
      updatedCategories.filter(category => 
        category.name.toLowerCase().includes(searchTerm.toLowerCase())
      ) : 
      updatedCategories
    );
    
    // Update the Redux store
    dispatch(setProductCategories(updatedCategories));
    
    // Close modal
    setAddModal(false);
  };

  return (
    <div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-2">
        {/* Top Section */}
        <div className="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 bg-white dark:bg-gray-900">
          <button onClick={handleAddCategory} className="inline-flex items-center font-medium justify-center text-sm gap-2 rounded-lg transition px-4 py-1.5 bg-green-800 text-white shadow-theme-xs hover:bg-green-900 disabled:bg-green-300">
            + Add Category
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
              className="block p-2 ps-10 w-80 rounded-lg border border-gray-600 appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-500 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-green-800"
              placeholder="Search by Name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Table */}
        <Table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <TableHeader className="text-xs text-gray-700 uppercase bg-green-200 dark:bg-green-800 dark:text-gray-200">
            <TableRow>
              <TableCell isHeader className="px-6 py-3">#</TableCell>
              <TableCell isHeader className="px-6 py-3">Name</TableCell>
              <TableCell isHeader className="px-6 py-3 max-md:hidden">Description</TableCell>
              <TableCell isHeader className="px-6 py-3">Status</TableCell>
              <TableCell isHeader className="px-6 py-3">Action</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading
              ? Array.from({ length: 10 }).map((_, index) => (
                <TableRow 
                  key={index} 
                  className="bg-white border-b dark:bg-white/[0.03] dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  {[1, 2, 3, 4, 5].map((cellIndex) => (
                    <TableCell key={cellIndex} className="px-6 py-4">
                      <div className="animate-pulse bg-gray-300 dark:bg-gray-700 h-4 w-full rounded"></div>
                    </TableCell>
                  ))}
                </TableRow>
              ))
              : filteredCategories?.map((category, index) => (
                <TableRow
                  key={category.id}
                  className="bg-white border-b dark:bg-white/[0.03] dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  <TableCell className="px-6 py-4">{index + 1}.</TableCell>
                  <TableCell className="px-6 py-4 flex items-center text-gray-900 whitespace-nowrap dark:text-white">
                    <div className="text-md font-semibold">{category?.name}</div>
                  </TableCell>
                  <TableCell className="px-6 py-4 max-w-[250px] max-md:hidden">
                    <span className="line-clamp-1">{category?.description}</span>
                  </TableCell>
                  <TableCell className="px-6 py-4">
                    <div
                      className={`flex font-[500] items-center ${category?.status === true ? "text-green-500" : ""}`}
                    >
                      {category?.status ? "Active" : "Inactive"}
                    </div>
                  </TableCell>
                  <TableCell className="px-6 py-4">
                    <div className="flex gap-4">
                      <button 
                        className="font-medium text-blue-600 dark:text-blue-500 hover:text-green-500"
                        onClick={() => handleEditCategory(category?.id)}
                      >
                        <PencilIcon />
                      </button>
                      <button 
                        onClick={() => showWarning(category?.id)} 
                        className="font-medium text-red-600 dark:text-red-500 hover:underline"
                      >
                        <TrashBinIcon />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
     
      {/* Modals */}
      <div>
        <ProjectCategoryModal
          isOpen={addModal}
          heading={mode === "create" ? "Add Category" : "Edit Category"}
          setAlertData={setAlertData}
          onClose={handleCloseAddCategoryModal}
          initialData={selectedCategoryData}
          mode={mode}
          onSuccess={handleCategoryChange}
        />

        {/* Warning modal */}
        <DeleteModal
          isOpen={warningModal.isOpen} 
          onClose={closeWarning} 
          handleDelete={handleDelete}
          selected={selecetedDelete}
        />
        
        {alertData?.show && (
          <Notification
            alertData={alertData} 
            onClose={() => setAlertData(null)}
          />
        )}
      </div>
    </div>
  );
}