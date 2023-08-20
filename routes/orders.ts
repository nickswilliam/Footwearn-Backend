import { Router } from "express";
import { validateJWT } from "../middlewares/validateJWT";
import { recolectErrors } from "../middlewares/recolectError";
import { createOrders, getOrders } from "../controllers/orders";
import { isVerified } from "../middlewares/validateVerified";
import { check } from "express-validator";

const router = Router();

/**
 * @swagger
 * /orders:
 *  get:
 *    summary: Endpoint para obtener las ordenes o pedidos realizados por un usuario registrado
 *    tags: [Get Orders]
 *    parameters:
 *      - in: header
 *        name: x-token
 *        description: Clave token correspondiente a un usuario logueado.
 *        required: true
 *        schema: 
 *          type: string
 *          default: "token-brindado-por-la-DB"
 *    responses:
 *      200:
 *        description: Obtención de pedidos con éxito
 */

router.get("/", [validateJWT, recolectErrors], getOrders);


/**
 * @swagger
 * components:
 *  schemas:
 *   Shipping Details:
 *      type: object
 *      properties:
 *          name:
 *              type: string
 *              description: Nombre de la persona que hizo el pedido
 *          cellphone:
 *              type: number
 *              description: Teléfono de la persona que hizo el pedido
 *          location:
 *              type: string
 *              description: Localidad de la persona que hizo el pedido
 *          adress:
 *              type: string
 *              description: Dirección de la persona que hizo el pedido
 *      required:
 *         - name
 *         - cellphone
 *         - location
 *         - adress
 *   
 *   Images:
 *      type: object
 *      properties:
 *          id:
 *              type: number
 *              description: número de ID de la imágen
 *          img:
 *              type: string
 *              description: URL de la imagen del producto
 *      required:
 *         - id
 *         - img
 *      
 *   Cart Items:
 *      type: object
 *      properties:
 *          id:
 *            type: number
 *            description: N° de ID del producto
 *          title:
 *            type: string
 *            description: Titulo del producto
 *          price:
 *            type: number
 *            description: Precio del producto.
 *          sizeSelect:
 *            type: number
 *            description: Talle del producto
 *          brand:
 *            type: string
 *            description: Marca del producto
 *          quantity:
 *            type: number
 *            description: Cantidad en (unidades) del producto
 *          discount:
 *            type: number
 *            description: Descuento del producto (en %, si es aplicable)
 *          description: 
 *            type: string
 *            description: Descripción del producto
 *          imgs:
 *            type: array
 *            items:
 *              $ref: '#/components/schemas/Images'
 *      required:
 *         - id
 *         - title
 *         - price
 *         - sizeSelect
 *         - brand
 *         - quantity
 *         - discount
 *         - description
 *         - imgs    
 * 
 *   Create Order:
 *    type: object
 *    properties:
 *      price:
 *        type: number
 *        description: Precio de la orden
 *      shippingCost:
 *        type: number
 *        description: Costo de envío de la orden
 *      total: 
 *        type: number
 *        description: Precio final de la orden (suma de precio de orden + costo de envío)
 *      shippingDetails:
 *        type: object
 *        $ref: '#/components/schemas/Shipping Details'
 *      cartItems:
 *          type: array
 *          items:
 *             $ref: '#/components/schemas/Cart Items'
 *    required:
 *      - price
 *      - shippingCost
 *      - total
 *      - shippingDetails
 *      - cartItems
 *    example:
 *      price: 22500
 *      shippingCost: 1500
 *      total: 24000
 *      shippingDetails: 
 *          name: Alan Gomez
 *          cellphone: 1122334455
 *          location: Burzaco
 *          adress: Calle 1234 
 *      
 *      cartItems:
 *          - id: 101
 *            title: Adidas Runner
 *            price: 22500
 *            sizeSelect: 41
 *            brand: Adidas
 *            quantity: 1
 *            discount: 0
 *            description: Adidas runner 2.0 white shoes
 *            imgs:
 *              - id: 1
 *                img: https://www.adidas.com.ar/
 *              - id: 2
 *                img: https://www.adidas.com.ar/02
 */

/**
 * @swagger
 * /orders/:
 *  post:
 *    summary: Endpoint para crear una nueva orden de compra
 *    tags: [Create Order]
 *    parameters:
 *      - in: header
 *        name: x-token
 *        description: Clave token de usuario logueado
 *        required: true
 *        schema: 
 *          type: string
 *    requestBody: 
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/Create Order'
 *    responses:
 *      201:
 *        description: Orden creada con exito
 */

router.post("/", [validateJWT, isVerified, 
    check("price", "El precio es obligatorio").not().isEmpty(),
    check("shippingCost", "El costo de envío es obligatorio").not().isEmpty(),
    check("shippingDetails", "Los detalles de envío son obligatorio").not().isEmpty(),
    check("total", "El costo total es obligatorio").not().isEmpty(),
    check("cartItems", "El array de items es obligatorio").not().isEmpty(),
    recolectErrors
], createOrders);

export default router;
