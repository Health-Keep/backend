import User from "../models/user-model";

const emailExistsService = async(email: string): Promise<boolean> => {
    const res = await User.findOne({ email })
    if (!res) return false;
    return true;
}

export { emailExistsService }