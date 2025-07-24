import React, { useEffect } from "react";
import { Typography, Card, CardBody } from "@material-tailwind/react";
import { sweetAlert } from "../../components/SweetAlert/SweetAlert";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; // Import Framer Motion

// Chart.js imports
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  RadialLinearScale,
  PointElement,
  LineElement,
} from "chart.js";
import { Bar, Pie, Line, Doughnut, Radar, PolarArea } from "react-chartjs-2";
import { useAuth } from "../../components/auth/AuthContext";

// Register Chart.js components (IMPORTANT: Do this once, outside the component function)
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  RadialLinearScale,
  PointElement,
  LineElement
);

export function Home() {
  const navigate = useNavigate();
  const { showSuccess } = sweetAlert();
  const { userRole } = useAuth(); // Destructure the login function from useAuth

  useEffect(() => {
    // Show success alert after a small delay to allow animations to start
    const timer = setTimeout(() => {}, 500);
    console.log(userRole());


    return () => clearTimeout(timer); // Cleanup timer
  }, [showSuccess]);

  const gotoUpload = () => {
    navigate("/dashboard/upload");
  };

  // Framer Motion variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08, // Slightly faster stagger for a lively feel
        delayChildren: 0.2, // Reduced delay
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0, scale: 0.9 }, // Start slightly less offset, slightly smaller
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 120, // Slightly more stiff for a quicker pop
        damping: 12,
      },
    },
  };

  // --- Dummy Data for Various Charts ---
  const barChartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
      {
        label: "Sales",
        data: [65, 59, 80, 81, 56],
        backgroundColor: "rgba(75, 192, 192, 0.7)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const pieChartData = {
    labels: ["Red", "Blue", "Yellow"],
    datasets: [
      {
        label: "# of Votes",
        data: [12, 19, 3],
        backgroundColor: [
          "rgba(255, 99, 132, 0.7)",
          "rgba(54, 162, 235, 0.7)",
          "rgba(255, 206, 86, 0.7)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const lineChartData = {
    labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5"],
    datasets: [
      {
        label: "Daily Visitors",
        data: [100, 150, 120, 200, 180],
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  const doughnutChartData = {
    labels: ["Direct", "Referral", "Social"],
    datasets: [
      {
        label: "Traffic Source",
        data: [300, 50, 100],
        backgroundColor: [
          "rgba(255, 159, 64, 0.7)",
          "rgba(153, 102, 255, 0.7)",
          "rgba(255, 99, 132, 0.7)",
        ],
        borderColor: [
          "rgba(255, 159, 64, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 99, 132, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const radarChartData = {
    labels: [
      "Eating",
      "Drinking",
      "Sleeping",
      "Designing",
      "Coding",
      "Cycling",
      "Running",
    ],
    datasets: [
      {
        label: "My First Dataset",
        data: [65, 59, 90, 81, 56, 55, 40],
        backgroundColor: "rgba(255, 99, 132, 0.3)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

  const polarAreaChartData = {
    labels: ["Red", "Green", "Yellow", "Grey", "Blue"],
    datasets: [
      {
        label: "Dataset 1",
        data: [11, 16, 7, 3, 14],
        backgroundColor: [
          "rgb(255, 99, 132, 0.7)",
          "rgb(75, 192, 192, 0.7)",
          "rgb(255, 205, 86, 0.7)",
          "rgb(201, 203, 207, 0.7)",
          "rgb(54, 162, 235, 0.7)",
        ],
      },
    ],
  };

  // Common chart options for responsiveness
  const commonChartOptions = {
    responsive: true,
    maintainAspectRatio: false, // Allow charts to fill container height
    plugins: {
      legend: { position: "top" },
      title: { display: true },
    },
  };

  return (
    <>
      <motion.div
        className="flex flex-col items-center justify-center py-8 px-2 sm:py-12 sm:px-4 " // Adaptive padding
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          variants={itemVariants}
          className="text-4xl sm:text-5xl mx-auto text-center mb-10 font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-blue-700 to-indigo-600 drop-shadow-lg" // Responsive font size
        >
          Welcome to Excel Analytics
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3  gap-4 w-full max-w-7xl" // Responsive grid layout
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Mobile-specific Upload Button (Top) */}
          <div className="col-span-full flex justify-center items-center md:hidden">
            {" "}
            {/* Visible only on mobile */}
            <motion.div variants={itemVariants} className="w-full max-w-lg">
              <Card
                className="rounded-xl shadow-none cursor-pointer hover:shadow-2xl hover:shadow-blue-500 transform hover:scale-105 transition-all duration-300 bg-white"
                onClick={gotoUpload}
              >
                <CardBody className="flex flex-col items-center justify-center p-10">
                  <Typography
                    variant="h6"
                    color="gray"
                    className="mb-4 uppercase flex items-center gap-2"
                  >
                    {/* Icon for Upload - e.g., an upload cloud or arrow icon */}
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
            </motion.div>
          </div>

          {/* Top Row Charts */}
          <motion.div variants={itemVariants} className="col-span-1">
            <Card className="rounded-xl shadow-none cursor-pointer hover:shadow-xl hover:shadow-teal-300 transform hover:scale-105 transition-all duration-300 h-full">
              <CardBody className="flex flex-col items-center justify-center p-6">
                <Typography
                  variant="h6"
                  color="gray"
                  className="mb-4 uppercase text-center flex items-center gap-2 font-semibold"
                >
                  {/* Icon for Monthly Sales - e.g., a bar chart icon or trending up/down */}
                  Monthly Sales
                </Typography>
                <div className="h-48 w-full">
                  <Bar
                    data={barChartData}
                    options={{
                      ...commonChartOptions,
                      plugins: {
                        title: { display: true, text: "Monthly Sales" },
                      },
                    }}
                  />
                </div>
              </CardBody>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants} className="col-span-1">
            <Card className="rounded-xl shadow-none cursor-pointer hover:shadow-xl hover:shadow-orange-300 transform hover:scale-105 transition-all duration-300 h-full">
              <CardBody className="flex flex-col items-center justify-center p-6">
                <Typography
                  variant="h6"
                  color="gray"
                  className="mb-4 uppercase text-center flex items-center gap-2 font-semibold"
                >
                  {/* Icon for Category Distribution - e.g., a pie chart icon */}
                  Category Distribution
                </Typography>
                <div className="h-48 w-full">
                  <Pie
                    data={pieChartData}
                    options={{
                      ...commonChartOptions,
                      plugins: {
                        title: { display: true, text: "Category Distribution" },
                      },
                    }}
                  />
                </div>
              </CardBody>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants} className="col-span-1">
            <Card className="rounded-xl shadow-none cursor-pointer hover:shadow-xl hover:shadow-pink-300 transform hover:scale-105 transition-all duration-300 h-full">
              <CardBody className="flex flex-col items-center justify-center p-6">
                <Typography
                  variant="h6"
                  color="gray"
                  className="mb-4 uppercase text-center flex items-center gap-2 font-semibold"
                >
                  {/* Icon for Daily Trends - e.g., a line chart icon or growth icon */}
                  Daily Trends
                </Typography>
                <div className="h-48 w-full">
                  <Line
                    data={lineChartData}
                    options={{
                      ...commonChartOptions,
                      plugins: {
                        title: { display: true, text: "Daily Trends" },
                      },
                    }}
                  />
                </div>
              </CardBody>
            </Card>
          </motion.div>

          {/* Tablet/Laptop-specific Upload Button (Middle) */}
          <div className="col-span-full md:col-span-3  flex justify-center items-center hidden md:flex">
            {" "}
            {/* Hidden on mobile, visible on tablet/laptop */}
            <motion.div variants={itemVariants} className="w-full max-w-lg">
              <Card
                className="rounded-xl shadow-none cursor-pointer hover:shadow-2xl hover:shadow-blue-500 transform hover:scale-105 transition-all duration-300 bg-white"
                onClick={gotoUpload}
              >
                <CardBody className="flex flex-col items-center justify-center p-10">
                  <Typography
                    variant="h5" // Larger for desktop
                    color="blue-gray"
                    className="mb-4 uppercase text-center flex items-center gap-3 font-extrabold text-blue-700"
                  >
                    {/* Icon for Upload - e.g., an upload cloud or arrow icon */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-8 text-blue-600" // Larger icon for desktop
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
            </motion.div>
          </div>

          {/* Bottom Row Charts */}
          <motion.div variants={itemVariants} className="col-span-1">
            <Card className="rounded-xl shadow-none cursor-pointer hover:shadow-xl hover:shadow-yellow-300 transform hover:scale-105 transition-all duration-300 h-full">
              <CardBody className="flex flex-col items-center justify-center p-6">
                <Typography
                  variant="h6"
                  color="gray"
                  className="mb-4 uppercase text-center flex items-center gap-2 font-semibold"
                >
                  {/* Icon for Traffic Source - e.g., a doughnut chart icon or network icon */}
                  Traffic Source
                </Typography>
                <div className="h-48 w-full">
                  <Doughnut
                    data={doughnutChartData}
                    options={{
                      ...commonChartOptions,
                      plugins: {
                        title: { display: true, text: "Traffic Source" },
                      },
                    }}
                  />
                </div>
              </CardBody>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants} className="col-span-1">
            <Card className="rounded-xl shadow-none cursor-pointer hover:shadow-xl hover:shadow-green-300 transform hover:scale-105 transition-all duration-300 h-full">
              <CardBody className="flex flex-col items-center justify-center p-6">
                <Typography
                  variant="h6"
                  color="gray"
                  className="mb-4 uppercase text-center flex items-center gap-2 font-semibold"
                >
                  {/* Icon for Performance Metrics - e.g., a radar chart icon or star icon */}
                  Performance Metrics
                </Typography>
                <div className="h-48 w-full">
                  <Radar
                    data={radarChartData}
                    options={{
                      ...commonChartOptions,
                      plugins: {
                        title: { display: true, text: "Performance Metrics" },
                      },
                    }}
                  />
                </div>
              </CardBody>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants} className="col-span-1">
            <Card className="rounded-xl shadow-none cursor-pointer hover:shadow-xl hover:shadow-red-300 transform hover:scale-105 transition-all duration-300 h-full">
              <CardBody className="flex flex-col items-center justify-center p-6">
                <Typography
                  variant="h6"
                  color="gray"
                  className="mb-4 uppercase text-center flex items-center gap-2 font-semibold"
                >
                  {/* Icon for Data Distribution - e.g., a polar area chart icon or circle icon */}
                  Data Distribution
                </Typography>
                <div className="h-48 w-full">
                  <PolarArea
                    data={polarAreaChartData}
                    options={{
                      ...commonChartOptions,
                      plugins: {
                        title: { display: true, text: "Data Distribution" },
                      },
                    }}
                  />
                </div>
              </CardBody>
            </Card>
          </motion.div>
        </motion.div>
      </motion.div>
    </>
  );
}
