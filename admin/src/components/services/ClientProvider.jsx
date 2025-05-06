"use client";
import React, { useEffect } from "react";
import { useGetCurrentUserMutation } from "@/redux/actions/authActions";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, setUser } from "@/redux/reducers/AuthReducers";
import { useSession } from "next-auth/react";

export default function ClientProvider({ children }) {

  const dispatch = useDispatch();
  const { data: session } = useSession();
  const user = useSelector((state) => state.auth.user);

  console.log("log", user);
  
  useEffect(() => {
    if (session?.user) {
      dispatch(setUser(session.user));
    }
  }, [session, dispatch]);

  useEffect(() => {
    if (session?.expires) {
      const expiration = new Date(session.expires).getTime();
      const now = Date.now();
      const timeout = expiration - now;

      const timer = setTimeout(() => {
        signOut();
      }, timeout);

      return () => clearTimeout(timer);
    }
  }, [session]);

  
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
