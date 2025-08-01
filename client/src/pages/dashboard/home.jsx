import React, { useEffect, useState, useCallback } from "react";
// Import IconButton for the small buttons
import { Card, Typography, IconButton, Button } from "@material-tailwind/react";
import { motion } from "framer-motion";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useNavigate } from "react-router-dom";
import fileuploadService from "/src/services/api/fileupload.js";
import { sweetAlert } from "../../components/SweetAlert/SweetAlert";
import { Menu } from '@headlessui/react';
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// --- Refined getRecentUploads Utility (now fetches from API) ---
const getRecentUploads = async () => {
  try {
    const data = await fileuploadService.getFileRecords();
    if (!Array.isArray(data) || data.length === 0) return [];

    return [...data]
      // .sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt))
      .slice(0, 5); // Show latest 5
  } catch (error) {
    console.error("Error fetching recent uploads:", error);
    return [];
  }
};

function Home() {
  const navigate = useNavigate();
  const { showSuccess, showError, showWarning, showConfirm } = sweetAlert();

  // --- State to hold dynamic data ---
  const [totalFilesUploaded, setTotalFilesUploaded] = useState(0);
  const [lastUploadDate, setLastUploadDate] = useState("N/A");
  const [recentUploads, setRecentUploads] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState(null); // Add error state

  // --- Data Fetching Logic using useEffect ---
  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Fetch total file count
      const countResponse = await fileuploadService.getCount();
      if (countResponse && typeof countResponse.count === 'number') {
        setTotalFilesUploaded(countResponse.count);
      } else {
        console.warn("API for getCount did not return expected 'count' property:", countResponse);
        setTotalFilesUploaded(0); // Default to 0 if unexpected response
      }

      // Fetch last upload date
      const lastUploadResponse = await fileuploadService.getLastUpload();
      if (lastUploadResponse && lastUploadResponse.lastUploadedAt) { // Assuming API returns { lastUploadedAt: "..." }
        setLastUploadDate(new Date(lastUploadResponse.lastUploadedAt).toLocaleString());
      } else {
        setLastUploadDate("No uploads yet");
      }

      // Fetch recent uploads (using the adjusted utility)
      const recent = await getRecentUploads();
      setRecentUploads(recent);

    } catch (err) {
      console.error("Failed to fetch dashboard data:", err);
      setError("Failed to load dashboard data. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []); // Dependencies for useCallback. `fileuploadService` is stable.

  useEffect(() => {
    fetchData();
  }, [fetchData]);


  // Handle delete action
  const handleDelete = async (recordId) => {
    const confirmed = await showConfirm(
      "Are you sure you want to delete this file record?"
    );
    if (!confirmed) return;

    try {
      await fileuploadService.deleteFileRecord(recordId); // Assuming you have this API
      setFileRecords((prev) => prev.filter((rec) => rec.id !== recordId));
    } catch (error) {
      console.error("Error deleting record:", error);
    }
  };
  const handleAnalyse = async (recordData) => {
    const confirmed = await showConfirm("Do you want to analyse this file?");
    if (!confirmed) return;
    navigate("/dashboard/charts", { state: { parsedData: recordData } });
  };
  return (
    <div className="p-6 space-y-6  from-purple-50 to-indigo-100 min-h-screen">
      {/* Greeting */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-indigo-100 to-purple-100 p-6 rounded-xl shadow-lg border border-indigo-200"
      >
        <Typography variant="h4" className="text-indigo-900 font-bold">
          👋 Welcome back!
        </Typography>
        <Typography className="text-indigo-800 text-lg">
          Here's your dashboard overview at a glance.
        </Typography>
      </motion.div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Total Files Uploaded Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="p-6 min-h-[11rem] flex flex-col justify-between bg-gradient-to-br from-indigo-600 to-blue-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
            <Typography variant="h6" className="text-indigo-100 mb-2">
              Total Files Uploaded
            </Typography>
            <Typography variant="h3" className="font-extrabold">
              {totalFilesUploaded}
            </Typography>
            <Typography
              className="text-indigo-200 text-sm mt-2 cursor-pointer"
              onClick={() => navigate("/dashboard/file-records")}
            >
              View all files &rarr;
            </Typography>
          </Card>
        </motion.div>

        {/* Last Upload Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="p-6 min-h-[11rem] flex flex-col justify-between bg-gradient-to-br from-yellow-500 to-orange-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
            <Typography variant="h6" className="text-yellow-100 mb-2">
              Last Upload
            </Typography>
            <Typography variant="h5" className="font-semibold">
              {lastUploadDate}
            </Typography>
            <Typography className="text-yellow-200 text-sm mt-2">
              Latest activity
            </Typography>
          </Card>
        </motion.div>

        {/* Upload New File Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card
            onClick={() => navigate("/dashboard/upload")}
            className="p-6 min-h-[11rem] flex flex-col justify-between bg-gradient-to-br from-purple-600 to-indigo-700 text-white rounded-xl shadow-lg cursor-pointer hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1"
          >
            <Typography variant="h6" className="text-purple-100 mb-2">
              Get Started
            </Typography>
            <Typography variant="h3" className="font-extrabold flex items-center">
              📁 Upload New File
            </Typography>
            <Typography className="text-purple-200 text-sm mt-2">
              Bring your data to life
            </Typography>
          </Card>
        </motion.div>
      </div>


      {/* Recent Uploads */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 dark:bg-gray-800 dark:text-white"
      >
        <Typography variant="h6" className="mb-4 text-gray-800 dark:text-gray-100">
          Recent Uploads
        </Typography>
        <ul>
          {recentUploads.length > 0 ? (
            recentUploads.map((file, index) => (
              <li
                key={file._id || index}
                className="grid grid-cols-3 items-center py-4 px-2 border-b border-gray-200 last:border-none"
              >
                {/* File Name + Icon */}
                <div className="flex items-center space-x-2 truncate">
                  <span className="text-sm text-gray-800 font-medium truncate">{file.fileName}</span>
                </div>

                {/* Centered Upload Time */}
                <div className="text-center text-sm text-gray-600">
                  {new Date(file.uploadedAt).toLocaleString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </div>

                {/* Buttons Aligned to End */}
                <div className="flex justify-end items-center pr-2 relative">
                  <div className="md:hidden">
                    {/* Three-dot dropdown menu on small screens */}
                    <Menu as="div" className="relative inline-block text-left">
                      <Menu.Button className="text-gray-600 hover:text-gray-800">
                        <EllipsisVerticalIcon className="h-5 w-5" />
                      </Menu.Button>

                      <Menu.Items className="absolute right-0 mt-2 w-28 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black/5 focus:outline-none z-50">
                        <div className="py-1">
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                onClick={() => handleAnalyse(file.data)}
                                className={`${active ? "bg-blue-50 text-blue-700" : "text-gray-700"
                                  } block w-full px-4 py-2 text-sm`}
                              >
                                ANALYZE
                              </button>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                onClick={() => handleDelete(file._id)}
                                className={`${active ? "bg-red-50 text-red-700" : "text-red-600"
                                  } block w-full px-4 py-2 text-sm`}
                              >
                                DELETE
                              </button>
                            )}
                          </Menu.Item>
                        </div>
                      </Menu.Items>
                    </Menu>
                  </div>

                  {/* Show buttons directly on medium+ screens */}
                  <div className="hidden md:flex space-x-4">
                    <button
                      onClick={() => handleAnalyse(file.data)}
                      className="text-blue-600 text-sm hover:underline"
                    >
                      ANALYZE
                    </button>
                    <button
                      onClick={() => handleDelete(file._id)}
                      className="text-red-600 text-sm hover:underline"
                    >
                      DELETE
                    </button>
                  </div>
                </div>
              </li>
            ))
          ) : (
            <Typography color="gray" className="py-4 text-center">
              No uploads yet. Click 'Upload New File' to get started!
            </Typography>
          )}
        </ul>
      </motion.div>


    </div>
  );
}

export default Home;