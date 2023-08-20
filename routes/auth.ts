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
 *   User Register:
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
 * 
 *   Verify Registered User:
 *    type: object
 *    properties:
 *      email:
 *        type: string
 *        description: Email con el que se registró el usuario
 *      code:
 *        type: string
 *        description: Código recibido en la casilla de email del usuario
 *    required:
 *      - email
 *      - code
 *    example: 
 *      email: alang@gmail.com
 *      code: "6A2AF3"
 * 
 *   Login User:
 *    type: object
 *    properties:
 *      email:
 *        type: string
 *        description: Email con el que se registró el usuario
 *      password:
 *        type: string
 *        description: Contraseña con la que se registró el usuario
 *    required:
 *      - email
 *      - password
 *    example: 
 *      email: alang@gmail.com
 *      password: "12345678"
 */  


//Register new user - as simply user or admin
/**
 * @swagger
 * /auth/register:
 *  post:
 *    summary: Endpoint para el registro de un nuevo usuario
 *    tags: [User Register]
 *    parameters:
 *      - in: header
 *        name: admin-key
 *        description: Crear usuario administrador (Opcional)
 *        required: false
 *        schema: 
 *          type: string
 *    requestBody: 
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/User Register'
 *    responses:
 *      201:
 *        description: Usuario registrado correctamente
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

//Verify registered user
/**
 * @swagger
 * /auth/verify:
 *  patch:
 *    summary: Endpoint para verificar un usuario registrado
 *    tags: [Verify Registered User]
 *    requestBody: 
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/Verify Registered User'
 *    responses:
 *      200:
 *        description: Usuario verificado correctamente
 */

router.patch(
  "/verify",
  [
    check("email", "El email es obligatorio").isEmail(),
    check("code", "El código de verificación es requerido").not().isEmpty(),
    recolectErrors,
  ],
  verifyUser
);


//Login registered user
/**
 * @swagger
 * /auth/login:
 *  post:
 *    summary: Endpoint para loguear un usuario registrado
 *    tags: [Login registered user]
 *    requestBody: 
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/Login User'
 *    responses:
 *      200:
 *        description: Usuario logueado correctamente
 */

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
