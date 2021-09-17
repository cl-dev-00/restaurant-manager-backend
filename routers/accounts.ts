import { Router } from "express";
import { check } from "express-validator";

import {
    getAccounts,
    getAccount,
    createAccount,
    updateAccount,
    deleteAccount,
} from '../controllers';
import { hasExistAccount } from "../helpers/db-validators";
import { validFields } from "../middlewares";

const router: Router = Router();

router.get('/', getAccounts)

router.get('/:id', [
    check('id').custom(hasExistAccount),
    validFields
], getAccount);

router.post('/', [
    check('nombreCliente')
        .not().isEmpty()
        .withMessage('El nombre del cliente es obligatorio')
        .isLength({ min: 2 })
        .withMessage('El nombre debe tener al menos 2 caracteres'),
    check('fechaCuenta')
        .not().isEmpty()
        .withMessage('La fecha de la cuenta es obligatorio')
        .isDate()
        .withMessage('fechaCuenta debe ser una fecha'),
    check('idEmpleado')
        .not().isEmpty()
        .withMessage('EL id del empleado es obligatorio')
        .isInt()
        .withMessage('El id del empleado debe ser un numero entero'),
    validFields
], createAccount);

router.put('/:id', [
    check('id').custom(hasExistAccount),
    check('nombreCliente')
        .not().isEmpty()
        .withMessage('El nombre del cliente es obligatorio')
        .isLength({ min: 2 })
        .withMessage('El nombre debe tener al menos 3 caracteres'),
    check('fechaCuenta')
        .not().isEmpty()
        .withMessage('La fecha de la cuenta es obligatorio')
        .isDate()
        .withMessage('fechaCuenta debe ser una fecha'),
    check('idEmpleado')
        .not().isEmpty()
        .withMessage('EL id del empleado es  obligatorio')
        .isInt()
        .withMessage('El id del empleado debe ser un numero entero'),
    validFields
], updateAccount);

router.delete('/:id', [
    check('id').custom(hasExistAccount),
    validFields
], deleteAccount);

export default router;