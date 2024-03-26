import { useAuthUserQuery } from "@/redux/api";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export default function GuestLayout() {
  const { data, isSuccess, isError } = useAuthUserQuery('');

  const navigate = useNavigate();


  useEffect(() => {
    if (isSuccess && data?.data?._id !== undefined && !isError) {
      return navigate('/admin');
    }
  }, [data?.data?._id, isError, isSuccess, navigate])

  return (
    <Outlet />
  )
}
