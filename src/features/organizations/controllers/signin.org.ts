import User from '../models/org-model';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { globalError } from '../../../utils/globalError';
import { statusCode } from '../../../utils/httpStatusCode';
const { SUCCESS, FAIL } = statusCode;

class SigninOrg {
    async login_org(req: Request, res: Response, next: NextFunction) {
        const { email, password, licence } = req.body;
        try {
            if (!email || !password || !licence) {
                const err = new globalError('Email, Password and Licence are required', 400, FAIL);
                return next(err);
            }
            const user = await User.findOne({ email, licence });

            if (!user) {
                const err = new globalError('User not found', 404, FAIL);
                return next(err);
            }

            const isMatch = await bcryptjs.compare(password, user.password);
            if (!isMatch) {
                const err = new globalError('Invalid Email Or Password', 400, FAIL);
                return next(err);
            }

            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, { expiresIn: '1h' });
            res.json({
                status: SUCCESS,
                message: 'Logged in successfully',
                token
            });
        } catch (error: any) {
            res.status(500).json({
                status: 'Error',
                message: error.message
            });
        }
    }
}

const login_org = new SigninOrg();
export default login_org;
