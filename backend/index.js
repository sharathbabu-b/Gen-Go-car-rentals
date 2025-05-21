import express from "express"
import cors from "cors"
// import morgan from "morgan"
import ConfigureData from "./confiq/db.js"
import dotenv from "dotenv"
import {checkSchema} from "express-validator"
import {userRegisterSchema,userLoginSchema} from "./app/validations/userValidations.js"
import { idValidationSchema } from "./app/validations/id-validations.js"
import { CarSchemaValidation } from "./app/validations/cars-validations.js"
import{bookingValidationSchema} from "./app/validations/booking-validations.js"
import {SubscriptionSchemaValidation} from "./app/validations/subscription.js"
import {createPaymentValidation} from "./app/validations/paymentValidations.js"
import {ReviewSchemaValidation} from "./app/validations/reviewValidations.js"
import userCtrl from "./app/controllers/userController.js"
import CarCltr from "./app/controllers/carControllers.js"
import authenticationUser from "./app/middlewares/Authentication.js"
import authorization from "./app/middlewares/Authorization.js"
import bookingCtrl from "./app/controllers/bookingController.js"
import  subscriptionCtrl from "./app/controllers/subscriptionplanControllers.js"
import reviewCtrl  from "./app/controllers/reviewController.js"
import paymentCtrl from "./app/controllers/paymentControllers.js"

const app=express()
const port =3500
ConfigureData()
dotenv.config()
app.use(express.json())
app.use(cors())
// app.use(morgan(":remote-addr :remote-user :method :url HTTP/:http-version :status :res[content-length] - :response-time ms"))

app.get("/",(req,res)=>{
    res.send("welcome to Gengo car rentals")
})
// User-routes
app.post("/register",checkSchema(userRegisterSchema),userCtrl.register)
app.post("/login",checkSchema(userLoginSchema),userCtrl.login)
app.get("/account",authenticationUser,userCtrl.account)
app.post("/forgotpassword",userCtrl.forgotPassword)
app.post("/reset-password/:token",userCtrl.resetPassword)
app.get("/allusers",authenticationUser,userCtrl.allusers)
app.delete("/removeaccountuser/:id",authenticationUser,checkSchema(idValidationSchema),userCtrl.delete)
app.put("/updateuseraccount/:id",authenticationUser,checkSchema(idValidationSchema),userCtrl.update)
app.put("/activation/:id",authenticationUser,authorization,checkSchema(idValidationSchema),userCtrl.UpdateActivation)

// Car-routes
app.get("/getallcars",CarCltr.listAllCars)
app.post("/addCar",authenticationUser,authorization(["admin","provider"]),checkSchema(CarSchemaValidation),CarCltr.create)
app.get("/car/:id",authenticationUser,authorization(["admin"]),checkSchema(idValidationSchema),CarCltr.getCarByid)
app.put("/updateCar/:id",authenticationUser,authorization(["admin","provider"]),checkSchema(idValidationSchema),CarCltr.updateCar)
app.delete("/deleteCar/:id",authenticationUser,authorization(["admin","provider"]),checkSchema(idValidationSchema),CarCltr.deleteCar)
// booking routes
app.get("/getallbooking",bookingCtrl.getAllBookings)
app.post("/createBooking",authenticationUser,authorization(["user"]),checkSchema(bookingValidationSchema),bookingCtrl.createBooking)
app.get("/getBookingId/:id",authenticationUser,authorization(["user"]),checkSchema(idValidationSchema),bookingCtrl.getbookingById)
app.put("updateBooking/:id",authenticationUser,authorization(["user"]),checkSchema(idValidationSchema),bookingCtrl.updateBooking)
app.delete("/deleteBooking/:id",authenticationUser,authorization(["user"]),checkSchema(idValidationSchema),bookingCtrl.deleteBooking)
app.put("/cancelBooking/:id",authenticationUser,authorization(["user"]),checkSchema(idValidationSchema),bookingCtrl.cancelBooking)

// SUBSCRIPTION PLANS ROUTES
app.get("/subscriptionsGetall", authenticationUser,authorization(['admin']),subscriptionCtrl.listAll)
app.post('/createsubscriptions',authenticationUser,authorization(['user', 'admin']),checkSchema(SubscriptionSchemaValidation),subscriptionCtrl.create);
app.put('/updatesubscriptions/:id', authenticationUser,authorization(['user', 'admin']),checkSchema(SubscriptionSchemaValidation),subscriptionCtrl.update);
app.delete('/removesubscriptions/:id',authenticationUser,authorization(['admin']),checkSchema(idValidationSchema),subscriptionCtrl.delete);
app.get('/subscriptions/:id',authenticationUser,authorization(['user', 'admin']),checkSchema(idValidationSchema),subscriptionCtrl.getById);

// payments
// app.post('/payment',authenticationUser,checkSchema(createPaymentValidation),paymentCtrl.createPayment);
app.get('/payments',authenticationUser,authorization(['admin']),paymentCtrl.getallPayments)
app.delete('/payment/:id',authenticationUser,authorization(['admin']),checkSchema(idValidationSchema),paymentCtrl.deletePayment)
app.get('/payment/:id',authenticationUser,checkSchema(idValidationSchema),paymentCtrl.getPaymentById)
// app.get('/payment/user',authenticationUser,paymentCtrl.getUserPayments)
app.post('/payment/razor',paymentCtrl.createRazorpayOrder)
app.post('/payments/verify-razorpay',paymentCtrl.verifyRazorpayPayment)
app.put('/payment/complete/:id',authenticationUser,checkSchema(idValidationSchema),paymentCtrl.completePayment)
//app.put('/payment/refund/:id',authenticationUser,checkSchema(idValidationSchema),paymentCtrl.refundPayment)


// reviewRoutes
app.post('/review',authenticationUser,checkSchema(ReviewSchemaValidation),reviewCtrl.createReview)
app.get('/reviewcars/:id',authenticationUser,checkSchema(idValidationSchema),reviewCtrl.getCarReviews)
app.get('/review/users/:id',authenticationUser,checkSchema(idValidationSchema),reviewCtrl.getUserReviews)
app.put('/reviewupdate/:id',authenticationUser,checkSchema(idValidationSchema),reviewCtrl.updateReview)
app.delete('/reviewdelete/:id',authenticationUser,checkSchema(idValidationSchema),reviewCtrl.deleteReview)




app.listen(port,()=>{
    console.log("server is running on port",port)
})