import * as mongoose from "mongoose";

export const UserSchema = new mongoose.Schema({
   
    username:String,
   
    firstname:String,
    lastname:{
        type:String,
        default:""
    },

    email:String,

    password:String,
    confirm_password:String,
})

export interface User extends mongoose.Document{
    
    id:string
    username:string
    firstname:string
    lastname?:string
    email:string
    password:string
    confirm_password:string
}

export interface UserPayload {
    email:string;
    username:string;
}