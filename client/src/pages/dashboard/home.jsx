import React, { useEffect } from "react";
import {
  Typography,
  Card,
  CardHeader,
  CardBody,
  IconButton,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Tooltip,
  Progress,
} from "@material-tailwind/react";
import {
  EllipsisVerticalIcon,
  ArrowUpIcon,
} from "@heroicons/react/24/outline";
import {sweetAlert} from "../../components/SweetAlert/SweetAlert";


import { CheckCircleIcon, ClockIcon } from "@heroicons/react/24/solid";

export function Home() {
  const {showSuccess, showError, showWarning} = sweetAlert();
  useEffect(() => {
    showSuccess("Welcome to the Dashboard!");
  }, []);
  return (
    <div className="mt-12 h-dvh">
      Excel Analytics
    </div>
  );
}

export default Home;
