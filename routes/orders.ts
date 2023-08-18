import { Router } from "express";
import { validateJWT } from "../middlewares/validateJWT";
import { recolectErrors } from "../middlewares/recolectError";
import { createOrders, getOrders } from "../controllers/orders";
import { isVerified } from "../middlewares/validateVerified";
import { check } from "express-validator";

const router = Router();

router.get("/", [validateJWT, recolectErrors], getOrders);
router.post("/", [validateJWT, isVerified, 
    check("price", "El precio es obligatorio").not().isEmpty(),
    check("shippingCost", "El costo de envío es obligatorio").not().isEmpty(),
    check("shippingDetails", "Los detalles de envío son obligatorio").not().isEmpty(),
    check("total", "El total de items es obligatorio").not().isEmpty(),
    check("cartItems", "El array de items es obligatorio").not().isEmpty(),
    recolectErrors
], createOrders);

export default router;
