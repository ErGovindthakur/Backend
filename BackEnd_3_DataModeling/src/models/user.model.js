// Creating our models here using mongoose

import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
     userName: {
          type:String,
          required:true,
          lowercase:true,
          unique:true
     },
     email: {
          type:String,
          required:true,
          lowercase:true,
          unique:true
     },
     password:{
          type:String,
          required:true,
          required:[true,"Password is Required"]
     }
},
// Adding here timeStamps
{
     timestamps:true
}
)

export const User = mongoose.model("User",userSchema)
