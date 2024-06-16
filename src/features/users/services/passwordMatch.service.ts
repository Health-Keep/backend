import User from "../models/user-model";
import { compare } from "bcrypt";

const passwordMatchService = async(password: string, email: string): Promise<boolean> => {
    const user = await User.findOne({ email })
    const matchedPassword = await compare(password, user?.password as string);
    if (!matchedPassword) return false;
    return true;
}

export { passwordMatchService }