import joi from 'joi';
import { Request, Response, NextFunction } from 'express';
import { statusCode } from '../../../utils/httpStatusCode';
const { FAIL } = statusCode;

const signinSchema = joi.object({
    email: joi
        .string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'org'] } })
        .required()
        .messages({
            'string.empty': 'A valid email is required.',
            'string.email': 'A valid email is required.'
        }),
    password: joi.string().min(8).max(20).required().messages({
        'string.empty': 'A valid password is required.',
        'string.required': 'A valid password is required.',
        'string.min': 'Password must have at least 8 characters.',
        'string.max': 'A password must be of 20 characters or less.'
    }),
    licence: joi
        .string()
        .pattern(/^[0-9]{11,18}$/)
        .required()
        .messages({
            'string.empty': 'A licence number is required.',
            'string.required': 'A licence number is required.',
            'string.pattern.base': 'A licence number must have between 11 and 18 digits.'
        })
});

const signinOrgValidation = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await signinSchema.validateAsync(req.body);
        next();
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).send({ status: FAIL, message: error?.message });
        }
    }
};

export { signinOrgValidation };
