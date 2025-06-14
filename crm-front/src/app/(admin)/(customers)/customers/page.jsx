"use client";
import { PencilIcon, TrashBinIcon } from "@/icons";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useModal } from "@/hooks/useModal"
import Link from "next/link";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import { useRouter } from "next/navigation";
import Notification from "@/components/ui/alert/Notification";
import DeleteModal from "@/components/category/DeleteModal";
import { useDeleteCustomerMutation, useGetAllCustomersMutation } from "@/redux/actions/customerActions";
import CustomerModal from "@/components/customers/AddCustomerModal";
import { setCustomers } from "@/redux/reducers/customerReducers";


export default function page() {
  const dispatch = useDispatch();
  const [getCustomers] = useGetAllCustomersMutation();
  const [customerz, setCustomerz] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [addModal, setAddModal] = useState(false);


  useEffect(() => {
    const getAllCustomers = async () => {
      try {
        setLoading(true);
        const response = await getCustomers();
        if (response.data) {
        dispatch(setCustomers(response?.data.customers));
        setCustomerz(response?.data.customers);
        setFilteredCustomers(response?.data.customers);
        setLoading(false);
      } else if (response?.error) {
        // Correctly extracting the error message
        const errorMessage = response?.error?.data?.error || "Failed to fetch customers. Please try again.";
        setAlertData({
          show: true,
          variant: "success",
          title: "Success!",
          message: errorMessage
        });
        setLoading(false);
      }
      
    } catch (error) {
      setAlertData({
        show: true,
        variant: "error",
        title: "Error!",
        message:"Failed to fetch customer.",
      });
      setLoading(false);
    }
    };

    getAllCustomers();
  }, [dispatch]);

  useEffect(() => {
    if (searchTerm) {
      const filtered = customerz.filter((customer) =>
        customer.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCustomers(filtered);
    } else {
      setFilteredCustomers(customerz);
    }
  }, [searchTerm, customerz]);


  const { closeModal } = useModal();
  const [deleteCustomer] = useDeleteCustomerMutation();

  const warningModal = useModal();
  const [selecetedDelete, setSelecetedDelete] = useState();
  const [alertData, setAlertData] = useState(null);
  const showWarning = (selected) => {
    warningModal.openModal();
    setSelecetedDelete(selected);
  };
  const closeWarning = () => {
    warningModal.closeModal();
  };


  const handleDelete = async (customerId) => {
    try {
      const response = await deleteCustomer({id: customerId});
      if (response.data) {
        setAlertData({
          show: true,
          variant: "success",
          title: "Success!",
          message: "Customer deleted successfully.",
        });
        setCustomerz((prev) => prev.filter((cat) => cat.id !== customerId));
        setFilteredCustomers((prev) => prev.filter((cat) => cat.id !== customerId));
      }
      setSelecetedDelete(null);
      closeWarning();
 
    } catch (error) {
      setAlertData({
        show: true,
        variant: "error",
        title: "Error!",
        message:"Failed to delete customer.",
      });
    }
  };

  const hadleViewCustomer = (id) => {
    router.push(`/customer/${id}`);
  }
  

  const variantClasses = {
    in_progress: {
      container:
        "text-blue-500",
    },
    Completed: {
      container:
        "text-green-600",
    },
    on_hold: {
      container:
        "text-warning-500",
    },
    pending: {
      container:
        "text-yellow-500",
    },
  };

  const handleAddCustomer = () => {
    setAddModal(true);
  };



  const handleCloseAddCustomerModal = () => {
    setAddModal(false);
  };

  // Handle successful category operations (create/update)
  const handleCustomerChange = (updatedCustomer) => {
    const updatedCustomers = [...customerz, updatedCustomer];
  
    setCustomerz(updatedCustomers);
    setFilteredCustomers(searchTerm
      ? updatedCustomers.filter(cust =>
          cust.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : updatedCustomers
    );
  
    dispatch(setCustomers(updatedCustomers));
    setAddModal(false);
  };
  

  const handleModla = () => {
    setAddModal(true)
  }


  return (
    <div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-2">
        {/* Top Section */}
        <div className="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 bg-white dark:bg-gray-900">
          <button onClick={handleModla} className="inline-flex items-center font-medium justify-center text-sm gap-2 rounded-lg transition px-4 py-1.5 bg-green-800 text-white shadow-theme-xs hover:bg-green-900 disabled:bg-green-300">
            + Add Customer
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
        <TableCell isHeader className="px-6 py-3 max-md:hidden">Start_Date</TableCell>
        <TableCell isHeader className="px-6 py-3 max-md:hidden">End_Date</TableCell>
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
              {[1,2,3,4,5,6].map((cellIndex) => (
                <TableCell key={cellIndex} className="px-6 py-4">
                  <div className="animate-pulse bg-gray-300 dark:bg-gray-700 h-4 w-full rounded"></div>
                </TableCell>
              ))}
            </TableRow>
          ))
          : filteredCustomers?.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-6 text-gray-500 dark:text-gray-400">
                No customers found.
              </TableCell>
            </TableRow>
          ) : (
            filteredCustomers?.map((customer, index) => (        
            <TableRow
              key={customer.id}
              className="bg-white border-b dark:bg-white/[0.03] dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              <TableCell className="px-6 py-4">{index + 1}.</TableCell>
              <TableCell className="px-6 py-4 flex items-center text-gray-900 whitespace-nowrap dark:text-white">
              <div className="text-md font-semibold">{customer?.name}</div>
              </TableCell>
              <TableCell className="px-6 py-4 max-w-[250px] max-md:hidden">
                <span className="line-clamp-1">{customer?.start_date}</span>
              </TableCell>
              <TableCell className="px-6 py-4 max-w-[250px] max-md:hidden">
                <span className="line-clamp-1">{customer?.end_date}</span>
              </TableCell>
              <TableCell className="px-6 py-4">
                <div
                  className={`flex font-[500] items-center ${variantClasses[customer?.status]?.container}`}
                >
                  {customer?.status}
                </div>
              </TableCell>
              <TableCell className="px-6 py-4">
                <div className="flex gap-4">
                  <button 
                    className="font-medium text-blue-600 dark:text-blue-500 hover:text-green-500"
                    onClick={() => {
                      hadleViewCustomer(customer?.id);
                    }}
                  >
                    <PencilIcon />
                  </button>
                  <button 
                   onClick={() => showWarning(customer?.id)} 
                    className="font-medium text-red-600 dark:text-red-500 hover:underline"
                  >
                    <TrashBinIcon />
                  </button>
                </div>
              </TableCell>
            </TableRow>
          )))}
    </TableBody>
  </Table>



      </div>
     
     {/* modal */}
     <div>

     <CustomerModal
          isOpen={addModal}
          heading="Add Category"
          setAlertData={setAlertData}
          onClose={handleCloseAddCustomerModal}
          onSuccess={handleCustomerChange}
        />

   {/* warning modal */}
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
