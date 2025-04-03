import { apiSlice } from "../../services/api";

export const supportCategoryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    createSupportCategory: builder.mutation({
        query: (data) => ({
          url: "/support-category",
          method: "POST",
          body: { ...data },
        }),
      }),

    getAllSupportCategories: builder.mutation({
        query: () => ({
          url: "/support-categories",
          method: "GET",
        }),
      }),


    getSupportCategory: builder.mutation({
      query: (id) => ({
        url: `/support-category/${id}`,
        method: "GET",
      }),
    }),
  
    updateSupportCategory: builder.mutation({
        query: (data) => ({
          url: `/support-category`,
          method: "PUT",
          body: { ...data },
        }),
      }),

      updateSupportCategoryStatus: builder.mutation({
        query: (id) => ({
          url: `/support-category/${id}`,
          method: "PUT",
        }),
      }),

      getSupportCategoriesCreatedBy: builder.mutation({
        query: (userId) => ({
          url: `/support-category/user/${userId}`,
          method: "GET",
        }),
      }),

      deleteSupportCategory: builder.mutation({
        query: (data) => ({
          url: `/support-category`,
          method: "DELETE",
          body: { ...data },
        }),
      }),

  }),
});

// Export hooks for API endpoints
export const {
    useCreateSupportCategoryMutation,
    useGetAllSupportCategoriesMutation,
    useGetSupportCategoryMutation,
    useUpdateSupportCategoryMutation,
    useUpdateSupportCategoryStatusMutation,
    useGetSupportCategoriesCreatedByMutation,
    useDeleteSupportCategoryMutation,
} = supportCategoryApiSlice;