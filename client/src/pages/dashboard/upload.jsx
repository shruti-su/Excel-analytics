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
    <div className="text-3xl font-bold text-center mt-8">
      <div>Upload Excel File</div>
      <Card className="w-full max-w-[48rem] flex-row mx-auto mt-8 border-2 border-dotted border-gray-400">
        <CardBody className="flex items-center justify-center h-24">
          <input
            type="file"
            accept=".xlsx, .xls, .csv"
            className="hidden"
            id="file-upload"
            onChange={(e) => console.log(e.target.files[0])}
          />
          <label htmlFor="file-upload">
            <Button variant="gradient" size="lg">
              Upload File
            </Button>
          </label>
          <Typography variant="h5" className="text-black text-center p-4">
            Drag and drop your Excel file here
          </Typography>
        </CardBody>
      </Card>
    </div>
  );
}

export default Upload;
