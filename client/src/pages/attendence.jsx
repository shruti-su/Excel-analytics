import React, { useState, useEffect } from 'react';
import EmplyeeService from '../services/api/empAtt';


function Attendence() {
    const [form, setForm] = useState({ name: '', date: '', time: '' });
    const [records, setRecords] = useState([]);

    // Fetch attendance records on mount
    useEffect(() => {
        const getAttendanceRecords = async () => {
            try {
                const response = await EmplyeeService.getAllAttendence();
                const data = response|| [];
                const getData = Array.isArray(data)
                    ? data.map((record) => ({
                        name: record.name,
                        date: record.date,
                        time: record.time,
                    }))
                    : [];
                setRecords(getData);
            } catch (error) {
                console.error('Error fetching attendance records:', error);
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
                    setForm({ name: '', date: '', time: '' });
                })
                .catch((error) => {
                    console.error('Error setting attendance:', error);
                });
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            <header className="bg-blue-600 text-white py-6 shadow">
                <h1 className="text-3xl font-bold text-center">Attendance Page</h1>
            </header>
            <main className="flex-1 flex flex-col items-center justify-start mt-10">
                <form
                    onSubmit={handleSubmit}
                    className="bg-white p-6 rounded-lg shadow-md flex flex-col gap-4 w-full max-w-md mb-8"
                >
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <input
                        type="date"
                        name="date"
                        value={form.date}
                        onChange={handleChange}
                        required
                        className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <input
                        type="time"
                        name="time"
                        value={form.time}
                        onChange={handleChange}
                        required
                        className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <button
                        type="submit"
                        className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                    >
                        Submit
                    </button>
                </form>
                <div className="w-full max-w-2xl">
                    <table className="min-w-full bg-white rounded-lg shadow overflow-hidden">
                        <thead>
                            <tr className="bg-blue-100">
                                <th className="py-3 px-4 text-left">Name</th>
                                <th className="py-3 px-4 text-left">Date</th>
                                <th className="py-3 px-4 text-left">Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {records.length === 0 ? (
                                <tr>
                                    <td colSpan={3} className="text-center py-4 text-gray-400">
                                        No records yet.
                                    </td>
                                </tr>
                            ) : (
                                records.map((rec, idx) => (
                                    <tr key={idx} className="border-t">
                                        <td className="py-2 px-4">{rec.name}</td>
                                        <td className="py-2 px-4">{rec.date}</td>
                                        <td className="py-2 px-4">{rec.time}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </main>
            <footer className="bg-gray-200 text-center py-4 mt-10">
                <p className="text-gray-600">Footer content goes here.</p>
            </footer>
        </div>
    );
}

export default Attendence;