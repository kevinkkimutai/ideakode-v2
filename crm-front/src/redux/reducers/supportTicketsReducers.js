import { createSlice } from '@reduxjs/toolkit';

const ticketSlice = createSlice({
  name: 'tickets',
  initialState: {
    tickets: [],
    loading: false,
    error: null
  },
  reducers: {
    setTickets: (state, action) => {
      state.tickets = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    }
  }
});

export const { setTickets, setLoading, setError } = ticketSlice.actions;
export default ticketSlice.reducer;

