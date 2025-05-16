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
        enum:["petrol","diesel","electric"]
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
        enum:["Point"],
        default:"Point"
        } ,
        coordinates: {
            type: [Number],     // latitude and longitude # geoapify 
    },
},
    images:{
        type:String, 
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
CarSchema.index({location:"2dsphere"})
const Cars=model("Cars",CarSchema)
export default Cars
