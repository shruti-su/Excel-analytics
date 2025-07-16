import React, { useState } from "react"; // Import useState
import { useNavigate } from "react-router-dom";
import {
  Pie,
  Bar,
  Line,
  Doughnut, // Added Doughnut as it's in the original code's imports
  Radar, // Added Radar
  PolarArea, // Added PolarArea
  Scatter,
} from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  ArcElement,
  BarElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  RadialLinearScale, // Needed for Radar and PolarArea charts
} from "chart.js";

// Register all necessary Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  ArcElement,
  BarElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  RadialLinearScale // Register for Radar and PolarArea
);

export const Charts = () => {
  // Use useState for selectedChart, initialized to null (no chart selected)
  const [selectedChart, setSelectedChart] = useState(null);

  // Function to handle chart click
  const handleChartClick = (chartName) => {
    setSelectedChart(chartName);
  };

  // Function to show all charts
  const handleShowAllCharts = () => {
    setSelectedChart(null);
  };

  // Pie Data
  const pieData = {
    labels: ["A", "B", "C"],
    datasets: [
      {
        data: [400, 300, 300],
        backgroundColor: ["#8884d8", "#82ca9d", "#ffc658"],
      },
    ],
  };

  // Bar Chart (Grouped)
  const barData = {
    labels: ["Jan", "Feb", "Mar"],
    datasets: [
      { label: "uv", data: [4000, 3000, 2000], backgroundColor: "#8884d8" },
      { label: "pv", data: [2400, 1398, 9800], backgroundColor: "#82ca9d" },
      {
        label: "Av",
        data: [1200, 1900, 3000],
        backgroundColor: "#ffc658",
      },
    ],
  };

  // Line Chart
  const lineData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        label: "Value",
        data: [100, 300, 200, 500],
        borderColor: "#ff7300",
        fill: false,
      },
      {
        label: "Revenue",
        data: [200, 400, 300, 600],
        borderColor: "#8884d8",
        fill: false,
      },
    ],
  };

  // Column Chart (Horizontal Bar)
  const columnData = {
    labels: ["Product A", "Product B", "Product C", "Product D"],
    datasets: [
      {
        label: "Sales",
        data: [1200, 900, 1600, 700],
        backgroundColor: "#8884d8",
      },
    ],
  };

  // Area Chart (Using Line with fill)
  const areaData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
      {
        label: "Revenue",
        data: [4000, 3000, 5000, 4780, 5890, 4390, 4490],
        backgroundColor: "rgba(136, 132, 216, 0.5)",
        borderColor: "#8884d8",
        fill: true,
      },
    ],
  };

  // Scatter Plot
  const scatterData = {
    datasets: [
      {
        label: "Points",
        data: [
          { x: 10, y: 30 },
          { x: 20, y: 50 },
          { x: 30, y: 40 },
          { x: 40, y: 80 },
          { x: 50, y: 60 },
          { x: 60, y: 90 },
          { x: 70, y: 100 },
        ],
        backgroundColor: "#8884d8",
      },
    ],
  };

  // Histogram (treated like Bar Chart)
  const histogramData = {
    labels: ["0-10", "10-20", "20-30", "30-40", "40-50", "50-60"],
    datasets: [
      {
        label: "Frequency",
        data: [2, 5, 8, 4, 6, 3],
        backgroundColor: "#8884d8",
        borderColor: "#333",
        borderWidth: 2,
        barPercentage: 1.0,
        categoryPercentage: 1.0,
      },
    ],
  };

  const navigate = useNavigate();

  // Define a mapping of chart names to their components and data
  const chartComponents = {
    "Pie Chart": <Pie data={pieData} />,
    "Bar Chart": <Bar data={barData} />,
    "Line Chart": <Line data={lineData} />,
    "Column Chart": <Bar data={columnData} options={{ indexAxis: "y" }} />,
    "Area Chart": <Line data={areaData} />,
    "Scatter Plot": <Scatter data={scatterData} />,
    Histogram: <Bar data={histogramData} />,
    // Add other chart types if you plan to use them
    "Doughnut Chart": <Doughnut data={pieData} />, // Using pieData as example
    "Radar Chart": <Radar data={pieData} />, // Using pieData as example
    "Polar Area Chart": <PolarArea data={pieData} />, // Using pieData as example
  };

  return (
    <div className="p-6 bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 rounded-3xl shadow-2xl border-indigo-200 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h2 className="text-4xl font-extrabold text-indigo-700 drop-shadow-lg tracking-wide flex items-center gap-2">
          <span className="inline-block bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 text-white px-4 py-2 rounded-full shadow">
            📊
          </span>
          Analytics Dashboard
        </h2>
        <div className="flex gap-4">
          {selectedChart && (
            <button
              onClick={handleShowAllCharts}
              className="bg-gradient-to-r from-blue-400 to-cyan-500 text-white px-6 py-2 rounded-full shadow-lg hover:scale-105 transition-transform duration-200 font-semibold"
            >
              Show All Charts
            </button>
          )}
          <button
            onClick={() => navigate("/dashboard/upload")}
            className="bg-gradient-to-r from-red-400 to-pink-500 text-white px-6 py-2 rounded-full shadow-lg hover:scale-105 transition-transform duration-200 font-semibold"
          >
            ← Back
          </button>
        </div>
      </div>

      {/* Conditionally render all charts or the selected chart */}
      {!selectedChart ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {" "}
          {/* Increased gap for better spacing */}
          <ChartBlock
            title="Pie Chart"
            color="from-pink-200 to-pink-400"
            chartName="Pie Chart"
            onClick={handleChartClick}
          >
            <Pie data={pieData} />
          </ChartBlock>
          <ChartBlock
            title="Bar Chart"
            color="from-indigo-200 to-indigo-400"
            chartName="Bar Chart"
            onClick={handleChartClick}
          >
            <Bar data={barData} />
          </ChartBlock>
          <ChartBlock
            title="Line Chart"
            color="from-purple-200 to-purple-400"
            chartName="Line Chart"
            onClick={handleChartClick}
          >
            <Line data={lineData} />
          </ChartBlock>
          <ChartBlock
            title="Column Chart"
            color="from-blue-200 to-blue-400"
            chartName="Column Chart"
            onClick={handleChartClick}
          >
            <Bar data={columnData} options={{ indexAxis: "y" }} />
          </ChartBlock>
          <ChartBlock
            title="Area Chart"
            color="from-green-200 to-green-400"
            chartName="Area Chart"
            onClick={handleChartClick}
          >
            <Line data={areaData} />
          </ChartBlock>
          <ChartBlock
            title="Scatter Plot"
            color="from-yellow-200 to-yellow-400"
            chartName="Scatter Plot"
            onClick={handleChartClick}
          >
            <Scatter data={scatterData} />
          </ChartBlock>
          <ChartBlock
            title="Histogram"
            color="from-gray-200 to-gray-400"
            chartName="Histogram"
            onClick={handleChartClick}
          >
            <Bar data={histogramData} />
          </ChartBlock>
        </div>
      ) : (
        // Display only the selected chart, centered and larger
        <div className="flex justify-center items-center h-[calc(100vh-180px)]">
          {" "}
          {/* Adjust height as needed */}
          <ChartBlock
            title={selectedChart}
            color="from-white to-gray-100" // Default color for selected chart
            size={600} // Make the selected chart larger
          >
            {chartComponents[selectedChart]}
          </ChartBlock>
        </div>
      )}
    </div>
  );
};

// Reusable Chart Block wrapper
const ChartBlock = ({
  title,
  children,
  color,
  size = 320,
  chartName,
  onClick,
}) => (
  <div
    className={`bg-gradient-to-br ${
      typeof color === "string" ? color : "from-white to-gray-100"
    } rounded-2xl shadow-lg p-4 flex flex-col items-center justify-center border border-gray-200 hover:shadow-2xl hover:scale-105 transition-all duration-200 cursor-pointer`}
    onClick={() => onClick && onClick(chartName)} // Call onClick if provided
  >
    <h3 className="text-xl font-extrabold mb-3 text-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent drop-shadow-lg">
      {title}
    </h3>
    <div
      style={{
        width: size,
        height: size,
        margin: "auto",
        background: "rgba(255,255,255,0.7)",
        borderRadius: "1rem",
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
      }}
      className="flex items-center justify-center"
    >
      {children}
    </div>
  </div>
);