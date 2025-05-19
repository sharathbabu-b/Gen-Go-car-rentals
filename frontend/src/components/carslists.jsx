import { useSelector,useDispatch } from "react-redux";
import React from "react";
export default function CarLists(){
  const {carsData}=useSelector((state)=>{
    return state.cars
  })
  return (
    <div>
      <h1>carsLists</h1>
      
    </div>
  )
}