import { apiSlice } from "../../services/api";

export const productCategoryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    createProductCategory: builder.mutation({
        query: (data) => ({
          url: "/category",
          method: "POST",
          body: { ...data },
        }),
      }),

    getAllProductCategories: builder.mutation({
        query: () => ({
          url: "/categories",
          method: "GET",
        }),
      }),


    getProductCategory: builder.mutation({
      query: (id) => ({
        url: `/category/${id}`,
        method: "GET",
      }),
    }),
  
    updateProductCategory: builder.mutation({
        query: (data) => ({
          url: `/category`,
          method: "PUT",
          body: { ...data },
        }),
      }),

      updateProductCategoryStatus: builder.mutation({
        query: (id) => ({
          url: `/category/${id}`,
          method: "PUT",
        }),
      }),

      getProductCategoriesCreatedBy: builder.mutation({
        query: (userId) => ({
          url: `/category/user/${userId}`,
          method: "GET",
        }),
      }),

      deleteProductCategory: builder.mutation({
        query: (id) => ({
          url: `/category/${id}`,
          method: "DELETE",
        }),
      }),

  }),
});

// Export hooks for API endpoints
export const {
    useCreateProductCategoryMutation,
    useGetAllProductCategoriesMutation,
    useGetProductCategoryMutation,
    useUpdateProductCategoryMutation,
    useUpdateProductCategoryStatusMutation,
    useGetProductCategoriesCreatedByMutation,
    useDeleteProductCategoryMutation,
} = productCategoryApiSlice;