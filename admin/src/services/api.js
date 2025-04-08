import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:2200/api/",
  // baseUrl:"https://ideakode-v2-1.onrender.com/api/",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.originalStatus === 403) {
    const refreshToken = api.getState().auth.token;
    if (refreshToken) {
      // Implement your refresh token logic here
      // Example: const refreshResult = await baseQuery("/refresh", api, extraOptions);
      // If refresh is successful, update credentials
      api.dispatch(setCredentials({ token: token }));
      result = await baseQuery(args, api, extraOptions); // Retry original request
    } else {
      api.dispatch(logOut());
    }
  }
  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({}),
});

export const {

} = apiSlice;
