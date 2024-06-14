import { Request, Response, NextFunction } from "express";
import { CustomError } from "../interfaces/CustomError";
import { statusCode } from "../utils/httpStatusCode";
const { FAIL } = statusCode

const notFound = (req: Request, res: Response, next: NextFunction) => {
    res.status(404).send({ status: FAIL, message: "Resource not found"})
}

export { notFound }