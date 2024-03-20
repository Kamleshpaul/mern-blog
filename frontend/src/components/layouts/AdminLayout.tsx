import { Outlet } from "react-router-dom";
import Header from '@/components/admin/Header'
import Sidebar from "@/components/admin/Sidebar";

export default function AdminLayout() {
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