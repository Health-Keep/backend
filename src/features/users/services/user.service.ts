import IUser from "../interfaces/user-interface";
import User from "../models/user-model";

const userService = async(email: string): Promise<IUser> => {
    const res = await User.findOne({ email }).select('-password')
    return res as IUser;
}

export { userService }