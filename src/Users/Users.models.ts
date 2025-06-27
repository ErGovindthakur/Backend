import mongoose ,{Document} from "mongoose";


interface IUser extends Document{
     name:string,
     email:string,
     password:string
}

const userSchema = new mongoose.Schema<IUser>({
name:{
     type:String,
     required:true,
     lowercase:true
},
email:{
     type:String,
     required:true,
     unique:true
},
password:{
     type:String,
     required:true,
}
},{timestamps:true})

export const usersModel = mongoose.model<IUser>("CarUser",userSchema)