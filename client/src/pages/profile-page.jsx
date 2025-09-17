import React, { useState, useEffect, useRef } from "react";
import { Card, CardBody, Typography } from "@material-tailwind/react";
import {
  PencilIcon,
  EnvelopeIcon,
  CalendarDaysIcon,
  DocumentArrowUpIcon,
  ChartBarIcon,
  XMarkIcon,
  CheckIcon,
} from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { useAuth } from "@/components/auth/AuthContext";
import fileuploadService from "@/services/api/fileupload.js";
import AuthService from "@/services/api/auth.js";
import { sweetAlert } from "@/components/SweetAlert/SweetAlert";

function ProfilePage() {
  const { user } = useAuth();
  const { login } = useAuth(); // Get login function to update user context
  const [stats, setStats] = useState({ uploads: 0, charts: 0 });
  const [editDialogVisible, setEditDialogVisible] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const { showSuccess, showError } = sweetAlert();
  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchUserStats = async () => {
      if (user) {
        try {
          const records = await fileuploadService.getFileRecords();
          const userRecords = records.filter((r) => r.user === user.id);
          const chartCount = userRecords.reduce(
            (sum, record) => sum + (record.chartCount || 0),
            0
          );

          setStats({
            uploads: userRecords.length,
            charts: chartCount,
          });
        } catch (error) {
          console.error("Failed to fetch user stats:", error);
        }
      }
    };

    fetchUserStats();
  }, [user]);

  const handleEditProfile = () => {
    setEditingUser({ ...user }); // Copy current user data to editing state
    setEditDialogVisible(true);
  };

  const handleEditChange = (field, value) => {
    setEditingUser((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setIsUploading(true);
      try {
        // 1. Upload the file using the fileuploadService
        const response = await fileuploadService.uploadFile(file);

        if (response && response.filePath) {
          // 2. Construct the full URL robustly using the URL constructor
          // This correctly handles all slash variations in base URL and file path
          const imageUrl = new URL(
            response.filePath,
            import.meta.env.VITE_BASE_URL
          ).href;
          // 3. Update the editing state with the new image URL
          handleEditChange("profilePicture", imageUrl);
        } else {
          showError("Image upload failed. Please try again.");
        }
      } catch (error) {
        console.error("Error uploading profile picture:", error);
        showError("An error occurred while uploading the image.");
      } finally {
        setIsUploading(false);
      }
    }
  };

  const handleRemovePicture = () => {
    handleEditChange("profilePicture", null);
    // Also clear the file input in case a file was selected
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleEditSave = async () => {
    try {
      // Call the API via AuthService to update the user profile
      const response = await AuthService.updateProfile(user.id, editingUser);
      if (response && response.token) {
        // Update the user context with the new token and user data
        login(response); // This will update localStorage and the user state in AuthContext
        setEditDialogVisible(false);
        showSuccess("Profile updated successfully!");
      } else {
        // Handle cases where the API returns an error or no token
        showError(response.msg || "Failed to update profile.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      showError(
        error.response?.data?.msg ||
          "An error occurred while updating the profile."
      );
    }
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="w-12 h-12 border-4 border-purple-500 rounded-full border-t-transparent animate-spin"></div>
      </div>
    );
  }

  const joinedDate = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Not available";

  return (
    <>
      <div className="flex flex-col px-4 py-10 mx-auto sm:px-6 lg:px-8 max-w-7xl ">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <Typography
            variant="h3"
            className="font-extrabold text-3xl text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-500"
          >
            My Profile
          </Typography>
          <Typography className="text-gray-600 dark:text-gray-400">
            Manage your personal details and track your activity.
          </Typography>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Left Column: Profile Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-1"
          >
            <Card className="w-full p-6 text-center shadow-lg rounded-2xl dark:bg-gray-800 hover:shadow-xl transition">
              <CardBody>
                <div className="flex justify-center mb-4">
                  {user.profilePicture ? (
                    <img
                      src={user.profilePicture}
                      alt="Profile"
                      className="h-24 w-24 rounded-full border-4 border-purple-500 object-cover shadow-lg"
                    />
                  ) : (
                    <div className="relative inline-flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border-4 border-purple-500 bg-gradient-to-r from-purple-600 to-indigo-500 shadow-lg">
                      <span className="text-5xl font-bold text-white">
                        {user.name?.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                </div>
                <Typography
                  variant="h5"
                  className="font-semibold text-gray-800 dark:text-white"
                >
                  {user.name}
                </Typography>
                {/* Role Badge */}
                <span className="mt-2 inline-block px-3 py-1 text-xs font-medium text-white rounded-full bg-gradient-to-r from-purple-600 to-indigo-500">
                  {user.role}
                </span>
                <div className="w-full my-6 border-t border-gray-200 dark:border-gray-700" />
                <div className="flex flex-col gap-3 text-left">
                  <div className="flex items-center gap-3">
                    <EnvelopeIcon className="w-5 h-5 text-purple-500" />
                    <Typography className="text-sm text-gray-700 dark:text-gray-300">
                      {user.email}
                    </Typography>
                  </div>
                  <div className="flex items-center gap-3">
                    <CalendarDaysIcon className="w-5 h-5 text-purple-500" />
                    <Typography className="text-sm text-gray-700 dark:text-gray-300">
                      Joined on {joinedDate}
                    </Typography>
                  </div>
                </div>{" "}
                <button
                  onClick={handleEditProfile}
                  className="flex items-center justify-center gap-2 mt-8 w-full px-5 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-200 ease-in-out"
                >
                  <PencilIcon className="w-5 h-5" /> Edit Profile
                </button>
              </CardBody>
            </Card>
          </motion.div>

          {/* Right Column: Stats and Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-8 lg:col-span-2"
          >
            {/* Stats Section */}
            <Card className="w-full p-6 shadow-lg rounded-2xl dark:bg-gray-800">
              <Typography
                variant="h6"
                className="mb-4 font-semibold text-gray-800 dark:text-white"
              >
                Activity Overview
              </Typography>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  className="flex items-center p-4 rounded-xl bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-gray-700 dark:to-gray-800"
                >
                  <div className="p-3 mr-4 text-white bg-purple-500 rounded-full shadow-md">
                    <DocumentArrowUpIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <Typography className="text-sm text-gray-600 dark:text-gray-400">
                      Files Uploaded
                    </Typography>
                    <Typography
                      variant="h4"
                      className="font-bold text-gray-900 dark:text-white"
                    >
                      {stats.uploads}
                    </Typography>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.03 }}
                  className="flex items-center p-4 rounded-xl bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-gray-700 dark:to-gray-800"
                >
                  <div className="p-3 mr-4 text-white bg-indigo-500 rounded-full shadow-md">
                    <ChartBarIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <Typography className="text-sm text-gray-600 dark:text-gray-400">
                      Charts Created
                    </Typography>
                    <Typography
                      variant="h4"
                      className="font-bold text-gray-900 dark:text-white"
                    >
                      {stats.charts}
                    </Typography>
                  </div>
                </motion.div>
              </div>
            </Card>

            {/* About Section */}
            <Card className="w-full p-6 shadow-lg rounded-2xl dark:bg-gray-800">
              <Typography
                variant="h6"
                className="mb-3 font-semibold text-gray-800 dark:text-white"
              >
                About Me
              </Typography>
              <Typography className="text-gray-600 dark:text-gray-400 leading-relaxed">
                This is a placeholder for a user biography. Users can provide a
                short description about themselves, their role, or their
                interests. This section can be made editable via the{" "}
                <span className="text-purple-600 dark:text-purple-400 font-medium">
                  'Edit Profile'
                </span>{" "}
                functionality.
              </Typography>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Edit Profile Dialog */}
      <Dialog
        header={
          <div className="text-xl font-semibold text-white bg-gradient-to-r from-purple-500 via-indigo-600 to-blue-600 px-5 py-3 rounded-t-lg shadow">
            Edit Profile
          </div>
        }
        visible={editDialogVisible}
        onHide={isUploading ? () => {} : () => setEditDialogVisible(false)}
        className="rounded-xl overflow-hidden shadow-2xl"
        style={{ width: "30rem", borderRadius: "1rem" }}
        modal
      >
        {editingUser && (
          <div className="flex flex-col gap-6 px-5 py-4 bg-gray-50 rounded-b-xl">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <InputText
                id="name"
                value={editingUser.name || ""}
                onChange={(e) => handleEditChange("name", e.target.value)}
                className="w-full mt-1 p-2 rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <InputText
                id="email"
                value={editingUser.email || ""}
                onChange={(e) => handleEditChange("email", e.target.value)}
                className="w-full mt-1 p-2 rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            {/* Profile Picture field */}
            <div>
              <label
                htmlFor="profilePicture"
                className="block text-sm font-medium text-gray-700"
              >
                Profile Picture
              </label>
              <div className="mt-2 flex items-center gap-4">
                {isUploading ? (
                  <div className="flex h-16 w-16 items-center justify-center">
                    <div className="h-10 w-10 animate-spin rounded-full border-4 border-purple-200 border-t-purple-500"></div>
                  </div>
                ) : editingUser.profilePicture ? (
                  <img
                    src={editingUser.profilePicture}
                    alt="Profile Preview"
                    className="h-16 w-16 rounded-full object-cover shadow-sm"
                  />
                ) : (
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-200 text-xs font-semibold text-gray-400 text-center">
                    No Image
                  </div>
                )}
                <div className="flex flex-col items-start gap-2">
                  <input
                    ref={fileInputRef}
                    type="file"
                    id="profilePicture"
                    accept="image/*"
                    disabled={isUploading}
                    onChange={handleFileChange}
                    onClick={(e) => {
                      // Allow re-selecting the same file
                      e.target.value = null;
                    }}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                  {editingUser.profilePicture && !isUploading && (
                    <button
                      type="button"
                      onClick={handleRemovePicture}
                      className="px-3 py-1 text-xs font-medium text-red-700 bg-red-100 rounded-full hover:bg-red-200"
                    >
                      Remove Picture
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-4 pt-6">
              <button
                disabled={isUploading}
                onClick={() => setEditDialogVisible(false)}
                className="px-5 py-2 rounded-lg bg-white text-gray-700 border border-gray-300 shadow-sm hover:bg-gray-100 hover:shadow-md transition-all duration-200 ease-in-out flex items-center gap-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <XMarkIcon className="w-5 h-5" />
                Cancel
              </button>

              <button
                disabled={isUploading}
                onClick={handleEditSave}
                className="px-5 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-200 ease-in-out flex items-center gap-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <CheckIcon className="w-5 h-5" />
                Save
              </button>
            </div>
          </div>
        )}
      </Dialog>
    </>
  );
}

export default ProfilePage;
