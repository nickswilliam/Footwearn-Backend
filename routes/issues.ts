import { Router } from "express";
import { postNewIssue } from "../controllers/issues";
import { validateJWT } from "../middlewares/validateJWT";
import { isAdmin } from "../middlewares/validateRol";
import { check } from "express-validator";
import { recolectErrors } from "../middlewares/recolectError";

const router = Router()

router.post("/", [
    validateJWT,
    isAdmin,
    check("title", "El título es obligatorio").not().isEmpty(),
    check("description", "La descripción es requerida").not().isEmpty(),
    check("priority", "El número de prioridad es requerido").not().isEmpty(),
    recolectErrors
], postNewIssue)

export default router