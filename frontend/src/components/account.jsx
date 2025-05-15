import { useSelector } from "react-redux"
export default function Account(){
    const {userData}=useSelector((state)=>{
        return state.user
    })
    console.log(userData)
    if(!userData){
        return false
    }

     

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-blue-100 shadow-xl rounded-2xl p-8 max-w-lg mx-auto mt-10 transition-transform hover:scale-105 duration-300">
      <div className="flex flex-col items-center">
        {/* Profile Image */}
        <img
          src={userData.profileImage || 'https://via.placeholder.com/150'}
          alt="Profile"
          className="w-24 h-24 rounded-full object-cover border-4 border-indigo-200 shadow-md mb-6"
        />
        {/* Account Information */}
        <h1 className="text-3xl font-extrabold text-indigo-900 mb-6 tracking-tight">Account Information</h1>
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
};

