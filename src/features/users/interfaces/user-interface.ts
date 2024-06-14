import { Document } from "mongoose";

// interface for the patient 
interface IUser extends Document {
    name: string;
    email: string;
    gender: string;
    nin: number;
    password: string;
}

export default IUser;