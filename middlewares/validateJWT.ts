import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import User, { IUser } from "../models/user";

export const validateJWT = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const token = req.headers["x-token"] as string;

  if (!token) {
    res.status(401).json({
      message: "No hay un usuario logueado.",
    });
    return;
  }

  try {
    const secretKey = process.env.SECRETPASS as string;
    const payload = jwt.verify(token, secretKey) as JwtPayload;

    const { id } = payload;

    const userConfirmed: IUser | null = await User.findById(id);

    if (!userConfirmed) {
      res.status(401).json({
        message: "Token ingresado, no válido o expirado.",
      });
      return;
    }

    req.body.userConfirmed = userConfirmed;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      message: "Token no válido",
    });
  }
};
