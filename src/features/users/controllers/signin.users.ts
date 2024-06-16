import User from "../models/user-model";
import bcryptjs from "bcryptjs"
import jwt  from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { globalError } from "../../../utils/globalError";
import { statusCode } from "../../../utils/httpStatusCode";
const { SUCCESS, FAIL } = statusCode

class SigninPatient {

    async login_patient(req: Request, res: Response, next: NextFunction){
        const { email, password } = req.body;

        try {
            if (!email ||!password) {
                const err = new globalError("Email and Password are required", 400, FAIL);
                return next(err);
            }
            const user = await User.findOne({ email });
            if (!user) {
                const err = new globalError("Invalid Email or Password", 400, FAIL);
                return next(err);
            }
            const isMatch = await bcryptjs.compare(password, user.password);
            if (!isMatch) {
                const err = new globalError("Invalid Email Or Password", 400, FAIL);
                return next(err);
            }
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, { expiresIn: "1h" });
            res.json({
                status: SUCCESS,
                message: "Logged in successfully",
                token,
            });
        } catch (error : any) {
            res.status(500).json({
                status: "Error",
                message: error.message
            })
        }
    }
}

const login_patient  =  new SigninPatient()
export default login_patient