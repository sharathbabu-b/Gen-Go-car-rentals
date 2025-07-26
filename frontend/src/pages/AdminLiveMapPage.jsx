import React, { useEffect } from "react";
import axios from "../axios/axios";
import LiveCarMap from "../components/CarMapPage";
import { set } from "date-fns";
export default function AdminLiveMap(){
    const [cars,setCars]=useState([])
    useEffect(()=>{
        const fetchAllCars=async()=>{
            try {
                const response=await axios.get(`car/${id}`)
                setCars(response.data)
            }catch(error){
                console.log("Error fetching cars")
            }
        }
        fetchAllCars()
    },[])
    return <LiveCarMap initialCars={cars}/>
}