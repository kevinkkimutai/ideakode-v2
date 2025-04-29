import { apiSlice } from "../../services/api";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: (userData) => ({
        url: "/register",
        method: "POST",
        body: { ...userData },
      }),
    }),
    loginUser: builder.mutation({
      query: (userData) => ({
        url: "/login",
        method: "POST",
        body: { ...userData },
      }),
    }),
    getAllUsers: builder.query({
      query: () => "/users",
    }),
 
    getUserById: builder.query({
      query: (userId) => `/users/${userId}`,
    }),
    getCurrentUser: builder.mutation({
      query: () => ({
        url: "/currentuser",
        method: "GET",
      }),
    }),
    getUser: builder.query({
      query: () => "/currentuser",
     
    }),

    updateUserById: builder.mutation({
      query: ({ userId, userData }) => ({
        url: `/users/${userId}`,
        method: "PUT",
        body: { ...userData },
      }),
    }),
  deleteUserById: builder.mutation({
      query: (userId) => ({
        url: `/users/${userId}`,
        method: "DELETE",
      }),
    }),
    forgetPassword: builder.mutation({
      query: (email) => ({
        url: "/forgot-password",
        method: "POST",
        body: { email },
      }),
    }),
    resetPassword: builder.mutation({
      query: (resetData) => ({
        url: "/reset-password",
        method: "POST",
        body: { ...resetData },
      }),
    }),
  
    logout: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
    }),

  }),
});

export const {
  useLoginUserMutation,
  useCreateUserMutation,
  useGetAllUsersQuery,
  useGetUserByIdQuery,
  useGetUserQuery,
  useGetCurrentUserMutation,
  useUpdateUserByIdMutation,
  useDeleteUserByIdMutation,
  useForgetPasswordMutation,
  useResetPasswordMutation,
  useLogoutMutation,
} = userApiSlice;
