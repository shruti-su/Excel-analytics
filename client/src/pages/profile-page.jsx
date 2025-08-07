import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
  Button,
} from "@material-tailwind/react";
import {
  PencilIcon,
  MapPinIcon,
  EnvelopeIcon,
  CalendarDaysIcon,
  DocumentArrowUpIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

function ProfilePage() {
  const sampleUser = {
    name: "Shruti Dutta",
    email: "shruti@example.com",
    role: "Admin",
    location: "Bangalore, India",
    joined: "March 12, 2024",
    avatar: "https://i.pravatar.cc/150?img=47", // Sample avatar
    stats: {
      uploads: 58,
      charts: 142,
    },
  };

  return (
    <div className="px-6 py-10 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <Typography variant="h3" className="font-bold text-gray-800 dark:text-white">
          User Profile
        </Typography>
        <Typography className="text-gray-600 dark:text-gray-300">
          Personal details and account overview
        </Typography>
      </motion.div>

      <Card className="flex flex-col md:flex-row items-center md:items-start gap-8 p-6 dark:bg-gray-800 shadow-md">
        {/* Avatar & Name Section */}
        <div className="flex flex-col items-center gap-2">
          <img
            src={sampleUser.avatar}
            alt="Profile"
            className="w-32 h-32 rounded-full shadow-md border-4 border-indigo-500"
          />
          <Typography variant="h5" className="font-semibold text-gray-800 dark:text-white">
            {sampleUser.name}
          </Typography>
          <Typography className="text-indigo-600 dark:text-indigo-400 text-sm">
            {sampleUser.role}
          </Typography>
        </div>

        {/* Details and Stats */}
        <div className="flex-1 w-full space-y-6">
          {/* Contact & Info */}
          <Card className="p-4 dark:bg-gray-900">
            <CardBody className="space-y-4">
              <div className="flex items-center gap-3">
                <EnvelopeIcon className="w-5 h-5 text-indigo-500" />
                <Typography className="text-gray-700 dark:text-gray-300 text-sm">
                  {sampleUser.email}
                </Typography>
              </div>
              <div className="flex items-center gap-3">
                <MapPinIcon className="w-5 h-5 text-indigo-500" />
                <Typography className="text-gray-700 dark:text-gray-300 text-sm">
                  {sampleUser.location}
                </Typography>
              </div>
              <div className="flex items-center gap-3">
                <CalendarDaysIcon className="w-5 h-5 text-indigo-500" />
                <Typography className="text-gray-700 dark:text-gray-300 text-sm">
                  Joined on {sampleUser.joined}
                </Typography>
              </div>
            </CardBody>
          </Card>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card className="p-4 dark:bg-gray-900 flex items-center gap-4">
              <div className="p-2 bg-indigo-500 rounded-full">
                <DocumentArrowUpIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <Typography className="text-sm text-gray-500 dark:text-gray-400">
                  Files Uploaded
                </Typography>
                <Typography variant="h5" className="text-gray-800 dark:text-white font-bold">
                  {sampleUser.stats.uploads}
                </Typography>
              </div>
            </Card>
            <Card className="p-4 dark:bg-gray-900 flex items-center gap-4">
              <div className="p-2 bg-indigo-500 rounded-full">
                <ChartBarIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <Typography className="text-sm text-gray-500 dark:text-gray-400">
                  Charts Created
                </Typography>
                <Typography variant="h5" className="text-gray-800 dark:text-white font-bold">
                  {sampleUser.stats.charts}
                </Typography>
              </div>
            </Card>
          </div>

          {/* Edit Button */}
          <Button className="flex items-center gap-2 bg-indigo-600">
            <PencilIcon className="w-4 h-4" />
            Edit Profile
          </Button>
        </div>
      </Card>
    </div>
  );
}

export default ProfilePage;
