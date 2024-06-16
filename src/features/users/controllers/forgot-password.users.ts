import { Request, Response, NextFunction } from "express";
import { wrapper } from "../../../middleware/asyncWrapper";
import { globalError } from "../../../utils/globalError";
import { statusCode } from "../../../utils/httpStatusCode";
import { emailExistsService } from "../services/emailExists.service";
import { FORGOT_PASSWORD_DTO } from "../interfaces/forgot-pass.dto";
import { userService } from "../services/user.service";
import { forgotPasswordEmailService } from "../services/forgotPassword.service";
const { SUCCESS, FAIL, ERROR } = statusCode

const forgotPassword = wrapper(async(req: Request, res: Response, next: NextFunction) => {
    const forgot_password_dto: FORGOT_PASSWORD_DTO = req.body;
    const emailExists = await emailExistsService(forgot_password_dto.email);
    if (!emailExists) {
        const err = new globalError("Invalid credentials", 401, FAIL);
        return next(err);
    }
    const user = await userService(forgot_password_dto.email);
    const email_sent = await forgotPasswordEmailService(user.email, user.id, user.name);
    if (!email_sent) {
        const err = new globalError("An error occured while sending the email", 500, ERROR);
        return next(err);
    }
    res.status(200).send({
    status: SUCCESS,
    message: "A reset password's link has been sent to your email",
    data: null
  });
})

export { forgotPassword }