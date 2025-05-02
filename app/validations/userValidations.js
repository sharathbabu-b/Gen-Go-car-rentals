import User from "../models/userModel.js";
export const userRegisterSchema={
    email:{
        in:['body'],
        exists:{errorMessage:"Email field is required"},
        notEmpty:{errorMessage:"email field is not empty"},
        isEmail:{errorMessage:"Valid email required"},
        normalizeEmail:true,
        trim:true,
        custom:{
            options:async function (value){
                try{
                    const user=await User.findOne({email:value})
                    if(user){
                        throw new Error("Email is already exists try another email")
                    }
                }catch(err){
                    throw new Error(err.message)
                }
                return true

            }
        }
    },
    password:{
        exists:{errorMessage:"Password field is required"},
        notEmpty:{errorMessage:"Password cannot be empty"},
        isStrongPassword:{
            options:{
                minLength:8,
                minLowerCase:1,
                minUpperCase:1,
                minNumber:1,
                minSymbol:1
            },
            errorMessage:"password must contain atleast one lowercase,one uppercase,one number,one symbol and minmum of 8 characters "
        }
    },
    phone: {
        exists: { errorMessage: "Phone field is required" },
        notEmpty: { errorMessage: "Phone field cannot be empty" },
        matches: {
          options: [/^\d{10}$/],
          errorMessage: "Phone number must be exactly 10 digits"
        },
},
trim:true
}
export const userLoginSchema={
    email: {
        exists: { errorMessage: "Email is required" },
        notEmpty: { errorMessage: "Email cannot be empty" },
        isEmail: { errorMessage: "Please enter a valid email" },
        normalizeEmail: true,
        trim: true
      },
      password: {
        exists: { errorMessage: "Password is required" },
        notEmpty: { errorMessage: "Password cannot be empty" },
        isLength: {
          options: { min: 6 },
          errorMessage: "Password must be at least 6 characters"
        },
        trim: true
    }

}
