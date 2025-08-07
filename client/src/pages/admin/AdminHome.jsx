import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import { Bar, Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement } from "chart.js";
import { motion } from "framer-motion";
import {
  UserGroupIcon,
  DocumentTextIcon,
  ChartBarIcon,
  CalendarDaysIcon,
} from "@heroicons/react/24/outline";

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement);

function AdminHome() {
  const today = new Date().toLocaleDateString();
  const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  const stats = [
    {
      title: "Today's Users",
      value: 143,
      icon: <UserGroupIcon className="h-6 w-6 text-white" />,
      growth: "+12%",
    },
    {
      title: "Files Uploaded",
      value: 38,
      icon: <DocumentTextIcon className="h-6 w-6 text-white" />,
      growth: "+5%",
    },
    {
      title: "Charts Created",
      value: 97,
      icon: <ChartBarIcon className="h-6 w-6 text-white" />,
      growth: "+8%",
    },
    {
      title: "Date",
      value: today,
      icon: <CalendarDaysIcon className="h-6 w-6 text-white" />,
      growth: "-",
    },
  ];

  const chartColor = isDark ? "#93C5FD" : "#6366F1";
  const chartBgColor = isDark ? "#1E3A8A" : "#6366F1";

  const chartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
      {
        label: "Users",
        data: [100, 200, 300, 250, 400, 370, 600],
        borderColor: chartColor,
        backgroundColor: chartColor,
        tension: 0.4,
      },
    ],
  };

  const barChartData = {
    labels: ["File A", "File B", "File C", "File D"],
    datasets: [
      {
        label: "Views",
        data: [1200, 800, 950, 1300],
        backgroundColor: chartBgColor,
      },
    ],
  };

  return (
    <div className="px-6 py-10 space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Typography variant="h3" className="font-bold text-gray-800 dark:text-white">
          Admin Dashboard
        </Typography>
        <Typography className="text-gray-600 dark:text-gray-300">
          Overview of today's Excel analytics activity
        </Typography>
      </motion.div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index} className="shadow-md dark:bg-gray-800">
            <CardBody className="flex items-center gap-4">
              <div className="p-3 bg-indigo-500 rounded-full">
                {stat.icon}
              </div>
              <div>
                <Typography className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  {stat.title}
                </Typography>
                <Typography variant="h5" className="font-bold text-gray-800 dark:text-white">
                  {stat.value}
                </Typography>
                <Typography className="text-xs text-green-500">
                  {stat.growth}
                </Typography>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card className="dark:bg-gray-800">
          <CardHeader floated={false} shadow={false} className="bg-transparent">
            <Typography variant="h6" className="text-gray-700 dark:text-gray-100">
              Monthly User Growth
            </Typography>
          </CardHeader>
          <CardBody>
            <Line data={chartData} />
          </CardBody>
        </Card>

        <Card className="dark:bg-gray-800">
          <CardHeader floated={false} shadow={false} className="bg-transparent">
            <Typography variant="h6" className="text-gray-700 dark:text-gray-100">
              Top Viewed Files
            </Typography>
          </CardHeader>
          <CardBody>
            <Bar data={barChartData} />
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

export default AdminHome;
