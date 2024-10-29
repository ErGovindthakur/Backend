// Creating here user Bank account Details

import mongoose from "mongoose";
// import { User } from "./user.model";

const bankAccountSchema = new mongoose.Schema({
     bankName:{
          type:String,
          required:true,
          unique:true,
          lowercase:true
     },
     accountNumber:{
          type:String,
          required:true,
          unique:true,
          lowercase:true
     },
     createdBy:{
          type:mongoose.Schema.Types.ObjectId,
          ref:"User"
     },
     isValid:{
          type:Boolean,
          default:true
     }
},{timestamps:true})

export const UserAccount = mongoose.model("UserAccount",bankAccountSchema)