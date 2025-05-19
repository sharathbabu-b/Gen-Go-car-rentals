import { useState } from "react"
import { useParams } from "react-router-dom"
import { useSelector,useDispatch } from "react-redux"
import { createBooking } from "../../slices/bookingSlices"

export default function carbookingForm (){
    const {id}=useParams()
    const {bookingdata}=useSelector((state)=>{
        return state.booking
    })
    const {carData}=useSelector((state)=>{
        return state.cars
    })
    const {userData}=useSelector((state)=>{
        return state.user
    })

    const [pickup_location,setPickup_location]=useState("")
    const [car,setCar]=useState(id)
    const [dropoff_loaction,setDropoff_location]=useState("")
    const [start_Date,setStart_date]=useState("")
    const [end_Date,setEnd_Date]=useState("")
    const handleSubmit=async(e)=>{
        e.preventDefault()
    }
    return(
        <div>
            <h1>Booking Car</h1>
            <form onSubmit={handleSubmit}>
                 <input
                type="text"
                name="car"
                value={car}
                onChange={(e)=>setCar(e.target.value)}
                required
                className="w-full p-2 border rounded"
                />
                <input
                type="text"
                name="pickup_location"
                placeholder="Pickup Location"
                value={pickup_location}
                onChange={(e)=>setPickup_location(e.target.value)}
                required
                className="w-full p-2 border rounded"
                />
                <input type="text" name="dropoff_location" placeholder="Dropoff Location" onChange={(e)=>setDropoff_location(e.target.value)} required className="w-full p-2 border rounded"/>
                 <input 
                 type="date" name="startDate" value={start_Date} onChange={(e)=>setStart_date(e.target.value)} 
                 required className="w-full p-2 border rounded" />
                 <imput 
                 type="date" name="endDate" value={end_Date} onChange={(e)=>setEnd_Date(e.target.value)} required className="w-full p-2 border rounded"/>
                 <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Book Now

                 </button>
            </form>
        </div>
    )
}