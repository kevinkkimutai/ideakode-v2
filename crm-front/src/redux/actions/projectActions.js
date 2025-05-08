import { apiSlice } from "../../services/api";

export const projectApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    createProject: builder.mutation({
      query: (formData) => ({
        url: "/project",
        method: "POST",
        body: formData, 
      }),
    }),
    

    getAllProjects: builder.mutation({
        query: () => ({
          url: "/projects",
          method: "GET",
        }),
      }),
      getUserProjects: builder.mutation({
        query: () => ({
          url: "/assigned/projects",
          method: "GET",
        }),
      }),

    getProject: builder.mutation({
      query: (id) => ({
        url: `/project/${id}`,
        method: "GET",
      }),
    }),
  
    updateProject: builder.mutation({
        query: (formData) => ({
          url: `/project`,
          method: "PUT",
          body: formData,
        }),
      }),

      updateProjectStatus: builder.mutation({
        query: (id) => ({
          url: `/project/${id}/status`,
          method: "PUT",
        }),
      }),

      getProjectsCreatedBy: builder.mutation({
        query: (userId) => ({
          url: `/projects/user/${userId}`,
          method: "GET",
        }),
      }),

      getProjectsAssignedTo: builder.mutation({
        query: (assignedTo) => ({
          url: `/projects/assignedTo/${assignedTo}`,
          method: "GET",
        }),
      }),
      deleteProject: builder.mutation({
        query: (data) => ({
          url: `/project`,
          method: "DELETE",
          body: { ...data },
        }),
      }),

  }),
});

// Export hooks for API endpoints
export const {
    useCreateProjectMutation,
    useGetAllProjectsMutation,
    useGetProjectMutation,
    useUpdateProjectMutation,
    useUpdateProjectStatusMutation,
    useGetProjectsCreatedByMutation,
    useGetProjectsAssignedToMutation,
    useDeleteProjectMutation,
    useGetUserProjectsMutation,
} = projectApiSlice;