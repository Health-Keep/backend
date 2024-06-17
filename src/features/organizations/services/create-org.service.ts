import { hash } from 'bcryptjs';
import { SIGNUP_ORG_DTO } from '../interfaces/signup.org.dto';
import Organization from '../models/org-model';

export const createOrgService = async (payload: SIGNUP_ORG_DTO) => {
    const hashedPassword = await hash(payload.password, 10);
    const org = new Organization({
        name: payload.name,
        email: payload.email,
        password: hashedPassword,
        licence: payload.licence
    });
    org.save();
    return org;
};
