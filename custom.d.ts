declare namespace Express {
    interface Request {
        decodedToken?: {
            id: string;
        };
    }
}
