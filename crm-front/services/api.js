'use client';

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getSession } from 'next-auth/react'; // <-- import session

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_BASE,
  credentials: 'include',
  prepareHeaders: async (headers) => {
    const session = await getSession(); // fetch current session
    console.log("session", session);
    
    const token = session?.user?.token; // or session?.accessToken depending on how you customized it
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.originalStatus === 403) {
    // No refresh token logic here, just logout or notify
    console.warn('Session expired or forbidden');

    // Optional: Clear Redux state if needed
    api.dispatch(logOut()); 
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({}),
});
