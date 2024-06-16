import { Request, Response, NextFunction } from "express";
import { wrapper } from "../../../middleware/asyncWrapper";
import { globalError } from "../../../utils/globalError";
import { statusCode } from "../../../utils/httpStatusCode";
import { emailExistsService } from "../services/emailExists.service";
import { SIGNIN_DTO } from "../interfaces/signin.dto";
import { passwordMatchService } from "../services/passwordMatch.service";
import { userService } from "../services/user.service";
import { generateJwt } from "../../../utils/generateJWT";
const { SUCCESS, FAIL } = statusCode

const signin = wrapper(async(req: Request, res: Response, next: NextFunction) => {
    const signin_dto: SIGNIN_DTO = req.body;
    const emailExists = await emailExistsService(signin_dto.email);
    if (!emailExists) {
        const err = new globalError("Invalid credentials", 401, FAIL);
        return next(err);
    }
    const passwordMatch = await passwordMatchService(signin_dto.password, signin_dto.email);
    if (!passwordMatch) {
        const err = new globalError("Invalid credentials", 401, FAIL);
        return next(err);
    }
    const user = await userService(signin_dto.email);
    const token = await generateJwt({id: user.id});
    res.status(200).send({
    status: SUCCESS,
    message: "User successfully logged in.",
    data: user,
    token: token
  });
})

export { signin }