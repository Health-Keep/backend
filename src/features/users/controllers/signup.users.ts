import { Request, Response, NextFunction } from 'express';
import { hash } from 'bcryptjs';
import { wrapper } from '../../../middleware/asyncWrapper';
import { globalError } from '../../../utils/globalError';
import { statusCode } from '../../../utils/httpStatusCode';
import { userExistsService } from '../services/userExists.service';
import { SIGNUP_DTO } from '../interfaces/signup.dto';
import { ninExistsService } from '../services/ninExsits.service';
import { createUserService } from '../services/createUser.service';
import { confirmOrgEmailService } from '../services/confirmEmail.service';
const { SUCCESS, FAIL, ERROR } = statusCode;

const signup = wrapper(async (req: Request, res: Response, next: NextFunction) => {
    const payload: SIGNUP_DTO = req.body;
    const user_exists = await userExistsService(payload);
    if (user_exists) {
        const err = new globalError('User already exists', 400, FAIL);
        return next(err);
    }

    const user = await createUserService(payload);
    const email_sent = await confirmOrgEmailService(user.email, user.id, user.name);
    if (!email_sent) {
        const err = new globalError('An error occured while sending the email', 500, ERROR);
        return next(err);
    }
    res.status(201).send({
        status: SUCCESS,
        message: 'User successfully registered.',
        data: null
    });
});

export { signup };
