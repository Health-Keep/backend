import joi from 'joi';
import { Request, Response, NextFunction } from 'express';
import { statusCode } from '../../../utils/httpStatusCode';
const { FAIL } = statusCode;

const signupSchema = joi.object({
    name: joi.string().required().min(3).max(30).messages({
        string: 'A full name is required.',
        'string.empty': 'A valid name is required.',
        'string.required': 'A valid name is required.',
        'string.min': 'A name must have at least 3 characters.',
        'string.max': 'A name must have less than 30 characters.'
    }),
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
    nin: joi.number().min(11).max(11).required().messages({
        'number.empty': 'A valid national id is required.',
        'number.required': 'A valid national id is required.',
        'number.min': 'A national id must have 11 digits.',
        'number.max': 'A national id must have 11 digits.'
    }),
    gender: joi.string().valid('Male', 'Female').required().messages({
        'string.empty': 'Gender is required.',
        'any.only': 'Gender must be either Male or Female.'
    })
});

const signupValidation = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await signupSchema.validateAsync(req.body);
        next();
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).send({ status: FAIL, message: error?.message });
        }
    }
};

export { signupValidation };
