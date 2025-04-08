"use client";
import React, { useEffect } from "react";
import { useGetCurrentUserMutation } from "@/redux/actions/authActions";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, setUser } from "@/redux/reducers/AuthReducers";

export default function ClientProvider({ children }) {
  const dispatch = useDispatch();
  const [getUser] = useGetCurrentUserMutation();
  const user = useSelector(selectUser);
 
  useEffect(() => {
    const getCurrentUser = async () => {
      const response = await getUser();
      if (response) {
        dispatch(setUser(response?.data?.user));
      }
    };
    getCurrentUser();
  }, [dispatch, getUser]);


  console.log("user user", user);
  
  return (
    <div>
      <ToastContainer
        position="bottom-right"
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
