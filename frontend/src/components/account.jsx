import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { fetchUserAccount } from "../slices/userSlice";

export default function Account() {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);
  if (!userData) {
    return false;
  }

useEffect(()=>{
  dispatch(fetchUserAccount())
},[dispatch])
  return (
    <div className="bg-gradient-to-br from-indigo-50 to-blue-100 shadow-xl rounded-2xl p-8 max-w-lg mx-auto mt-10 transition-transform hover:scale-105 duration-300">
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
  );
}