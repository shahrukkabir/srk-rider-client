import { createBrowserRouter } from "react-router";
import Root from "../layout/Root";
import Home from "../pages/home/Home";
import AuthLayout from './../layout/AuthLayout';
import LogIn from "../pages/authentication/LogIn";
import Register from "../pages/authentication/Register";
import Coverage from './../pages/coverage/Coverage';
import Forbidden from './../pages/forbidden/Forbidden';
import Spinner from './../components/ui/Spinner';
import PrivateRoutes from './PrivateRoutes';
import SendParcel from './../pages/sendParcel/SendParcel';
import DashboardLayout from './../layout/DashBoardLayout';
import DashboardHome from './../pages/dashboard/DashboardHome';
import MyParcels from './../pages/dashboard/MyParcels';
import Payment from './../pages/dashboard/Payment';
import PaymentHistory from './../pages/dashboard/PaymentHistory';
import TrackParcel from './../pages/dashboard/TrackParcel';
import MyProfile from './../pages/myprofile/MyProfile';

export const router = createBrowserRouter([
    {
        path: "/",
        Component: Root,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path: "coverage",
                hydrateFallbackElement: <Spinner />,
                loader: () => fetch("./serviceCenter.json"),
                Component: Coverage,
            },
            {
                path: 'forbidden',
                Component: Forbidden
            },
            // private routes
            {
                path: "sendParcel",
                hydrateFallbackElement: <Spinner />,
                loader: () => fetch("./serviceCenter.json"),
                element: (<PrivateRoutes> <SendParcel /> </PrivateRoutes>
                ),
            },
        ]
    },
    {
        path: '/',
        Component: AuthLayout,
        children: [
            {
                path: 'login',
                Component: LogIn
            },
            {
                path: 'register',
                Component: Register
            }
        ]
    },
    {
        path: "/dashboard",
        element: <PrivateRoutes><DashboardLayout /> </PrivateRoutes>,
        children: [
            {
                index: true,
                Component: DashboardHome
            },
            {
                path: 'myParcels',
                Component: MyParcels
            },
            {
                path: 'payment/:parcelId',
                Component: Payment,

            },
            {
                path: 'paymentHistory',
                Component: PaymentHistory,

            },
            {
                path: 'track',
                Component: TrackParcel,

            },
            {
                path: "profile",
                Component: MyProfile,
            },
        ]
    }
]);
export default router;
