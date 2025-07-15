import React from 'react';
import {
  PieChart, Pie, Cell,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  LineChart, Line,
} from 'recharts';

const pieData = [
  { name: 'A', value: 400 },
  { name: 'B', value: 300 },
  { name: 'C', value: 300 },
];

const barData = [
  { name: 'Jan', uv: 4000, pv: 2400 },
  { name: 'Feb', uv: 3000, pv: 1398 },
  { name: 'Mar', uv: 2000, pv: 9800 },
];

const lineData = [
  { name: 'Week 1', value: 100 },
  { name: 'Week 2', value: 300 },
  { name: 'Week 3', value: 200 },
  { name: 'Week 4', value: 500 },
];

const COLORS = ['#8884d8', '#82ca9d', '#ffc658'];

export const AnalyzePage = ({ onBack }) => {
  return (
    <div className="p-6 bg-white rounded-xl shadow-xl max-w-4xl mx-auto mt-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Analytics Dashboard</h2>
        <button
          onClick={onBack}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Back
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Pie Chart */}
        <div>
          <h3 className="text-lg font-semibold mb-2 text-center">Pie Chart</h3>
          <PieChart width={250} height={250}>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              outerRadius={80}
              dataKey="value"
              label
            >
              {pieData.map((entry, index) => (
                <Cell key={'cell-${index}'} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>

        {/* Bar Chart */}
        <div>
          <h3 className="text-lg font-semibold mb-2 text-center">Bar Chart</h3>
          <BarChart width={250} height={250} data={barData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="uv" fill="#8884d8" />
            <Bar dataKey="pv" fill="#82ca9d" />
          </BarChart>
        </div>

        {/* Line Chart */}
        <div>
          <h3 className="text-lg font-semibold mb-2 text-center">Line Chart</h3>
          <LineChart width={250} height={250} data={lineData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="value" stroke="#ff7300" />
          </LineChart>
        </div>
      </div>
    </div>
  );
};