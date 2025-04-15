import { createSlice } from '@reduxjs/toolkit';

const quoteSlice = createSlice({
  name: 'quotes',
  initialState: {
    quotes: [],
    loading: false,
    error: null
  },
  reducers: {
    setQuotes: (state, action) => {
      state.quotes = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    }
  }
});

export const { setQuotes, setLoading, setError } = quoteSlice.actions;
export default quoteSlice.reducer;
