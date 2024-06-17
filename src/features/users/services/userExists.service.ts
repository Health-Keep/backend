import { SIGNUP_DTO } from '../interfaces/signup.dto';
import User from '../models/user-model';

const userExistsService = async (payload: SIGNUP_DTO): Promise<boolean> => {
    const user = await User.findOne({
        $or: [{ email: payload.email }, { nin: payload.nin }]
    });
    return !!user;
};

export { userExistsService };
