import { createSlice } from '@reduxjs/toolkit';

const productCategorySlice = createSlice({
  name: 'productcategories',
  initialState: {
    productcategories: [],
    loading: false,
    error: null
  },
  reducers: {
    setProductCategories: (state, action) => {
      state.productcategories = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    }
  }
});

export const { setProductCategories, setLoading, setError } = productCategorySlice.actions;
export default productCategorySlice.reducer;

