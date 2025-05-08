import { createSlice } from '@reduxjs/toolkit';

const supportCategorySlice = createSlice({
  name: 'supportcategories',
  initialState: {
    supportcategories: [],
    loading: false,
    error: null
  },
  reducers: {
    setSupportCategories: (state, action) => {
      state.supportcategories = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    }
  }
});

export const { setSupportCategories, setLoading, setError } = supportCategorySlice.actions;
export default supportCategorySlice.reducer;

