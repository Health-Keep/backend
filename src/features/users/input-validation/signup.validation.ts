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
    nin: joi
        .string()
        .pattern(/^[0-9]{11,11}$/)
        .required()
        .messages({
            'string.empty': 'A national id number is required.',
            'string.required': 'A national id number is required.',
            'string.pattern.base': 'A national id number must have between 11 and 18 digits.'
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
