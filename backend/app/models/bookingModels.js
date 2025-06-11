import {Schema,model} from "mongoose"
const bookingSchema=new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
      carId: {
        type: Schema.Types.ObjectId,
        ref: 'Cars',
      },
      pickup_Location: String,
      dropoff_Location: String,
      startDate:{
        type:String
      },
      endDate: { 
        type:String
        },
      totalPrice:{
        type:Number
      },
      paymentStatus: {
        type: String,
        enum: ['pending', 'paid', 'failed'],
        default: 'pending',
      },
      bookingStatus: {
        type: String,
        enum: ['booked', 'cancelled', 'completed'],
        default: 'booked',
      },
},{timestamps:true})
const Booking=model("Booking",bookingSchema)
export default Booking