import User from "../models/user-model";

const ninExistsService = async(nin: string): Promise<boolean> => {
    const res = await User.findOne({ nin })
    return res ? true : false;
}

export { ninExistsService }