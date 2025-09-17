import React, { useState, useEffect } from "react";
import { Card, CardBody, Typography, Button } from "@material-tailwind/react";
import {
  PencilIcon,
  EnvelopeIcon,
  CalendarDaysIcon,
  DocumentArrowUpIcon,
  ChartBarIcon,
} from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import { useAuth } from "@/components/auth/AuthContext";
import fileuploadService from "@/services/api/fileupload.js";

function ProfilePage() {
  const { user } = useAuth();
  const [stats, setStats] = useState({ uploads: 0, charts: 0 });

  useEffect(() => {
    const fetchUserStats = async () => {
      if (user) {
        try {
          const records = await fileuploadService.getFileRecords();
          const userRecords = records.filter((r) => r.user === user.id);
          const chartCount = userRecords.reduce(
            (sum, record) => sum + (record.chartCount || 0),
            0
          );

          setStats({
            uploads: userRecords.length,
            charts: chartCount,
          });
        } catch (error) {
          console.error("Failed to fetch user stats:", error);
        }
      }
    };

    fetchUserStats();
  }, [user]);

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="w-12 h-12 border-4 border-purple-500 rounded-full border-t-transparent animate-spin"></div>
      </div>
    );
  }

  const joinedDate = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Not available";

  return (
    <div className="flex flex-col px-4 py-10 mx-auto sm:px-6 lg:px-8 max-w-7xl ">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <Typography
          variant="h3"
          className="font-extrabold text-3xl text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-500"
        >
          My Profile
        </Typography>
        <Typography className="text-gray-600 dark:text-gray-400">
          Manage your personal details and track your activity.
        </Typography>
      </motion.div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Left Column: Profile Card */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:col-span-1"
        >
          <Card className="w-full p-6 text-center shadow-lg rounded-2xl dark:bg-gray-800 hover:shadow-xl transition">
            <CardBody>
              <div className="flex justify-center mb-4">
                {user.profilePicture ? (
                  <img
                    src={user.profilePicture}
                    alt="Profile"
                    className="h-24 w-24 rounded-full border-4 border-purple-500 object-cover shadow-lg"
                  />
                ) : (
                  <div className="relative inline-flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border-4 border-purple-500 bg-gradient-to-r from-purple-600 to-indigo-500 shadow-lg">
                    <span className="text-5xl font-bold text-white">
                      {user.name?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
              </div>
              <Typography
                variant="h5"
                className="font-semibold text-gray-800 dark:text-white"
              >
                {user.name}
              </Typography>

              {/* Role Badge */}
              <span className="mt-2 inline-block px-3 py-1 text-xs font-medium text-white rounded-full bg-gradient-to-r from-purple-600 to-indigo-500">
                {user.role}
              </span>

              <div className="w-full my-6 border-t border-gray-200 dark:border-gray-700" />
              <div className="flex flex-col gap-3 text-left">
                <div className="flex items-center gap-3">
                  <EnvelopeIcon className="w-5 h-5 text-purple-500" />
                  <Typography className="text-sm text-gray-700 dark:text-gray-300">
                    {user.email}
                  </Typography>
                </div>
                <div className="flex items-center gap-3">
                  <CalendarDaysIcon className="w-5 h-5 text-purple-500" />
                  <Typography className="text-sm text-gray-700 dark:text-gray-300">
                    Joined on {joinedDate}
                  </Typography>
                </div>
              </div>
              <Button
                variant="gradient"
                color="indigo"
                className="flex items-center justify-center gap-2 mt-8 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600"
                fullWidth
              >
                <PencilIcon className="w-4 h-4" />
                Edit Profile
              </Button>
            </CardBody>
          </Card>
        </motion.div>

        {/* Right Column: Stats and Details */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="space-y-8 lg:col-span-2"
        >
          {/* Stats Section */}
          <Card className="w-full p-6 shadow-lg rounded-2xl dark:bg-gray-800">
            <Typography
              variant="h6"
              className="mb-4 font-semibold text-gray-800 dark:text-white"
            >
              Activity Overview
            </Typography>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <motion.div
                whileHover={{ scale: 1.03 }}
                className="flex items-center p-4 rounded-xl bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-gray-700 dark:to-gray-800"
              >
                <div className="p-3 mr-4 text-white bg-purple-500 rounded-full shadow-md">
                  <DocumentArrowUpIcon className="w-6 h-6" />
                </div>
                <div>
                  <Typography className="text-sm text-gray-600 dark:text-gray-400">
                    Files Uploaded
                  </Typography>
                  <Typography
                    variant="h4"
                    className="font-bold text-gray-900 dark:text-white"
                  >
                    {stats.uploads}
                  </Typography>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.03 }}
                className="flex items-center p-4 rounded-xl bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-gray-700 dark:to-gray-800"
              >
                <div className="p-3 mr-4 text-white bg-indigo-500 rounded-full shadow-md">
                  <ChartBarIcon className="w-6 h-6" />
                </div>
                <div>
                  <Typography className="text-sm text-gray-600 dark:text-gray-400">
                    Charts Created
                  </Typography>
                  <Typography
                    variant="h4"
                    className="font-bold text-gray-900 dark:text-white"
                  >
                    {stats.charts}
                  </Typography>
                </div>
              </motion.div>
            </div>
          </Card>

          {/* About Section */}
          <Card className="w-full p-6 shadow-lg rounded-2xl dark:bg-gray-800">
            <Typography
              variant="h6"
              className="mb-3 font-semibold text-gray-800 dark:text-white"
            >
              About Me
            </Typography>
            <Typography className="text-gray-600 dark:text-gray-400 leading-relaxed">
              This is a placeholder for a user biography. Users can provide a
              short description about themselves, their role, or their
              interests. This section can be made editable via the{" "}
              <span className="text-purple-600 dark:text-purple-400 font-medium">
                'Edit Profile'
              </span>{" "}
              functionality.
            </Typography>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

export default ProfilePage;
