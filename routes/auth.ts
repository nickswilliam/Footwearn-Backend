import { Router } from "express";
import { login, register, verifyUser } from "../controllers/auth";
import { check } from "express-validator";
import { existsEmail } from "../helpers/validationDB";
import { recolectErrors } from "../middlewares/recolectError";

const router = Router();

/**
 * @swagger
 * components:
 *  schemas:
 *   User:
 *    type: object
 *    properties:
 *      name:
 *        type: string
 *        description: Nombre completo del usuario
 *      lastname:
 *        type: string
 *        description: Apellido del usuario
 *      email: 
 *        type: string
 *        description: Email de registro del usuario
 *      password:
 *        type: string
 *        description: Contraseña del usuario
 *    required:
 *      - name
 *      - lastname
 *      - email
 *      - password
 *    example: 
 *      name: Alan Gonzalo
 *      lastname: Gutierrez
 *      email: alang@gmail.com
 *      password: "12345678"
 */  

/**
 * @swagger
 * /auth/register:
 *  post:
 *    summary: Endpoint para el registro de un nuevo usuario
 *    tags: [User]
 *    requestBody: 
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/User'
 *    responses:
 *      201:
 *        description: Nuevo usuario registrado
 */


/**
 * @swagger
 * /auth/register:
 *  post:
 *    summary: Registrar un usuario administrador.
 *    tags: [User]
 *    parameters:
 *      -in: header
 *       name: 
 *       description: Petición dentro del header de la api para registrar un usuario administrador
 *       schema: 
 *        type: object
 *        properties:
 *          key1:
 *            type: string
 *    responses:
 *      201:
 *      description: Usuario creado correctamente      
 */
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
