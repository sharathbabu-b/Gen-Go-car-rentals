import express from "express"
import cors from "cors"
import morgan from "morgan"
import ConfigureData from "./confiq/db.js"
import dotenv from "dotenv"
import {checkSchema} from "express-validator"
import {userRegisterSchema,userLoginSchema} from "./app/validations/userValidations.js"
import { idValidationSchema } from "./app/validations/id-validations.js"
import { CarSchemaValidation } from "./app/validations/cars-validations.js"
import userCtrl from "./app/controllers/userController.js"
import CarCltr from "./app/controllers/carControllers.js"
import authenticationUser from "./app/middlewares/Authentication.js"
import authorization from "./app/middlewares/Authorization.js"
const app=express()
const port =3500
ConfigureData()
dotenv.config()
app.use(express.json())
app.use(cors())
app.use(morgan(":remote-addr :remote-user :method :url HTTP/:http-version :status :res[content-length] - :response-time ms"))

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
app.put("/updateuseraccount",authenticationUser,checkSchema(idValidationSchema),userCtrl.update)
app.put("/activation/:id",authenticationUser,authorization,checkSchema(idValidationSchema),userCtrl.UpdateActivation)

// Car-routes
app.get("/getallcars",CarCltr.listAllCars)
app.post("/addCar",authenticationUser,authorization(["admin"]),checkSchema(CarSchemaValidation),CarCltr.create)
app.get("/car/:id",authenticationUser,authorization(["admin"]),checkSchema(idValidationSchema),CarCltr.getCarByid)
app.put("/updateCar/:id",authenticationUser,authorization(["admin"]),checkSchema(idValidationSchema),CarCltr.updateCar)
app.delete("/deleteCar/:id",authenticationUser.authorization(["admin"]),checkSchema(idValidationSchema),CarCltr.deleteCar)




app.listen(port,()=>{
    console.log("server is running on port",port)
})