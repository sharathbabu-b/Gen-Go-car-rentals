import React from "react";
import { useEffect,useRef } from "react";
import "@geoapify/geocoder-autocomplete/styles/minimal.css";
export default function GeoapifyAutoComplete({onSelect}){
    const autocompleteRef=useRef(null)
    useEffect(()=>{
        const script=document.createElement("script")
        script.src="https://unpkg.com/@geoapify/geocoder-autocomplete"
        script.onload=()=>{
            const autocomplete=new window.Geoapify.GeoapifyAutoComplete(
                autocompleteRef.current,
                process.env.REACT_APP_GEOAPIFY_API_KEY,
                {placeholder:"search location ...."}
            );
            autocomplete.on("select",(value)=>{
                if(value?.properties){
                    const {lat,lon,formatted}=value.properties
                    onSelect({lat,lon, address:formatted})
                }
            })
        }
        document.body.appendChild(script)
    },[onSelect])
    return <div ref={autocompleteRef} style={{width:"100%"}}/>
}

