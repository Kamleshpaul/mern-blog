import Login from "@/pages/user/Login";
import App from "../App";
import Error from "@/pages/user/Error";
import Register from "@/pages/user/Register";
import GuestLayout from "@/components/layouts/GuestLayout";

const webRouter = [
  {
    path: "/",
    element: <App />,
    errorElement: <Error />
  },
  {
    element: <GuestLayout />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />
      }
    ]
  },

];


export default webRouter;