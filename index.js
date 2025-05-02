import express from "express"
import cors from "cors"
import morgan from "morgan"
import ConfigureData from "./confiq/db.js"
const app=express()
const port =3500
ConfigureData()
app.use(cors())
app.use(morgan("short"))
app.use((req,res,next)=>{
    console.log(`Request Method:${req.method},URL:${req.url}`)
})

app.get("/",(req,res)=>{
    res.send("welcome to Gengo car rentals")


})
app.listen(port,()=>{
    console.log("server is running on port",port)
})