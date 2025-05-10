import {Schema,model} from "mongoose"
const subscriptionSchema=({
    userId: {
        type:Schema.Types.ObjectId,
        ref: 'User'
        },
        UpgradePlan:{
            type:String,
            Enum:["Basic","Premium","Platinum"],
        },
        price:{
            type:Number,
        },
        start_date:{
            type:Date,
            default:Date.now
        },
        end_date:{
            type:Date,
        },
        isActive:{
            type:boolean,
            default:true
        }
},{timestamps:true})
const Subscription =model("Subscription",subscriptionSchema)
export default Subscription