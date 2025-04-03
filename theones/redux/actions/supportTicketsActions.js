import { apiSlice } from "../../services/api";

export const ticketApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    createTicket: builder.mutation({
        query: (data) => ({
          url: "/ticket",
          method: "POST",
          body: { ...data },
        }),
      }),

    getAllTickets: builder.mutation({
        query: () => ({
          url: "/tickets",
          method: "GET",
        }),
      }),


    getTicket: builder.mutation({
      query: (id) => ({
        url: `/ticket/${id}`,
        method: "GET",
      }),
    }),
  
    updateTicket: builder.mutation({
        query: (data) => ({
          url: `/ticket`,
          method: "PUT",
          body: { ...data },
        }),
      }),

      updateTicketStatus: builder.mutation({
        query: (id) => ({
          url: `/ticket/${id}`,
          method: "PUT",
        }),
      }),

      getSupportCategoriesCreatedBy: builder.mutation({
        query: (userId) => ({
          url: `/ticket/user/${userId}`,
          method: "GET",
        }),
      }),

      deleteTicket: builder.mutation({
        query: (data) => ({
          url: `/ticket`,
          method: "DELETE",
          body: { ...data },
        }),
      }),

  }),
});

// Export hooks for API endpoints
export const {
    useCreateTicketMutation,
    useGetAllTicketsMutation,
    useGetTicketMutation,
    useUpdateTicketMutation,
    useUpdateTicketStatusMutation,
    useGetSupportCategoriesCreatedByMutation,
    useDeleteTicketMutation,
} = ticketApiSlice;