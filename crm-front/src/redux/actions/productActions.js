import { apiSlice } from "../../services/api";

export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    createProduct: builder.mutation({
      query: (formData) => ({
        url: "/product",
        method: "POST",
        body: formData, 
      }),
    }),
    

    getAllProducts: builder.mutation({
        query: () => ({
          url: "/products",
          method: "GET",
        }),
      }),
      getUserProducts: builder.mutation({
        query: () => ({
          url: "/assigned/products",
          method: "GET",
        }),
      }),

    getProduct: builder.mutation({
      query: (id) => ({
        url: `/product/${id}`,
        method: "GET",
      }),
    }),
  
    updateProduct: builder.mutation({
        query: (formData) => ({
          url: `/product/${formData.id}`,
          method: "PUT",
          body: formData,
        }),
      }),

      updateProductStatus: builder.mutation({
        query: (id) => ({
          url: `/product/${id}/status`,
          method: "PUT",
        }),
      }),

      getProductsCreatedBy: builder.mutation({
        query: (userId) => ({
          url: `/products/user/${userId}`,
          method: "GET",
        }),
      }),

      getProductsAssignedTo: builder.mutation({
        query: (assignedTo) => ({
          url: `/products/assignedTo/${assignedTo}`,
          method: "GET",
        }),
      }),
      deleteProduct: builder.mutation({
        query: ({id}) => ({
          url: `/product/${id}`,
          method: "DELETE",
        }),
      }),

  }),
});

// Export hooks for API endpoints
export const {
    useCreateProductMutation,
    useGetAllProductsMutation,
    useGetProductMutation,
    useUpdateProductMutation,
    useUpdateProductStatusMutation,
    useGetProductsCreatedByMutation,
    useGetProductsAssignedToMutation,
    useDeleteProductMutation,
    useGetUserProductsMutation,
} = productApiSlice;