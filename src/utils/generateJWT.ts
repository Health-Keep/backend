import jwt, { JwtPayload } from "jsonwebtoken";

const generateJwt = async(payload: JwtPayload) => {
    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY as string, {
        expiresIn: process.env.JWT_EXPIRATION as string,
    });
    return token;
}

export { generateJwt }