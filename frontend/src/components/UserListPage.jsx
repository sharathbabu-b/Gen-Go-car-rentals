import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllUsers, approveUser, rejectUser } from "../slices/userSlice";

export default function UserList() {
  const { users, loading} = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  const handleApprove = (id) => {
    dispatch(approveUser(id));
  };

  const handleReject = (id) => {
    if (window.confirm("Are you sure you want to reject this user?")) {
      dispatch(rejectUser(id));
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4 text-center">User List</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 divide-y divide-gray-200 shadow-md rounded-md overflow-hidden">
          <thead className="bg-blue-100">
            <tr>
              <th className="px-4 py-2 text-sm font-medium text-gray-700 text-left">Name</th>
              <th className="px-4 py-2 text-sm font-medium text-gray-700 text-left">Email</th>
              <th className="px-4 py-2 text-sm font-medium text-gray-700 text-left">Role</th>
              <th className="px-4 py-2 text-sm font-medium text-gray-700 text-left">Approved</th>
              <th className="px-4 py-2 text-sm font-medium text-gray-700 text-left">Status</th>
              <th className="px-4 py-2 text-sm font-medium text-gray-700 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading ? (
              <tr><td colSpan="6" className="text-center py-4">Loading...</td></tr>
            ) : (
              users.map((user) => (
                <tr key={user._id} className="hover:bg-gray-50 transition duration-200">
                  <td className="px-4 py-2 text-sm text-gray-800">{user.name}</td>
                  <td className="px-4 py-2 text-sm text-gray-800">{user.email}</td>
                  <td className="px-4 py-2 text-sm text-gray-800 capitalize">{user.role}</td>
                  <td className="px-4 py-2 text-sm text-gray-800">{user.isApproved ? "Yes" : "No"}</td>
                  <td className="px-4 py-2 text-sm">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        user.isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                      }`}
                    >
                      {user.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-4 py-2 space-x-2">
                    {!user.isApproved && user.role === "provider" && (
                      <>
                        <button
                          onClick={() => handleApprove(user._id)}
                          className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-xs"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleReject(user._id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs"
                        >
                          Reject
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
