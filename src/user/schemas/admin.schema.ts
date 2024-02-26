import * as mongoose from 'mongoose'

export const adminSchema=new mongoose.Schema({
     username:String,
     password:String
})