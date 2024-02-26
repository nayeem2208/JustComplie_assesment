import { Document } from "mongoose";

export interface IUser extends Document{
    readonly id:number;
    readonly name:string;
    readonly age:string;
    readonly place:string;
}