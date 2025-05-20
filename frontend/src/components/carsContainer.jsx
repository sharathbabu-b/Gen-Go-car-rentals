import {useDispatch,useSelector} from "react-redux"
import { fetchCars,deleteCars,assignEditId } from "../slices/carslices"
import { useEffect } from "react"
import Carsform from "./carsform"
export default function Cars(){
    const dispatch=useDispatch()
    const {carsData,loading}=useSelector((state)=>{
        return state.cars
    })
    useEffect(()=>{
        dispatch(fetchCars())
    },[dispatch])
    if(loading) return <p className="text-center mt-6 text-gray-600">Loading...</p>
    return (
        <div>
            <h1>Cars</h1>
            <Carsform/>
            

        </div>
    )
}