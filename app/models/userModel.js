import mongoose, { STATES } from "mongoose";
import  {Schema,model} from "mongoose"
const userSchema= new Schema({
    name:String,
    email:String,
    password:String,
    role:{
        type:String,
        enum:["admin","user","provider"],
        default:"user"
    },
    isActive:Boolean
})