import React from "react";
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

function Upload() {
  return (
    <div className="text-3xl font-bold text-center mt- flex flex-col items-center justify-center w-full mt-32 ">
      <h1 className="text-4xl font-extrabold font-mono tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-blue-700 to-blue-400 drop-shadow-lg mb-4 animate-fade-in-slow">
        Upload Excel File
      </h1>
      <Card className="w-full max-w-[48rem] mx-auto mt-8 border-4 border-dotted border-blue-400 bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 shadow-xl rounded-xl flex items-center justify-center text-center ">
        <CardBody className="flex flex-col items-center justify-center h-64 p-8 gap-4 w-full">
          <input
            type="file"
            accept=".xlsx, .xls, .csv"
            className="file-input hidden file-input-bordered file-input-primary w-full max-w-xs"
            id="file-upload"
          />
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-10 text-blue-500 drop-shadow-lg mb-2 animate-bounce">
            <path d="M11.47 1.72a.75.75 0 0 1 1.06 0l3 3a.75.75 0 0 1-1.06 1.06l-1.72-1.72V7.5h-1.5V4.06L9.53 5.78a.75.75 0 0 1-1.06-1.06l3-3ZM11.25 7.5V15a.75.75 0 0 0 1.5 0V7.5h3.75a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3h-9a3 3 0 0 1-3-3v-9a3 3 0 0 1 3-3h3.75Z" />
          </svg>
          <Button
            className="justify-center mx-auto px-8 py-3 text-lg font-bold bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 shadow-md rounded-full transition-all duration-300"
            color="blue"
            onClick={() => document.getElementById('file-upload').click()}
          >
            Upload
          </Button>
          <Typography className="mt-4 text-lg font-semibold text-blue-700">Drag and drop your file here or</Typography>
          <Typography className="text-sm text-gray-500 italic">Supported formats: .xlsx, .xls, .csv</Typography>
          
        </CardBody>
      </Card>
    </div>
  );
}

export default Upload;
