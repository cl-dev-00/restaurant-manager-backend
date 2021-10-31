import { Router } from "express";
import { createTable, deleteTable, getTable, getTablesAvailable, getTables, updateTable } from "../controllers/tables";
import { hasExistTable } from '../helpers/db-validators';
import { validFields } from "../middlewares";
import { check } from 'express-validator';

const router = Router();

router.get('/', [

], getTables);

router.get('/available', [

], getTablesAvailable);

router.get('/:id', [
    check('id').custom(hasExistTable),
    validFields
], getTable);

router.post('/', [
    check('idComercial')
        .not().isEmpty()
        .withMessage('El idComercial es obligatorio')
        .isInt({ min: 1 })
        .withMessage('El idComercial debe ser un numero entero positivo'),
    check('capacidad')
        .not().isEmpty()
        .withMessage('La capacidad es obligatorio')
        .isInt({ min: 1 })
        .withMessage('La capacidad debe ser un numero entero positivo'),
    check('disponible')
        .not().isEmpty()
        .withMessage('Disponible es obligatorio')
        .isBoolean()
        .withMessage('Disponible debe ser un valor booleano'),
    check('numero')
        .not().isEmpty()
        .withMessage('El numero es obligatorio')
        .isInt({ min: 1 })
        .withMessage('El numero debe ser un numero entero positivo'),
    validFields
], createTable);

router.put('/:id', [
    check('id').custom(hasExistTable),
    check('idComercial')
        .not().isEmpty()
        .withMessage('El idComercial es obligatorio')
        .isInt({ min: 1 })
        .withMessage('El idComercial debe ser un numero entero positivo'),
    check('capacidad')
        .not().isEmpty()
        .withMessage('La capacidad es obligatorio')
        .isInt({ min: 1 })
        .withMessage('La capacidad debe ser un numero entero positivo'),
    check('disponible')
        .not().isEmpty()
        .withMessage('Disponible es obligatorio')
        .isBoolean()
        .withMessage('Disponible debe ser un valor booleano'),
    check('numero')
        .not().isEmpty()
        .withMessage('El numero es obligatorio')
        .isInt({ min: 1 })
        .withMessage('El numero debe ser un numero entero positivo'),
    validFields

], updateTable);

router.delete('/:id', [
    check('id').custom(hasExistTable),
    validFields
], deleteTable);

export default router;