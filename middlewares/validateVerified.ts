import { Request, Response, NextFunction } from "express";

export const isVerified = async(req: Request, res: Response, next: NextFunction): Promise<void> =>{
    const {verified} = req.body.userConfirmed

    if(!verified){
        res.status(401).json({
            message: "El usuario no está verificado correctamente."
        });
        return;
    }
    next();
}