require("dotenv").config()
const express=require("express")
const cors=require("cors")
const app=express()
const mongo =require("./shared/mongo");
const userRoute=require("./routes/user.routes");



app.use(cors())

app.use(express.json())
    
 mongo.connect()


app.use("/users",userRoute)


const port=process.env.PORT||3001

app.listen(port,()=>{
    console.log("Server is running on Port",port)
})
