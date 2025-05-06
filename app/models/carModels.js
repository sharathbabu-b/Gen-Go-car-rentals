import {Schema,model} from "mongoose"
const CarSchema=new Schema({
    carName:{
        type:String,  
    },
    brand:{
        type:String,
    },
    model:{
        type:String,
    },
    year:{
        type:Number,
    },
    fuel_type:{
        type:String,
        enum:["petrol","diesel","EV"]
    },
    transmission:{
        type:String,
        Enum:["manual","automatic"]
    },
    seats:{
        type:Number  
    },
    price_Per_Hour:{
        type:Number,
    },
     price_Per_Day:{
        type:Number, 
    },
    location:{
        type:{
          type:String,
        enum:["point"],
        } ,
        coordinates: {
            type: [Number],     // latitude and longitude # geoapify 
    },
},
    images:{
        type:String,  
        default:[]  
    },

    gpsTrack:{
        type:Boolean,
        default:false,
    },
    availability:{
        type: Boolean,
        default: true,
    }, 
},{timestamps:true})
const Cars=model("Cars",CarSchema)
export default Cars
