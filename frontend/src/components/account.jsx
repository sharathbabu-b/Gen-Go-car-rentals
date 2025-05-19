import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";

export default function Account() {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(userData?.profileImage || '');
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);

  console.log(userData);
  if (!userData) {
    return false;
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setError(null);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setIsUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("profileImage", selectedFile);

      // Replace with your actual API endpoint
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload image");
      }

      const data = await response.json();
      const newImageUrl = data.imageUrl; // Adjust based on your API response

      // Dispatch action to update Redux store
      dispatch({
        type: "user/updateProfileImage",
        payload: { profileImage: newImageUrl },
      });

      // Clear selected file after successful upload
      setSelectedFile(null);
      setPreviewUrl(newImageUrl);
    } catch (err) {
      setError("Failed to upload profile photo. Please try again.");
      console.error(err);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-blue-100 shadow-xl rounded-2xl p-8 max-w-lg mx-auto mt-10 transition-transform hover:scale-105 duration-300">
      <div className="flex flex-col items-center">
        {/* Profile Image */}
        <div className="relative">
          <img
            src={previewUrl || 'https://luxecars.co.in/wp-content/uploads/2023/03/DSC06925-scaled.jpg'}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover border-4 border-indigo-200 shadow-md mb-6"
          />
          <label
            htmlFor="profileImage"
            className="absolute bottom-0 right-0 bg-indigo-600 text-white rounded-full p-2 cursor-pointer hover:bg-indigo-700 transition"
          >
            
          </label>
          <input
            id="profileImage"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
        {/* Upload Button */}
        {selectedFile && (
          <button
            onClick={handleUpload}
            disabled={isUploading}
            className={`mb-6 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition ${
              isUploading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isUploading ? "Uploading..." : "Upload Profile Photo"}
          </button>
        )}
        {/* Error Message */}
        {error && (
          <p className="text-red-500 text-sm mb-4">{error}</p>
        )}
        {/* Account Information */}
        <h1 className="text-3xl font-extrabold text-indigo-900 mb-6 tracking-tight">
          Account Information
        </h1>
        <div className="w-full space-y-4">
          <p className="text-gray-700 text-lg">
            <span className="font-semibold text-indigo-700">Name:</span> {userData.name}
          </p>
          <p className="text-gray-700 text-lg">
            <span className="font-semibold text-indigo-700">Email:</span> {userData.email}
          </p>
          <p className="text-gray-700 text-lg">
            <span className="font-semibold text-indigo-700">Role:</span> {userData.role}
          </p>
          <p className="text-gray-700 text-lg">
            <span className="font-semibold text-indigo-700">Phone Number:</span> {userData.phone}
          </p>
        </div>
      </div>
    </div>
  );
}