import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserAccount, fetchUserAccount } from "../slices/userSlice";
import { toast } from "react-toastify";
import { Camera } from "lucide-react";
import { Link } from "react-router-dom";

function ProfilePage(){
    const dispatch = useDispatch();
  const { userData, loading } = useSelector((state) => state.user);
  console.log(userData)
  const fileInputRef = useRef(null);

  const [previewImage, setPreviewImage] = useState("");


  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">My Account</h1>

      {/* Profile Image */}
      <div className="relative w-36 h-36 mx-auto mb-6">
        <img
          src={previewImage}
          alt="Profile"
          className="w-36 h-36 rounded-full object-cover border-4 border-indigo-600 shadow-md"
        />
        <button
          type="button"
          onClick={() => fileInputRef.current.click()}
          className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
        >
          <Camera size={20} className="text-indigo-600" />
        </button>
        {/* <input
          type="file"
          name="image"
          ref={fileInputRef}
          onChange={handleChange}
          className="hidden"
          accept="image/*"
        /> */}
      </div>

      <div className="flex justify-center">
        <Link>Update Profile</Link>
      </div>

      {/* Account Form */}
      
    </div>)
}
export default ProfilePage;