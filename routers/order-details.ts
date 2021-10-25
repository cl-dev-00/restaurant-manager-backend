import { Router } from "express";
import { check } from "express-validator";

import { hasExistOrder, hasExistMenuItem } from '../helpers/db-validators';
import { validFields } from "../middlewares";

import {
    getOrderDetailByOrder,
    createOrderDetails,
    deleteOrderDetails,
} from '../controllers/order-detail';

const router = Router();

router.get('/:id/orders', [
    check('id').custom(hasExistOrder),
    validFields
], getOrderDetailByOrder);

router.post('/', [
    check('order_details')
        .not().isEmpty()
        .withMessage('Los order_details son obligatorios')
        .isArray({ min: 1 })
        .withMessage('order_details debe tener al menos un elemento'),
    check('order_details.*.idOrden')
        .not().isEmpty()
        .withMessage('El id de la orden es obligatorio')
        .isInt({ min: 1 })
        .withMessage('El id de la orden debe ser un entero positivo')
        .custom(hasExistOrder),
    check('order_details.*.id_item_menu')
        .not().isEmpty()
        .withMessage('El id_item_menu es obligatorio')
        .isInt({ min: 1 })
        .withMessage('El id_item_menu debe ser un entero positivo')
        .custom(hasExistMenuItem),
    check('order_details.*.cantidad')
        .not().isEmpty()
        .withMessage('La cantidad es obligatorio')
        .isInt({ min: 1 })
        .withMessage('La cantidad debe ser un entero positivo'),
    check('order_details.*.importe')
        .not().isEmpty()
        .withMessage('El importe es obligatorio')
        .isFloat()
        .withMessage('El importe debe ser un numero flotante'),
    check('order_details.*.comentario')
        .not().isEmpty()
        .withMessage('El comentario es obligatorio'),
    validFields
], createOrderDetails);

router.delete('/', [

], deleteOrderDetails);

export default router;