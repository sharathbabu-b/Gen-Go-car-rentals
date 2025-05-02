import express from "express"
import cors from "cors"
import morgan from "morgan"
import ConfigureData from "./confiq/db.js"
import dotenv from "dotenv"
import {checkSchema} from "express-validator"
import {userRegisterSchema,userLoginSchema} from "./app/validations/userValidations.js"
import { idValidationSchema } from "./app/validations/id-validations.js"
import userCltr from "./app/controllers/userController.js"
import AuthenticateUser from "./app/middlewares/Authentication.js"
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

app.post("/register",checkSchema(userRegisterSchema),userCltr.register)
app.post("/login",checkSchema(userLoginSchema),userCltr.login)




app.listen(port,()=>{
    console.log("server is running on port",port)
})