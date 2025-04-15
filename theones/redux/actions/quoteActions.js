import { apiSlice } from "../../services/api";

export const quoteApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    createQuote: builder.mutation({
        query: (data) => ({
          url: "/quote",
          method: "POST",
          body: { ...data },
        }),
      }),

  }),
});

// Export hooks for API endpoints
export const {
    useCreateQuoteMutation,
} = quoteApiSlice;