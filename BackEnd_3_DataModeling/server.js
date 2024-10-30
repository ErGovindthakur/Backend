// Creating our server here

// import express from 'express'

// const app = new express()

// const port = process.env.PORT || 7000

// app.use(express.static('dist'))

// app.get('/', (req,res) => {
//      res.send('This is default Route')
// })

// app.listen(port, () => {
//      console.log(`server is running at http://localhost:${port}`)
// })
import dotenv from "dotenv"

import connectDb from "./src/db/db.js"

dotenv.config({path:"./env"})

connectDb()