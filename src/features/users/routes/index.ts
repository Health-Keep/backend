import { Router } from "express";
// Controllers
import { signup } from "../controllers/signup.users";
import { signin } from "../controllers/signin.users";
import { forgotPassword } from "../controllers/forgot-password.users";
// Input's validation
import { signupValidation } from "../input-validation/signup.validation";
import { signinValidation } from "../input-validation/signin.validation";
import { forgotPasswordValidation } from "../input-validation/forgot-password.validation";

const userRouter = Router()

userRouter.route("/signup").post(signupValidation, signup);
userRouter.route("/signin").post(signinValidation, signin);
userRouter.route("/forgot-password").post(forgotPasswordValidation, forgotPassword);

export { userRouter }