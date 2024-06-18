import User from '../models/org-model';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { globalError } from '../../../utils/globalError';
import { statusCode } from '../../../utils/httpStatusCode';
import Organization from '../models/org-model';
const { SUCCESS, FAIL, ERROR } = statusCode;

class SigninOrg {
    async login_org(req: Request, res: Response, next: NextFunction) {
        const { email, password } = req.body;
        try {
            const org = await Organization.findOne({ email });

            if (!org) {
                const err = new globalError('Orginzation not found', 404, FAIL);
                return next(err);
            }

            const isMatch = await bcryptjs.compare(password, org.password);
            if (!isMatch) {
                const err = new globalError('Invalid credentials', 401, FAIL);
                return next(err);
            }

            const token = jwt.sign({ id: org._id }, process.env.JWT_SECRET as string, { expiresIn: '1h' });
            const orgWithoutPassword = await Organization.findOne({ email }).select('-password');
            res.json({
                status: SUCCESS,
                message: 'Logged in successfully',
                data: orgWithoutPassword,
                token
            });
        } catch (error: any) {
            res.status(500).json({
                status: ERROR,
                message: error.message
            });
        }
    }
}

const login_org = new SigninOrg();
export default login_org;
