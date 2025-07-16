import React, { useState, useEffect } from "react";
import EmplyeeService from "../services/api/empAtt";
import { Button } from "@material-tailwind/react";
import { MultiSelect } from "primereact/multiselect";

function Attendence() {
  const [form, setForm] = useState({ name: "", date: "", time: "" });
  const [records, setRecords] = useState([]);

  // Fetch attendance records on mount
  useEffect(() => {
    const getAttendanceRecords = async () => {
      try {
        const response = await EmplyeeService.getAllAttendence();
        const data = response || [];
        const getData = Array.isArray(data)
          ? data.map((record) => ({
              name: record.name,
              date: record.date,
              time: record.time,
            }))
          : [];
        setRecords(getData);
      } catch (error) {
        console.error("Error fetching attendance records:", error);
      }
    };
    getAttendanceRecords();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.name && form.date && form.time) {
      EmplyeeService.setAttendence(form)
        .then(() => {
          setRecords([...records, form]);
          setForm({ name: "", date: "", time: "" });
        })
        .catch((error) => {
          console.error("Error setting attendance:", error);
        });
    }
  };
  const [selectedCities, setSelectedCities] = useState(null);

  const cities = [
    { name: "New York", code: "NY" },
    { name: "Rome", code: "RM" },
    { name: "London", code: "LDN" },
    { name: "Istanbul", code: "IST" },
    { name: "Paris", code: "PRS" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <main className="flex flex-col items-center justify-start flex-1 mt-10">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col w-full max-w-md gap-4 p-6 mb-8 bg-white rounded-lg shadow-md"
        >
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            required
            className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <MultiSelect
            value={selectedCities}
            onChange={(e) => setSelectedCities(e.value)}
            options={cities}
            optionLabel="name"
            display="chip"
            placeholder="Select Cities"
            maxSelectedLabels={3}
            className="w-full md:w-20rem"
          />
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            required
            className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="time"
            name="time"
            value={form.time}
            onChange={handleChange}
            required
            className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="py-2 text-white transition bg-blue-600 rounded hover:bg-blue-700"
          >
            Submit
          </button>
          <Button>sd</Button>
        </form>
        <div className="w-full max-w-2xl">
          <table className="min-w-full overflow-hidden bg-white rounded-lg shadow">
            <thead>
              <tr className="bg-blue-100">
                <th className="px-4 py-3 text-left">Name</th>
                <th className="px-4 py-3 text-left">Date</th>
                <th className="px-4 py-3 text-left">Time</th>
              </tr>
            </thead>
            <tbody>
              {records.length === 0 ? (
                <tr>
                  <td colSpan={3} className="py-4 text-center text-gray-400">
                    No records yet.
                  </td>
                </tr>
              ) : (
                records.map((rec, idx) => (
                  <tr key={idx} className="border-t">
                    <td className="px-4 py-2">{rec.name}</td>
                    <td className="px-4 py-2">{rec.date}</td>
                    <td className="px-4 py-2">{rec.time}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

export default Attendence;
