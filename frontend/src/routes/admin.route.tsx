import AdminLayout from "@/components/layouts/AdminLayout";

const adminRouter = [
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <>Hello from dashboard</>,
      }
    ]
  },
]


export default adminRouter;