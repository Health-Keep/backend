import { Router } from "express";
// Controllers
import { signup } from "../controllers/signup.users";
// Input's validation
import { signupValidation } from "../input-validation/signup.validation";
import login_patient from "../controllers/signin.users";

const userRouter = Router()


userRouter.route("/signup").post(signupValidation, signup);
userRouter.route("/login-patient").post(login_patient.login_patient);


export { userRouter }