import { Router } from "express";
// Controllers
import { signup } from "../controllers/signup.users";
import { signin } from "../controllers/signin.users";
// Input's validation
import { signupValidation } from "../input-validation/signup.validation";
import { signinValidation } from "../input-validation/signin.validation";

const userRouter = Router()

userRouter.route("/signup").post(signupValidation, signup);
userRouter.route("/signin").post(signinValidation, signin);

export { userRouter }