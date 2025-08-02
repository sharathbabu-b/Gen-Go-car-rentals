import React, { useState } from "react";
import { Camera } from "lucide-react";
import { useDispatch } from "react-redux";
import { updateUserAccount } from "../slices/userSlice";

function UpdateProfile({onClose,id}) {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  console.log(id)
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

  const handleSubmit = async(e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("phone", phone);

    // if (selectedFile) {
    //   formData.append("profileImage", selectedFile);
    // }
    try{
       const response = await dispatch(updateUserAccount({id,formData})).unwrap()
       if(response){
         onClose.handleUpdate(false);
       }
    }catch(error){
        console.log(error);
    }
  };

  return (
    <div className="inset-0 fixed z-50 flex items-center justify-center backdrop-blur-md bg-black/30 p-4">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-lg p-6 relative">
        {/* Close Button */}
        <button
          onClick={()=>{onClose.handleUpdate(false)}}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500 text-xl font-bold"
        >
          &times;
        </button>

        <h2 className="text-xl font-semibold text-gray-800 text-center mb-6">
          Update Profile
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Profile Image Upload */}
          <div className="flex justify-center">
            <div className="relative w-24 h-24">
              <img
                src={previewImage || "https://via.placeholder.com/150"}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover border-4 border-white shadow"
              />
              <label
                htmlFor="profileImage"
                className="absolute bottom-0 right-0 bg-white p-1.5 rounded-full shadow cursor-pointer hover:scale-105 transition"
              >
                <Camera className="text-indigo-600" size={18} />
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

          {/* Name Field */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">Name</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Phone Field */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">Phone</label>
            <input
              type="tel"
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center pt-4">
            <button
              type="submit"
              className="bg-indigo-600 text-white px-6 py-2 rounded-full hover:bg-indigo-700 transition"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateProfile;
