import { hash } from 'bcryptjs';
import { SIGNUP_DTO } from '../interfaces/signup.dto';
import User from '../models/user-model';

const createUserService = async (payload: SIGNUP_DTO) => {
    const hashedPass = await hash(payload.password, 10);
    const user = new User({
        name: payload.name,
        email: payload.email,
        password: hashedPass,
        nin: payload.nin,
        gender: payload.gender
    });
    await user.save();
    return user;
};

export { createUserService };
