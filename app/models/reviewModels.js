import {Schema,model} from "mongoose"
const reviewSchema=({
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
      comment: { 
        type: String 
        },
},{timestamps:true})
const Review=model("Review",reviewSchema)
export default Review