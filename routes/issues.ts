import { Router } from "express";
import { postNewIssue } from "../controllers/issues";
import { validateJWT } from "../middlewares/validateJWT";
import { isAdmin } from "../middlewares/validateRol";
import { check } from "express-validator";
import { recolectErrors } from "../middlewares/recolectError";

const router = Router()

/**
 * @swagger
 * components:
 *  schemas:
 *   Create Issue:
 *    type: object
 *    properties:
 *      title:
 *        type: string
 *        description: Titulo del inconveniente
 *      description:
 *        type: string
 *        description: Descripción del inconveniente
 *      priority: 
 *        type: number
 *        description: Número de prioridad del inconveniente
 *    required:
 *      - title
 *      - description
 *      - priority
 *    example: 
 *      title: No funciona el carrito de compras
 *      description: El inconveniente sucede generalmente con usuarios @hotmail.com
 *      priority: 1
 */ 


/**
 * @swagger
 * /issues:
 *  post:
 *    summary: Endpoint para reportar inconveniente
 *    tags: [User Register]
 *    parameters:
 *      - in: header
 *        name: x-token
 *        description: Token de usuario logueado
 *        required: true
 *        schema: 
 *          type: string
 *    requestBody: 
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/Create Issue'
 *    responses:
 *      201:
 *        description: Reporte de inconvenientes creado exitosamente
 */

router.post("/", [
    validateJWT,
    isAdmin,
    check("title", "El título es obligatorio").not().isEmpty(),
    check("description", "La descripción es requerida").not().isEmpty(),
    check("priority", "El número de prioridad es requerido").not().isEmpty(),
    recolectErrors
], postNewIssue)

export default router