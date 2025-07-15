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
  Button,
} from "@material-tailwind/react";
import { EllipsisVerticalIcon, ArrowUpIcon } from "@heroicons/react/24/outline";
import { sweetAlert } from "../../components/SweetAlert/SweetAlert";
import { useNavigate } from "react-router-dom";



export function Home() {
  const navigate = useNavigate();

  const { showSuccess, showError, showWarning } = sweetAlert();
  useEffect(() => {
    showSuccess("Welcome to the Dashboard!");
  }, []);
  const gotoUpload = () => {
    navigate("/dashboard/upload");
  };
  return (
    <>
      <div className="items-center justify-center mt-12">
        <div className="text-3xl mx-auto text-center mb-8 font-bold">
          Welcome to Excel Analytics
        </div>
        <div className="flex flex-col md:flex-row justify-center gap-8 px-4">
          <Card className="flex-1 min-w-0 md:max-w-xs shadow-lg shadow-blue-200">
            <CardBody onClick={gotoUpload}>
              <Typography
                variant="h6"
                color="gray"
                className="mb-4 uppercase flex items-center gap-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
                  />
                </svg>
                Upload your Excel file
              </Typography>
            </CardBody>
          </Card>
          <Card className="flex-1 min-w-0 md:max-w-xs shadow-lg shadow-green-200">
            <CardBody>
              <Typography variant="h6" color="gray" className="mb-4 uppercase">
                Card 2
              </Typography>
            </CardBody>
          </Card>
          <Card className="flex-1 min-w-0 md:max-w-xs shadow-lg shadow-pink-200">
            <CardBody>
              <Typography variant="h6" color="gray" className="mb-4 uppercase">
                Card 3
              </Typography>
            </CardBody>
          </Card>
        </div>
      </div>
    </>
  );
}

export default Home;
