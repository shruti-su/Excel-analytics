import React from "react";
import { Card, Typography } from "@material-tailwind/react";
import { motion } from "framer-motion";
import { Line } from "react-chartjs-2";
import { useNavigate } from "react-router-dom";

// Utility to generate mock upload metadata from parsed data
const getRecentUploads = (parsedData) => {
  if (!Array.isArray(parsedData) || parsedData.length === 0) return [];

  // Group records by filename (mocking here)
  const uploadsMap = new Map();

  parsedData.forEach((item, index) => {
    const fileName = item.fileName || `uploaded_file_${index % 3 + 1}.xlsx`; // Fake filename
    const uploadedAt = item.uploadedAt || new Date(Date.now() - index * 86400000); // Fake upload time

    if (!uploadsMap.has(fileName)) {
      uploadsMap.set(fileName, uploadedAt);
    }
  });

  // Convert to array and sort by date (latest first)
  return Array.from(uploadsMap.entries())
    .map(([fileName, date]) => ({
      fileName,
      uploadedAt: new Date(date),
    }))
    .sort((a, b) => b.uploadedAt - a.uploadedAt)
    .slice(0, 5); // Show latest 5
};

function Home({ parsedData }) {
  const totalRecords = parsedData?.length || 0;
  const currentDate = new Date().toLocaleString();
  const navigate = useNavigate();

  const recentUploads = getRecentUploads(parsedData);

  const chartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Monthly Revenue",
        data: [12000, 15000, 14000, 17000, 20000, 18000],
        fill: false,
        borderColor: "#6366f1",
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="p-6 space-y-6">
      {/* Greeting */}
      <div className="bg-gradient-to-r from-indigo-200 to-purple-200 p-6 rounded-xl shadow">
        <Typography variant="h4" className="text-indigo-900">
          👋 Welcome back!
        </Typography>
        <Typography className="text-indigo-800">
          Here's your dashboard overview at a glance.
        </Typography>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
        <Card className="p-4 bg-gradient-to-r from-indigo-500 to-blue-500 text-white rounded-xl shadow">
          <Typography variant="h6">Total Records</Typography>
          <Typography variant="h4">{totalRecords}</Typography>
        </Card>
        <Card className="p-4 bg-gradient-to-r from-pink-500 to-red-400 text-white rounded-xl shadow">
          <Typography variant="h6">Total Users</Typography>
          <Typography variant="h4">128</Typography>
        </Card>
        <Card className="p-4 bg-gradient-to-r from-green-400 to-teal-400 text-white rounded-xl shadow">
          <Typography variant="h6">Total Sales</Typography>
          <Typography variant="h4">₹1.2M</Typography>
        </Card>
        <Card className="p-4 bg-gradient-to-r from-yellow-400 to-orange-400 text-white rounded-xl shadow">
          <Typography variant="h6">Last Upload</Typography>
          <Typography variant="h5">{currentDate}</Typography>
        </Card>

        <Card
          onClick={() => navigate("/dashboard/upload")}
          className="p-4 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-xl shadow cursor-pointer hover:shadow-xl transition-shadow"
        >
          <Typography variant="h6">Upload New File</Typography>
          <Typography variant="h4">📁 Click to Upload</Typography>
        </Card>
      </div>

      {/* Chart Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-xl p-6 shadow"
      >
        <Typography variant="h5" className="mb-4">
          Revenue Overview
        </Typography>
        <Line data={chartData} />
      </motion.div>

      {/* ✅ Dynamic Upload History */}
      <div className="bg-white p-4 rounded-xl shadow border">
        <Typography variant="h6" className="mb-2">
          Recent Uploads
        </Typography>
        <ul>
          {recentUploads.length > 0 ? (
            recentUploads.map(({ fileName, uploadedAt }, index) => (
              <li
                key={index}
                className="flex justify-between py-2 border-b last:border-none"
              >
                <span className="font-medium">{fileName}</span>
                <span className="text-gray-500 text-sm">
                  {uploadedAt.toLocaleDateString()}
                </span>
              </li>
            ))
          ) : (
            <Typography color="gray">No uploads yet.</Typography>
          )}
        </ul>
      </div>

      {/* Smart Insight */}
      <Card className="bg-yellow-50 p-4 rounded-lg shadow text-yellow-900 border-l-4 border-yellow-400">
        <Typography variant="h6">Smart Insight</Typography>
        <Typography>
          📌 Your sales dropped 12% this week compared to last. Check product trends.
        </Typography>
      </Card>
    </div>
  );
}

export default Home;
