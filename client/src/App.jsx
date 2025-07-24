import { useState } from "react";
import "./index.css";
// import userService from "./services/userService";
import Attendence from "./pages/attendence";
import Unauthorised from "./pages/unauthorised/unauthorised";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Dashboard, Auth, AdminPanel } from "/src/components/layouts";
import { AuthProvider } from "@/components/auth/AuthContext"; // Import your AuthProvider
import ProtectedRoute from "@/components/auth/ProtectedRoute"; // Import your ProtectedRoute component

function App() {
  return (
    <>
      <AuthProvider>
        <Routes>
          {/* <AuthProvider> */}
          <Route element={<ProtectedRoute allowedRoles={["user"]} />}>
            <Route path="/dashboard/*" element={<Dashboard />} />
          </Route>
          <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
            <Route path="/admin/*" element={<AdminPanel />} />
          </Route>
          <Route path="/unauthorised" element={<Unauthorised />} />
          <Route path="/auth/*" element={<Auth />} />
          <Route path="/Attendance" element={<Attendence />} />
          {/* <Route path="*" element={<Na0vigate to="/Attendance" replace />} /> */}
          {/* </AuthProvider> */}
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
