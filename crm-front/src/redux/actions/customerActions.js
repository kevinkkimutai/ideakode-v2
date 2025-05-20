import { apiSlice } from "../../services/api";

export const customerApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    createCustomer: builder.mutation({
      query: (formData) => ({
        url: "/customer",
        method: "POST",
        body: formData, 
      }),
    }),
    

    getAllCustomers: builder.mutation({
        query: () => ({
          url: "/customers",
          method: "GET",
        }),
      }),
      getUserCustomers: builder.mutation({
        query: () => ({
          url: "/assigned/customers",
          method: "GET",
        }),
      }),

    getCustomer: builder.mutation({
      query: (id) => ({
        url: `/customer/${id}`,
        method: "GET",
      }),
    }),
  
    updateCustomer: builder.mutation({
        query: (formData) => ({
          url: `/customer/${formData.id}`,
          method: "PUT",
          body: formData,
        }),
      }),

      updateCustomerStatus: builder.mutation({
        query: (id) => ({
          url: `/customer/${id}/status`,
          method: "PUT",
        }),
      }),

      getCustomersCreatedBy: builder.mutation({
        query: (userId) => ({
          url: `/customers/user/${userId}`,
          method: "GET",
        }),
      }),

      getCustomersAssignedTo: builder.mutation({
        query: (assignedTo) => ({
          url: `/customers/assignedTo/${assignedTo}`,
          method: "GET",
        }),
      }),
      deleteCustomer: builder.mutation({
        query: ({id}) => ({
          url: `/customer/${id}`,
          method: "DELETE",
        }),
      }),

  }),
});

// Export hooks for API endpoints
export const {
    useCreateCustomerMutation,
    useGetAllCustomersMutation,
    useGetCustomerMutation,
    useUpdateCustomerMutation,
    useUpdateCustomerStatusMutation,
    useGetCustomersCreatedByMutation,
    useGetCustomersAssignedToMutation,
    useDeleteCustomerMutation,
    useGetUserCustomersMutation,
} = customerApiSlice;