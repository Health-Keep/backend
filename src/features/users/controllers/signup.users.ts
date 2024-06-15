import { Request, Response, NextFunction } from "express";
import { hash } from 'bcrypt'
import { wrapper } from "../../../middleware/asyncWrapper";
import { globalError } from "../../../utils/globalError";
import { statusCode } from "../../../utils/httpStatusCode";
import { emailExistsService } from "../services/emailExists.service";
import { SIGNUP_DTO } from "../interfaces/signup.dto";
import { ninExistsService } from "../services/ninExsits.service";
import User from "../models/user-model";
const { SUCCESS, FAIL } = statusCode

const signup = wrapper(async(req: Request, res: Response, next: NextFunction) => {
    const signup_dto: SIGNUP_DTO = req.body;
    const emailExists = await emailExistsService(signup_dto.email);
    if (emailExists) {
        const err = new globalError("Email already exists", 400, FAIL);
        return next(err);
    }
    const ninExists = await ninExistsService(signup_dto.nin);
    if (ninExists) {
        const err = new globalError("This national number already exists", 400, FAIL);
        return next(err);
    }
    const hashedPass = await hash(signup_dto.password, 10)
    const user = new User({
        name: signup_dto.name,
        email: signup_dto.email,
        password: hashedPass,
        nin: signup_dto.nin,
        gender: signup_dto.gender
    });
    await user.save();
    res.status(201).send({
    status: "SUCCESS",
    message: "User successfully registered.",
    data: null,
  });
})

export { signup }