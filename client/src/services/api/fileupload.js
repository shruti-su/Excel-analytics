// src/api/userService.js
import api from './../axiosConfig'; // Import your configured Axios instance

// Base path for user-related endpoints
const USER_BASE_PATH = 'upload/';


const fileuploadService = {
    uploadFile: async (file) => {
        try {
            const formData = new FormData();
            formData.append('file', file);
            for (let pair of formData.entries()) {
                console.log(pair[0], pair[1]);
            }
            const response = await api.post(`${USER_BASE_PATH}upload`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            return response.data; // Axios puts the actual data in .data
        } catch (error) {
            console.error('Error uploading file ');
        }
    }

}
// const AuthService = {
//     loginUser: async (loginData) => {
//         try {
//             const response = await api.post(`${USER_BASE_PATH}login`, loginData);
//             return response.data; // Axios puts the actual data in .data
//         } catch (error) {
//             console.error('Error logging in user:', error);
//             throw error; // Re-throw the error to be handled by the calling component
//         }
//     },
//     signUpUser: async (signUpData) => {
//         try {
//             const response = await api.post(`${USER_BASE_PATH}signup`, signUpData);
//             return response.data; // Axios puts the actual data in .data
//         } catch (error) {
//             console.error('Error signing up user:', error);
//             throw error; // Re-throw the error to be handled by the calling component
//         }
//     },
//     googleLogin: async (googleData) => {
//         try {
//             const response = await api.post(`${USER_BASE_PATH}google-login`, googleData);
//             return response.data; // Axios puts the actual data in .data
//         } catch (error) {
//             console.error('Error signing in with Google:', error);
//             throw error; // Re-throw the error to be handled by the calling component
//         }
//     },
//     /**
//      * Fetches all users.
//      * @returns {Promise<Array>} A promise that resolves to an array of user objects.
//      */

// };

export default fileuploadService;