import { Outlet, useNavigate } from "react-router-dom";
import Header from '@/components/admin/Header'
import Sidebar from "@/components/admin/Sidebar";
import { useAuthUserQuery } from "@/redux/apis/userApi";
import { useEffect } from "react";

export default function AdminLayout() {
  const { data, isSuccess, isError } = useAuthUserQuery('');

  const navigate = useNavigate();

  useEffect(() => {
    if ((isSuccess && data?.data?._id === undefined) || isError) {
      return navigate('/login');
    }
  }, [data?.data?._id, isError, isSuccess, navigate])

  return (
    <>
      <div className="flex flex-col h-screen">
        <Header />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar />
          <div className="w-screen p-10 overflow-auto ">
            <Outlet />
          </div>
        </div>
      </div>

    </>
  )
}