import dotenv from "dotenv"

import connectDb from "./db/db.js"

import { app } from "./app.js"

dotenv.config({path:"./env"})


connectDb()
.then(()=>{

     // Listening for error
     app.on("error",(err)=>{
          console.log("Error",err);
          throw err
     })
     
     // Listening actual apps
     app.listen(process.env.PORT || 9000,()=>{
          console.log(`Server is running at port ${process.env.PORT}`)
     })
})
.catch((err)=>{
     console.log("Mongodb connection Failed !!!",err)
})