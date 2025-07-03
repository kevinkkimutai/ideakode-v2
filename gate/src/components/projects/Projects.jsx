"use client";
import { PencilIcon, TrashBinIcon } from "@/icons";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useModal } from "@/hooks/useModal";
import DeleteModal from "../category/DeleteModal";
import { useDeleteProjectMutation, useGetAllProjectsMutation, useUpdateProjectMutation } from "@/redux/actions/projectActions";
import { setProjects } from "@/redux/reducers/projectReducers";
import ProjectModal from "./ProjectModal";
import { useGetAllProjectCategoriesMutation } from "@/redux/actions/projectCategoryActions";
import { setProjectCategories } from "@/redux/reducers/projectCategoryReducers";
import Link from "next/link";


export default function Projects() {
  const dispatch = useDispatch();
  const [getAllProjects] = useGetAllProjectsMutation();
  const [allProjects, setAllProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [getProjectCategories] = useGetAllProjectCategoriesMutation();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getPCategories = async () => {
      try {
        setLoading(true);
        const response = await getProjectCategories();
        
        if (response?.data) {
          dispatch(setProjectCategories(response.data));
          setCategories(response.data);
        } else {
          toast.error("Failed to get project categories");
        }
      } catch (error) {
        // toast.error("An error occurred while fetching project categories");
        console.error("Error fetching project categories:", error);
      } finally {
        setLoading(false);
      }
    };
  
    getPCategories();
  }, []);

  useEffect(() => {
    const getProjects = async () => {
      try {
        setLoading(true);
        const response = await getAllProjects();
        if (response.data) {
        dispatch(setProjects(response?.data));
        setAllProjects(response?.data);
        setFilteredProjects(response?.data);
        setLoading(false);
      } else if (response?.error) {
        // Correctly extracting the error message
        const errorMessage = response?.error?.data?.error || "Failed to fetch projects. Please try again.";
        toast.error(errorMessage);
        setLoading(false);
      }
      
    } catch (error) {
      toast.error("Failed to fetch projects", error);
      setLoading(false);
    }
    };

    getProjects();
  }, [dispatch]);

  useEffect(() => {
    if (searchTerm) {
      const filtered = allProjects.filter((project) =>
        project.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProjects(filtered);
    } else {
      setFilteredProjects(allProjects);
    }
  }, [searchTerm, allProjects]);


  const options = [
    { value: "1", label: "Active" },
    { value: "0", label: "Inactive" },
  ];

  const [editingProject, setEditingProject] = useState(null);
  const { isOpen, openModal, closeModal } = useModal();
  const [updateProject] = useUpdateProjectMutation();
  const [deleteProject] = useDeleteProjectMutation();
  const [formData, setFormData] = useState({
    id: editingProject,
    title: '',
    demolink: '',
    categoryId: '',
    status: '',
    description: '',
    image: null,
    imagePreview: '/images/carousel/carousel-02.png',
  })


  const handleChangeProject = (e) => {
    const { name, value, type, files } = e.target;

    if (type === 'file') {
      const file = files[0];
      if (file) {
        setFormData((prev) => ({
          ...prev,
          image: file,
          imagePreview: URL.createObjectURL(file),
        }));
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };
  
  
  const handleSave = async (e) => {
    e.preventDefault();
  
    const formDataToSend = new FormData();
    formDataToSend.append("id", editingProject);
    formDataToSend.append("title", formData.title);
    formDataToSend.append("demolink", formData.demolink);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("categoryId", formData.categoryId);
    formDataToSend.append("status", formData.status);
    formDataToSend.append("image", formData.image);
  
    try {
      const response = await updateProject(formDataToSend);
  
      if (response.data) {
        toast.success(response.data.message);
  
        // Update the state with the updated project
        setAllProjects((prev) =>
          prev.map((project) =>
            project.id === editingProject ? { ...project, ...formData } : project
          )
        );
  
        setFilteredProjects((prev) =>
          prev.map((project) =>
            project.id === editingProject ? { ...project, ...formData } : project
          )
        );
  
        dispatch(setProjects((prev) =>
          prev.map((project) =>
            project.id === editingProject ? { ...project, ...formData } : project
          )
        ));
  
        closeModal();
      }
    } catch (error) {
      toast.error("An error occurred while submitting the project.");
      closeModal();
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
      const response = await deleteProject({id: categoryId});
      if (response.data) {
        toast.success(response.data.message);
        setProjects((prev) => prev.filter((cat) => cat.id !== categoryId));
        setFilteredProjects((prev) => prev.filter((cat) => cat.id !== categoryId));
      }
      setSelecetedDelete(null);
      closeWarning();
    } catch (error) {
      toast.error("Failed to delete project");
    }
  };
  
  
  const handleClose = () => {
    setEditingProject(null);
    setFormData({ 
      id: "",
      title: "",
      demolink: "",
      categoryId: "",
      status: "",
      description: "",
      image: null,
     });
    closeModal();
  };

  
  return (
    <div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-2">
        {/* Top Section */}
        <div className="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 bg-white dark:bg-gray-900">
          <Link href="/add-project" className="inline-flex items-center font-medium justify-center text-sm gap-2 rounded-lg transition px-4 py-1.5 bg-brand-500 text-white shadow-theme-xs hover:bg-brand-600 disabled:bg-brand-300">
            + Add Project
          </Link>

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
              : filteredProjects?.map((project, index) => (
                  <tr
                    key={index}
                    className="bg-white border-b dark:bg-white/[0.03] dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    <td className="px-6 py-4">{index + 1} <span className="max-md:hidden">.</span></td>
                    <td className="px-6 py-4 flex items-center text-gray-900 whitespace-nowrap dark:text-white">
                    <img className="w-10 h-10 rounded-full" src={project?.image} alt="Jese image"/>
                    <div className="ps-3">
                        <div className="text-normal font-semibold">{project?.title}</div>
                   
                    </div>
                    </td>
                    <td className="px-6 py-4 max-w-[250px] max-md:hidden">
                      <span className="line-clamp-1">
                        {project?.description}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div
                        className={`flex font-[500] items-center ${
                          project?.status === "1"
                            ? "text-green-600"
                            : "text-red-500"
                        }`}
                      >
                        {project?.status === "1" ? "Active" : "Inactive"}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-4">
                      <button 
  className="font-medium text-blue-600 dark:text-blue-500 hover:text-green-500"
  onClick={() => {
    setFormData({
      title: project.title,
      status: project?.status ? "1" : "0",
      description: project.description,
      imagePreview: project.image || '/images/carousel/carousel-02.png',
      demolink: project.demolink,
      categoryId: project.categoryId,
    });
    setEditingProject(project?.id);
    openModal();
  }}
>
  <PencilIcon />
</button>

                        <button onClick={() => showWarning(project?.id)}  className="font-medium text-red-600 dark:text-red-500 hover:underline">
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
     <ProjectModal
   isOpen={isOpen}
    onClose={handleClose}
    formData={formData}
    categories={categories}
    handleChange={handleChangeProject} 
   handleSave={handleSave}
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
