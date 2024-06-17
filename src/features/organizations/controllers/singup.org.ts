import { Request, Response, NextFunction } from 'express';
import { globalError } from '../../../utils/globalError';
import { statusCode } from '../../../utils/httpStatusCode';
import { SIGNUP_ORG_DTO } from '../interfaces/signup.org.dto';
import { orgExistsService } from '../services/org-exits.service';
import { createOrgService } from '../services/create-org.service';
import { confirmOrgEmailService } from '../services/confirm-email.org.service';
const { SUCCESS, FAIL, ERROR } = statusCode;

class SignupOrg {
    async signup_org(req: Request, res: Response, next: NextFunction) {
        const payload: SIGNUP_ORG_DTO = req.body;
        try {
            const orgExists = await orgExistsService(payload.name, payload.email, payload.licence);
            if (orgExists) {
                const err = new globalError('Organization already exits', 400, FAIL);
                return next(err);
            }
            const org = await createOrgService(payload);
            const email_sent = await confirmOrgEmailService(org.email, org.id, org.name);
            if (!email_sent) {
                const err = new globalError('An error occured while sending the email', 500, ERROR);
                return next(err);
            }
            res.json({
                status: SUCCESS,
                message: 'Organization successfully signed up',
                data: null
            });
        } catch (error: any) {
            res.status(500).json({
                status: ERROR,
                message: error.message
            });
        }
    }
}

const signup_org = new SignupOrg();
export default signup_org;
