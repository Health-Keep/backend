import jwt, { JwtPayload } from "jsonwebtoken";

const emailJwt = async(payload: JwtPayload) => {
    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY as string, {
        expiresIn: process.env.JWT_EMAIL_EXPIRATION as string,
    });
    return token;
}

export { emailJwt }