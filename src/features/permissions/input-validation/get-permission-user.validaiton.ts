import joi from 'joi';
import { Request, Response, NextFunction } from 'express';
import { statusCode } from '../../../utils/httpStatusCode';
const { FAIL } = statusCode;

const permissionUserSchema = joi.object({
    user_id: joi.string().required().messages({
        'string.empty': 'A valid user_id is required.',
        'string.required': 'A valid user_id is required.'
    })
});

const permissionUserValidation = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await permissionUserSchema.validateAsync(req.query);
        next();
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).send({ status: FAIL, message: error?.message });
        }
    }
};

export { permissionUserValidation };
