// src/api/userService.js
import api from './../axiosConfig'; // Import your configured Axios instance

// Base path for user-related endpoints
const USER_BASE_PATH = 'auth/';


const AuthService = {
    loginUser: async (loginData) => {
        try {
            const response = await api.post(`${USER_BASE_PATH}login`, loginData);
            return response.data; // Axios puts the actual data in .data
        } catch (error) {
            console.error('Error logging in user:', error);
            throw error; // Re-throw the error to be handled by the calling component
        }
    },
    signUpUser: async (signUpData) => {
        try {
            const response = await api.post(`${USER_BASE_PATH}signup`, signUpData);
            return response.data; // Axios puts the actual data in .data
        } catch (error) {
            console.error('Error signing up user:', error);
            throw error; // Re-throw the error to be handled by the calling component
        }
    },
    googleLogin: async (googleData) => {
        try {
            const response = await api.post(`${USER_BASE_PATH}google-login`, googleData);
            return response.data; // Axios puts the actual data in .data
        } catch (error) {
            console.error('Error signing in with Google:', error);
            throw error; // Re-throw the error to be handled by the calling component
        }
    },
    forgotPassword: async (email) => {
        try {
            const response = await api.post(`${USER_BASE_PATH}forgot-password`, { email });
            return response.data; // Axios puts the actual data in .data
        } catch (error) {
            console.error('Error sending password reset email:', error);
            throw error; // Re-throw the error to be handled by the calling component
        }      
    },
    resetPassword: async (resetData) => {
        try {
            const response = await api.post(`${USER_BASE_PATH}reset-password`, resetData);
            return response.data; // Axios puts the actual data in .data
        } catch (error) {
            console.error('Error resetting password:', error);
            throw error; // Re-throw the error to be handled by the calling component
        }
    },
     getMe: async () => {
        try {
            // This route gets the currently authenticated user's full profile
            const response = await api.get(`${USER_BASE_PATH}me`);
            return response.data;
        } catch (error) {
            console.error('Error fetching user profile:', error);
            throw error;
        }
    },
    updateProfile: async (userId, userData) => {
        try {
            // The route is under 'auth', so we use the USER_BASE_PATH
            const response = await api.put(`${USER_BASE_PATH}profile/${userId}`, userData);
            return response.data;
        } catch (error) {
            console.error('Error updating user profile:', error);
            throw error;
        }
    },

};

export default AuthService;