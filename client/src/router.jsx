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
        element: <Forgotpassword/>,
      },
    ],
  },
];

export default routes;