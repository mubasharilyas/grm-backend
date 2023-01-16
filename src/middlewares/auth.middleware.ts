
import jwt from 'jsonwebtoken';
import { Response, Request, NextFunction } from 'express'
export const Auth = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, process.env.JWT_TOKEN);
        next();
    } catch (error) {
        res.json({ errorMessage: "Authentication Failed" });

    }


}