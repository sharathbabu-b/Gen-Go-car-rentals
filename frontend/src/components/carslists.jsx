import { useSelector,useDispatch } from "react-redux";
import { useEffect } from "react";
import {useNavigate} from "react-router-dom"
import {fetchAllCars,assignEditId,deleteCars} from "../slices/carslices"
export default function CarLists(){
  const navigate=useNavigate()
  const dispatch=useDispatch()
  useEffect(()=>{
    dispatch(fetchAllCars())
  },[dispatch])
  const {userData} =useSelector((state)=>{
    return state.user
  })
  const {carsData}=useSelector((state)=>{
    return state.cars
  })
  console.log(carsData)
  return(
       <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4 text-center ">Available Cars</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {carsData.map((car) => (
          <div key={car._id} className="bg-white shadow-md rounded-2xl overflow-hidden">
            <img
              src={car.images || "https://tse3.mm.bing.net/th?id=OIP.cjUjzALkEKobv8G4Evr6GQHaEK&pid=Api&P=0&h=180"}
              alt={car.carName}
              className="w-full h-52 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold">{car.carName}</h3>
              <p className="text-gray-600">{car.brand} - {car.model} ({car.year})</p>
              <p className="text-sm mt-1">
                {car.fuel_type} • {car.transmission} • {car.seats} seats
              </p>
              <p className="mt-2 text-lg font-medium text-green-700">
                ₹{car.price_Per_Hour}/hr | ₹{car.price_Per_Day}/day
              </p>
             
              <div className="mt-3">
              {userData?.role=="user"&&  <button  onClick={()=>{
                navigate(`/carbooking/${car._id}`)
              }}className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                  Booknow
                </button>}

                {userData?.role=="provider"&& <button onClick={() => {
                    dispatch(assignEditId(car._id)); // Optional, for Redux
                  
                  }}
                  className="px-3 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500 transition mr-3"> Edit</button>}
                 {userData.role=="provider"&&  <button onClick={()=>{
                                const userConfirm=window.confirm("Are you sure?")
                                if(userConfirm){
                                     dispatch(deleteCars(car._id))
                 
                                }
                               }}
                                className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition">Delete</button>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
  