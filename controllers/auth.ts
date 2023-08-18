import { Request, Response } from "express";
import User, { IUser } from "../models/user";
import bcryptjs from "bcryptjs";
import { ROLES } from "../helpers/constants";
import randomstring from "randomstring";
import { sendEmail } from "../mailer/mailer";
import { generateJWT } from "../helpers/generateJWT";

export const register = async (req: Request, res: Response): Promise<void> => {
  const { name, lastname, email, password, rol }: IUser = req.body;

  const user = new User({ name, lastname, email, password, rol });

  //creating salt from bcrypt, to encrypt the password as default value = 10
  const salt = bcryptjs.genSaltSync();

  //saving user with pass encrypted
  user.password = bcryptjs.hashSync(password, salt);

  const adminKey = req.headers["admin-key"];

  if (adminKey === process.env.KEYFORADMIN) {
    user.rol = ROLES.admin;
  }

  //creating a randomstringcode of 6 characters
  const newCode = randomstring.generate(6).toUpperCase();

  user.code = newCode;

  await user.save();

  await sendEmail(email, newCode, user.name);

  res.status(201).json({
    user,
  });
};

export const verifyUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { email, code } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      res.status(400).json({
        message: "No se encontró el email ingresado.",
      });
      return;
    }

    if (user.verified) {
      res.status(400).json({
        message: "El usuario ya ha sido verificado.",
      });
      return;
    }

    if (user.code !== code) {
      res.status(401).json({
        message: "El código de verificación ingresado es incorrecto",
      });
      return;
    }

    await User.findOneAndUpdate({ email }, { verified: true });

    res.status(200).json({
      message: "Usuario verificado correctamente.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error en el servidor",
    });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password }: IUser = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      res.status(400).json({
        message: "El email ingresado, no corresponde a un usuario registrado.",
      });
      return;
    }

    const validatePassword = bcryptjs.compareSync(password, user.password);
    if (!validatePassword) {
      res.status(400).json({
        message: "La contraseña ingresada, es incorrecta.",
      });
      return;
    }
    const token = await generateJWT(user.id);

    res.json({
      user,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error en el servidor",
    });
  }
};
