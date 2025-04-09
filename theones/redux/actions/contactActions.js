import { apiSlice } from "../../services/api";

export const contactApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    createContact: builder.mutation({
        query: (data) => ({
          url: "/contact",
          method: "POST",
          body: { ...data },
        }),
      }),

  }),
});

// Export hooks for API endpoints
export const {
    useCreateContactMutation,
} = contactApiSlice;