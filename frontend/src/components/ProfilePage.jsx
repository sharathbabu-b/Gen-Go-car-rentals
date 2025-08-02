import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserAccount, updateUserAccount } from "../slices/userSlice";
import { toast } from "react-toastify";
import { Camera } from "lucide-react";
import UpdateProfile from "./UpdateProfile";

function ProfilePage() {
  const dispatch = useDispatch();
  const { userData, loading } = useSelector((state) => state.user);
  const [previewImage, setPreviewImage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [updateProfilestate,setUpdateProfileState] = useState(false);
  console.log(userData)
  useEffect(() => {
    dispatch(fetchUserAccount());
  }, [dispatch]);

  useEffect(() => {
    if (userData?.profileImage) {
      setPreviewImage(userData.profileImage);
    }
  }, [userData]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
      setSelectedFile(file);
    }
  };

  const handleUpdate = () => {
    // if (!selectedFile) {
    //   toast.warning("Please select an image first.");
    //   return;
    // }

    // const formData = new FormData();
    // formData.append("profileImage", selectedFile);

    // dispatch(updateUserAccount(formData))
    //   .unwrap()
    //   .then(() => toast.success("Profile updated successfully"))
    //   .catch(() => toast.error("Update failed"));
    setUpdateProfileState(!updateProfilestate);
  };


  console.log(updateProfilestate);
  return (
    <div className=" flex items-center justify-center px-4 mt-8 ">
      <div className="relative bg-white/80 backdrop-blur-md border border-gray-300 rounded-3xl shadow-2xl p-8 w-full max-w-2xl transition-all duration-300">

        {/* Header / Cover */}
        <div className="h-32 w-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl mb-16 relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 translate-y-[65%]">
            <div className="relative w-32 h-32">
              <img
                src={previewImage || "https://via.placeholder.com/150"}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-xl"
              />

              <label
                htmlFor="profileImage"
                className="absolute bottom-1 right-1 bg-white p-1.5 rounded-full shadow hover:scale-105 transition cursor-pointer"
              >
                <Camera className="text-indigo-600" size={20} />
              </label>

              <input
                type="file"
                id="profileImage"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </div>
          </div>
        </div>

        {/* User Info */}
        <div className="text-center mt-24">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 tracking-wide">
            {userData?.name || "User Name"}
          </h2>
          <p className="text-sm sm:text-base text-gray-500 mt-1">
            {userData?.email || "user@example.com"}
          </p>
        </div>

        <div className="mt-8 px-6 flex justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-center sm:text-left">
            <div className="flex flex-col items-center sm:items-start">
              <p className="text-sm font-medium text-gray-500">Role</p>
              <p className="text-lg font-semibold text-gray-700 mt-1">{userData?.role || "N/A"}</p>
            </div>
            <div className="flex flex-col items-center sm:items-start">
              <p className="text-sm font-medium text-gray-500">Phone</p>
              <p className="text-lg font-semibold text-gray-700 mt-1">{userData?.phone || "N/A"}</p>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <button
            onClick={handleUpdate}
            disabled={loading}
            className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 transition text-white font-semibold rounded-full shadow-md disabled:opacity-50"
          >
            {loading ? "Updating..." : "Update Profile"}
          </button>
        </div>

        {updateProfilestate&& <UpdateProfile onClose={{handleUpdate}} id={userData._id}/>}
      </div>
    </div>
  );
}

export default ProfilePage;
