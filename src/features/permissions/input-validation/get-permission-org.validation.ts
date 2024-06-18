import joi from 'joi';
import { Request, Response, NextFunction } from 'express';
import { statusCode } from '../../../utils/httpStatusCode';
const { FAIL } = statusCode;

const permissionOrgSchema = joi.object({
    org_id: joi.string().required().messages({
        'string.empty': 'A valid org_id is required.',
        'string.required': 'A valid org_id is required.'
    })
});

const permissionOrgValidation = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await permissionOrgSchema.validateAsync(req.query);
        next();
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).send({ status: FAIL, message: error?.message });
        }
    }
};

export { permissionOrgValidation };
