import React, { useState } from "react";
import GeoapifyAutoComplete from "../components/Geoapify";
import CarMap from "../components/CarMap";
import axios from "../axios/axios"
export default function SearchCars(){
    const [loaction,setLocation]=useState(null)
    const[cars,setCars]=useState([])
    const handleSelect=async({lat,lon,address})=>{
        setLocation([lat,lon]);
        try{
        const response=await axios.get(`/nearbycars ?lat=${lat}&lon=${lon}`)
        console.log(response.data)
        setCars(response.data)
        }catch(error){
            console.error("Failed to fetch cars:",error)
        }

    }
    return (
        <div className="p-4 max-w-5xl mx-auto space-y-6">
            <h2 className="text-2xl font-semibold text-center">Find Cars Near You</h2>
            <div className="w-full">
                <GeoapifyAutoComplete onSelect={handleSelect} />
            </div>
            {loaction&& (
                <div className="w-full h-[500px] rounded-xl overflow-hidden shadow-md border">
                    <CarMap center={loaction} cars={cars}/>
                </div>
            )}
        </div>
    )

}