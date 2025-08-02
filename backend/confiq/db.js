import mongoose from "mongoose";
const ConfigureData=async ()=>{
    // const dbUrl="mongodb://127.0.0.1:27017/Gen-Go-car-rentals"
    try{
        const db=await mongoose.connect(process.env.MONGO_DB);
        console.log("Connected to Mongodb")
    }catch(error){
        console.log("Connection error in mongodb")
    }
   
}
export default ConfigureData;