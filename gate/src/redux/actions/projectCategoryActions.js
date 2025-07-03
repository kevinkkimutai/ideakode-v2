import { apiSlice } from "../../services/api";

export const projectCategoryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    createProjectCategory: builder.mutation({
        query: (data) => ({
          url: "/category",
          method: "POST",
          body: { ...data },
        }),
      }),

    getAllProjectCategories: builder.mutation({
        query: () => ({
          url: "/categories",
          method: "GET",
        }),
      }),


    getProjectCategory: builder.mutation({
      query: (id) => ({
        url: `/category/${id}`,
        method: "GET",
      }),
    }),
  
    updateProjectCategory: builder.mutation({
        query: (data) => ({
          url: `/category`,
          method: "PUT",
          body: { ...data },
        }),
      }),

      updateProjectCategoryStatus: builder.mutation({
        query: (id) => ({
          url: `/category/${id}`,
          method: "PUT",
        }),
      }),

      getProjectCategoriesCreatedBy: builder.mutation({
        query: (userId) => ({
          url: `/category/user/${userId}`,
          method: "GET",
        }),
      }),

      deleteProjectCategory: builder.mutation({
        query: (data) => ({
          url: `/category`,
          method: "DELETE",
          body: { ...data },
        }),
      }),

  }),
});

// Export hooks for API endpoints
export const {
    useCreateProjectCategoryMutation,
    useGetAllProjectCategoriesMutation,
    useGetProjectCategoryMutation,
    useUpdateProjectCategoryMutation,
    useUpdateProjectCategoryStatusMutation,
    useGetProjectCategoriesCreatedByMutation,
    useDeleteProjectCategoryMutation,
} = projectCategoryApiSlice;