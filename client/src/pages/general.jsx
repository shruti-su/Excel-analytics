import React, { useState, useEffect } from "react";
import EmplyeeService from "../services/api/empAtt";
import { Button } from "@material-tailwind/react";
import { MultiSelect } from "primereact/multiselect";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
    useNavigate
} from "react-router-dom";
import { AuthProvider, useAuth } from "@/components/auth/AuthContext"; // Import your AuthProvider

function General() {
    const navigate = useNavigate();
    const { userRole } = useAuth(); // Destructure the login function from useAuth

    useEffect(() => {

        if (userRole() === "admin") {
            navigate("/admin/home");
        } else if (userRole() === "user") {
            navigate("/dashboard/home");
        } else {
            navigate("/auth/sign-in");
        }
    }, [userRole, navigate]);



}

export default General;
