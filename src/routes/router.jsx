import { createBrowserRouter } from "react-router";
import Root from "../layout/Root";
import Home from "../pages/home/Home";
import AuthLayout from './../layout/AuthLayout';


export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      {
        index: true,
        Component: Home
      }
    ]
  },
  {
    path: '/',
    Component: AuthLayout,
    children: [
      {
        path: 'login',
        // Component: Login
      },
      {
        path: 'register',
        // Component: Register
      }
    ]
  }
]);
export default router;
