import { createSlice } from '@reduxjs/toolkit';

const customerslice = createSlice({
  name: 'customers',
  initialState: {
    customers: [],
    loading: false,
    error: null
  },
  reducers: {
    setCustomers: (state, action) => {
      state.customers = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    }
  }
});

export const { setCustomers, setLoading, setError } = customerslice.actions;
export default customerslice.reducer;

