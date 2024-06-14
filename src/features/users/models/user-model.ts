import mongoose, { Schema } from "mongoose";
import IUser from "../interfaces/user-interface";

const UserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    gender: { type: String, required: true },
    nin: { type: Number, required: true, unique: true },
    password: { type: String, required: true },
})

const User = mongoose.model<IUser>("User", UserSchema);
export default User;