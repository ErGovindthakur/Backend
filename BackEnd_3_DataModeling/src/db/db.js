// Setting up our data base connection

import mongoose from 'mongoose'
import {dbName} from '../constants.js'

const connectDb = async() => {
     try {
          const response = await mongoose.connect(`${process.env.MONGODB_URI}/${dbName}`)
          console.log("Mongo db host !! connected -: ",response.connection.host)
     } catch (error) {
          console.log(`Database connection failed from db.js ${error.message}`)
     }
}

export default connectDb