import { Router } from "express";
import { login, register, verifyUser } from "../controllers/auth";
import { check } from "express-validator";
import { existsEmail } from "../helpers/validationDB";
import { recolectErrors } from "../middlewares/recolectError";

const router = Router();

router.post(
  "/register",
  [
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("lastname", "El apellido es obligatorio").not().isEmpty(),
    check("email", "El email es obligatorio").isEmail(),
    check(
      "password",
      "La contraseña debe ser de 8 caracteres como mínimo"
    ).isLength({ min: 8 }),

    //custom validation
    check("email").custom(existsEmail),

    //middleware to colect errors
    recolectErrors,
  ],
  register
);

router.patch(
  "/verify",
  [
    check("email", "El email es obligatorio").isEmail(),
    check("code", "El código de verificación es requerido").not().isEmpty(),
    recolectErrors,
  ],
  verifyUser
);


router.post(
  "/login",
  [
    check("email", "Debe ingresar un mail para loguearse").isEmail(),
    check("password", "Debe ingresar una contraseña").not().isEmpty(),
    recolectErrors,
  ],
  login
);

export default router;
