import { Router } from "express";
// Controllers
import { signup } from "../controllers/signup.users";
// Input's validation
import { signupValidation } from "../input-validation/signup.validation";

const userRouter = Router()

userRouter.route("/signup").post(signupValidation, signup);

export { userRouter }