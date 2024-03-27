import { Outlet, useNavigate } from "react-router-dom";
import Header from '@/components/admin/Header'
import Sidebar from "@/components/admin/Sidebar";
import { useAuthUserQuery, useLogoutMutation } from "@/redux/apis/userApi";
import { useEffect } from "react";

export default function AdminLayout() {
  const { data, isSuccess, isError } = useAuthUserQuery('');

  const [logout] = useLogoutMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if ((isSuccess && data?.data?._id === undefined) || isError) {
      return navigate('/login');
    }
  }, [data?.data?._id, isError, isSuccess, navigate])

  useEffect(() => {

    if (data?.data?.role === "user") {
      try {
        logout('')
          .then((data) => {
            console.log({ data });

          })
        // return navigate('/login');

      } catch (error) {
        console.log(error);
      }
    }

  }, [data?.data?.role])

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