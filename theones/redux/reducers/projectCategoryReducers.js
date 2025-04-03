import { createSlice } from '@reduxjs/toolkit';

const projectCategorySlice = createSlice({
  name: 'projectcategories',
  initialState: {
    projectcategories: [],
    loading: false,
    error: null
  },
  reducers: {
    setProjectCategories: (state, action) => {
      state.projectcategories = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    }
  }
});

export const { setProjectCategories, setLoading, setError } = projectCategorySlice.actions;
export default projectCategorySlice.reducer;

