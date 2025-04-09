import { createSlice } from '@reduxjs/toolkit';

const contactSlice = createSlice({
  name: 'contact',
  initialState: {
    contact: [],
    loading: false,
    error: null
  },
  reducers: {
    setContact: (state, action) => {
      state.contact = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    }
  }
});

export const { setContact, setLoading, setError } = contactSlice.actions;
export default contactSlice.reducer;

