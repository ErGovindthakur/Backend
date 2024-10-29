// Setting up our data base connection

import mongoose from 'mongoose'

const connectDb = async() => {
     try {
          const response = await mongoose.connect(``)
     } catch (error) {
          console.log(`Database connection failed from db.js ${error.message}`)
     }
}