import {Schema,model} from "mongoose"

const paymentSchema= new Schema({
    bookingId: {
        type: Schema.Types.ObjectId,
        ref: 'Booking',
      },
      userId: {
        type:Schema.Types.ObjectId,
        ref: 'User',
      },
      amount: Number,
      paymentMethod: {type:String,enum:["razorpay"]},
      paymentStatus: {
         type: String,
         enum: ['success', 'pending','failed'],
         default: 'pending',
       },

      transactionId: String,
      razorpay_order_id:{type:String},
      razorpay_payment_id:{type:String},
      razorpay_signature:{
        type:String
      }
},{timestamps:true})
const Payment=model("Payment",paymentSchema)
export default Payment