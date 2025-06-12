import axios from "axios"
export const forwardGeocode=async(address)=>{
  try{
    const apiKey=process.env.GEOAPIFY_API_KEY;
    const url = `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(address)}&apiKey=${apiKey}`;
    const response=await axios.get(url)
    console.log(response.data)
    return response.data

  }catch(error){
    console.error("Geoapify errror:",error.message)
    throw new Error('Geoapify API failed')
  }
}