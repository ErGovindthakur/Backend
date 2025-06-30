import mongoose, { Document } from "mongoose";

export interface ICar extends Document{
     name:string,
     brand:string,
     color:string,
     price:number,
     createdBy:mongoose.Types.ObjectId
}
const carSchema = new mongoose.Schema<ICar>({
     name:{
          type:String,
          required:true,
          lowercase:true
     },
     brand:{
          type:String,
          required:true,
          lowercase:true
     },
     color:{
          type:String,
          required:true,
          lowercase:true
     },
     price:{
          type:Number,
          required:true
     },
     createdBy:{
          type:mongoose.Schema.Types.ObjectId,
          ref:"CarUser",
     }

},{timestamps:true})


export default mongoose.model<ICar>("Car",carSchema)
