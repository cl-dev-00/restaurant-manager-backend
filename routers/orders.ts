import { Router } from "express";
import { check } from "express-validator";

import { hasExistAccount, hasExistMenuItem } from '../helpers/db-validators';
import { validFields } from "../middlewares";

import {
    getOrders,
    getOrdersByAccount,
    createOrders,
    deleteOrders,
} from '../controllers';

const router = Router();

router.get('/', getOrders);

router.get('/:id/account', [
    check('id').custom(hasExistAccount),
    validFields
], getOrdersByAccount);

router.post('/', [
    check('orders')
    .not().isEmpty()
    .withMessage('orders es obligatorio')
    .isArray({ min: 1 })
    .withMessage('orders debe tener al menos un elemento'),
    check('orders.*.idCuenta')
    .not().isEmpty()
    .withMessage('El id de la cuenta es obligatorio')
    .isInt()
    .withMessage('El id de la cuenta debe ser un entero')
    .custom(hasExistAccount),
    check('orders.*.id_item_name')
    .not().isEmpty()
    .withMessage('El id_item_name es obligatorio')
    .isInt()
    .withMessage('El id_item_name debe ser un entero')
    .custom(hasExistMenuItem),
    check('orders.*.cantidad')
    .not().isEmpty()
    .withMessage('La cantidad es obligatorio')
    .isInt({ min: 1 })
    .withMessage('La cantidad debe ser un entero mayor a cero'),
    check('orders.*.importe')
    .not().isEmpty()
    .withMessage('El importe es obligatorio')
    .isFloat()
    .withMessage('El importe debe ser un numero flotante'),
    validFields
], createOrders);

router.delete('/', [
        
], deleteOrders);



export default router;