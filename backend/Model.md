
  
# GEN-GO CAR RENTALS 

* Models  

# UserSchema:-

     const userSchema= new Schema({
        name:{
            type:String,
            required:true,
        },
        email:{
            type:String,
            required:true,
        },
        password:{
            type:String,
            required:true,
        },
        Phone:String,
        role:{
        type: String,
        enum: ['user', 'admin', 'provider'],
        default: 'user'
        },
        isApporved:{
            type:Boolean,
            default:true,
        }
        isActive : Boolean,
     },{timestamps:true})


# Car Schema :- 
 const CarSchema =new Schema({
    carName:{
        type:String,
    },
    brand:{
        type:String
    },
    model:{
        type:String,
    },
    year:{
        type:Number
    },
    fuel_type:{
        type:String,
        Enum:["petrol","diesel","EV"]
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
        type:String,     // latitude and longitude # geoapify 
    },
    images:{
        type:String,    
    },
    gpsTrack:{
        type:Boolean,
        default:false,
    },
    availability: {
    type: Boolean,
    default: true,
    },
    CarSchema.index({ location: "2dsphere" }) 
   
 },{timestamps:true})

 # Booking Schema 
 const bookingSchema = new .Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  carId: {
    type: Schema.Types.ObjectId,
    ref: 'Car',
  },
  pickup_Location: String,
  dropoff_Location: String,
  startDate:{
    type:Date
  },
  endDate: { 
    type:Date
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


 # Payment Schema 
 const paymentSchema = new Schema({
  bookingId: {
    type: Schema.Types.ObjectId,
    ref: 'Booking',
  },
  userId: {
    type:Schema.Types.ObjectId,
    ref: 'User',
  },
  amount: Number,
  paymentMethod: String,         (Stripe / paypal )
  paymentStatus: {
     type: String,
     enum: ['success', 'failed'],
     default: 'success',
   },
  transactionId: String,
 },{timestamps:true})



 # Subscription Schema :-
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
    }
    isActive:{
        type:boolean,
        default:true
    }
    {timestamps:true}


 # Review Schema 
 const reviewSchema = new .Schema({
  car: { 
    type:Schema.Types.ObjectId, 
    ref: 'Car',  
  },
  user: { 
    type:Schema.Types.ObjectId, 
    ref: 'User', 
  },
  rating: { 
    type: Number,
    min: 1, 
    max: 5
 },
  comment: { S
    type: String 
    },
},{timestamps: true})







