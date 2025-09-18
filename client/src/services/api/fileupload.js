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
            // Use the new '/image' endpoint for profile pictures
            const response = await api.post(`${USER_BASE_PATH}upload`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            return response.data; // Axios puts the actual data in .data
        } catch (error) {
            console.error('Error uploading file:', error);
            throw error; // Re-throw error for the component to handle
        }
    },
    uploadProfilePicture: async (file) => {
        try {
            const formData = new FormData();
            // The key 'profilePicture' must match the field name in the multer middleware on the server
            formData.append('profilePicture', file);

            const response = await api.post(`${USER_BASE_PATH}profile-picture`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            return response.data;
        } catch (error) {
            console.error('Error uploading profile picture:', error);
            throw error;
        }
    },
    getFileRecords: async () => {
        try {
            const response = await api.get(`${USER_BASE_PATH}getall`);
            return response.data; // Axios puts the actual data in .data
        } catch (error) {
            console.error('Error fetching file records', error);
            throw error; // Re-throw the error for further handling if needed
        }
    },
    getCount: async () => {
        try {
            const response = await api.get(`${USER_BASE_PATH}count`);
            return response.data; // Axios puts the actual data in .data
        } catch (error) {
            console.error('Error fetching file count', error);
            throw error; // Re-throw the error for further handling if needed
        }
    },
    getLastUpload: async () => {
        try {
            const response = await api.get(`${USER_BASE_PATH}lastupload`);
            return response.data; // Axios puts the actual data in .data
        } catch (error) {
            console.error('Error fetching last upload', error);
            throw error; // Re-throw the error for further handling if needed
        }
    },
    deleteFileRecord: async (id) => {
        try {
            const response = await api.delete(`${USER_BASE_PATH}/delete/${id}`);
            return response.data; // Axios puts the actual data in .data
        } catch (error) {
            console.error('Error deleting file record', error);
            throw error; // Re-throw the error for further handling if needed
        }
    },
}


export default fileuploadService;