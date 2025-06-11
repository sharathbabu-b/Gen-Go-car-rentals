
import  {Schema,model} from "mongoose"
const userSchema= new Schema({
    name:String,
    email:String,
    password:String,
    phone:String,
    role:{
        type:String,
        enum:["admin","user","provider"],
        default:"user"
    },
    profilePic:{
        type:String
    },
    isActive:Boolean,
    resetPasswordToken:String,
    resetPasswordExpires:Date,
    isApproved:{
        type:Boolean,
        default:false
    },
},{timestamps:true})
const User=model("User",userSchema)
export default User