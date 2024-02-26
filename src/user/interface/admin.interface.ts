import { Document } from "mongoose";

export interface IAdmin extends Document{
    readonly username:string;
    readonly password:string;
}