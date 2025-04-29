'use client';

import { setUser } from '@/redux/reducers/AuthReducers';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function Dashboard() {
  const dispatch = useDispatch();
  const { data: session } = useSession();
  const user = useSelector((state) => state.auth.user);

  console.log("log", user);
  
  useEffect(() => {
    if (session?.user) {
      dispatch(setUser(session.user));
    }
  }, [session, dispatch]);

  return <div>Logged in as: {user?.name}</div>;
}
