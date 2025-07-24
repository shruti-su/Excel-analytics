import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  InformationCircleIcon,
  ServerStackIcon,
  RectangleStackIcon,
} from "@heroicons/react/24/solid";
import { Home } from "/src/pages/dashboard";
import { SignIn, SignUp, Forgotpassword } from "/src/pages/auth";
import Attendence from "/src/pages/attendence";
import Upload from "./pages/dashboard/upload";
import { Charts } from "./pages/dashboard/charts";
import FileRecords from "./pages/dashboard/file-records";
import Unauthorised from "/src/pages/unauthorised/unauthorised";
import AdminHome from "./pages/admin/AdminHome"; // Adjust the path as needed
import UserManagement from "./pages/admin/user-management"; // Adjust the path as needed


const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "dashboard",
        path: "/home",
        element: <Home />,
        sidebar: true,
      },
      {
        icon: <HomeIcon {...icon} />,
        name: "Upload",
        path: "/upload",
        element: <Upload />,
        sidebar: false,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "Charts",
        path: "/charts",
        element: <Charts />,
        sidebar: false,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "File Records",
        path: "/file-records",
        element: <FileRecords />,
        sidebar: true,
      },

      {
        icon: <UserCircleIcon {...icon} />,
        name: "Attendence",
        path: "/Attendence",
        element: <Attendence />,
        sidebar: true,
      },
    ],
  },
  {
    layout: "admin",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "Admin Dashboard",
        path: "/home",
        element: <AdminHome />,
        sidebar: true,
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "User Management",
        path: "/user-management",
        element: <UserManagement />,
        sidebar: true,
      },
    ],
  },
  {
    title: "unauthorised",
    layout: "unauthorised",
    pages: [
      {
        icon: <InformationCircleIcon {...icon} />,
        name: "Unauthorised",
        path: "/",
        element: <Unauthorised />,
      },
    ],
  },
  {
    title: "auth pages",
    layout: "auth",
    pages: [
      {
        icon: <ServerStackIcon {...icon} />,
        name: "sign in",
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        icon: <RectangleStackIcon {...icon} />,
        name: "sign up",
        path: "/sign-up",
        element: <SignUp />,
      },
      {
        icon: <InformationCircleIcon {...icon} />,
        name: "forgot password",
        path: "/forgot-password",
        element: <Forgotpassword />,
      },
    ],
  },
];

export default routes;
