import AdminLayout from "@/components/layouts/AdminLayout";
import Blogs from "@/pages/admin/Blogs";
import Categories from "@/pages/admin/Categories";
import Dashboard from "@/pages/admin/Dashboard";
import Users from "@/pages/admin/Users";

const adminRouter = [
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: 'blogs',
        element: <Blogs />,
      },
      {
        path: 'categories',
        element: <Categories />,
      },
      {
        path: 'users',
        element: <Users />,
      }
    ]

  },
]


export default adminRouter;