import { Request, Response, NextFunction } from "express";
import { ROLES } from "../helpers/constants";

export const isAdmin = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
    const {rol} = req.body.userConfirmed

    if(rol !== ROLES.admin){
        res.status(401).json({
            message: "No posee los permisos de usuario para reportar un error."
        })
        return
    }

    next();
}