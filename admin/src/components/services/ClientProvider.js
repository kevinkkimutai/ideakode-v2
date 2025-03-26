"use client"
import React, { useEffect } from 'react';
import { useGetCurrentUserMutation,  } from '@/redux/actions/authActions';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { setUser } from '@/redux/reducers/AuthReducers';

export default function ClientProvider({ children }) {
const dispatch = useDispatch();
const [getUser] = useGetCurrentUserMutation();


  // Initialize WebSocket connection when user is available
  useEffect(() => {
    const getCurrentUser = async () => {
      const response = await getUser();
      if (response) {
        dispatch(setUser(response?.data?.user));
      }
    }
    getCurrentUser();
 
  }, [dispatch, getUser]);

  return (
    <div>
      
 <ToastContainer
  position="top-right"
  autoClose={3000}
  hideProgressBar={true}
  newestOnTop={false}
  closeOnClick={false}
  rtl={false}
  pauseOnFocusLoss
  draggable
  pauseOnHover
/>

      {children}
    </div>
  );
}