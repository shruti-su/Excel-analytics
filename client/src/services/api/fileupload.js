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


export default fileuploadService;