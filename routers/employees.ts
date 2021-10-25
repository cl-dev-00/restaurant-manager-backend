import { Router } from "express";
import { check } from "express-validator";

import {
    getEmployees,
    getEmployee,
    createEmployee,
    updateEmployee,
    deleteEmployee,
} from '../controllers/employees';
import { validFields } from "../middlewares";
import { hasExistEmployee } from '../helpers/db-validators';

const router = Router();

router.get('/', [], getEmployees)

router.get('/:id', [
    check('id', hasExistEmployee),
], getEmployee)

router.post('/', [
    check('idComercial')
    .not().isEmpty()
    .withMessage('El id de la comercial es obligatorio')
    .isInt({ min: 1 })
    .withMessage('El id de la comercial debe ser un numero entero positivo'),
    check('idRol')
    .not().isEmpty()
    .withMessage('El id del rol es obligatorio')
    .isInt({ min: 1 })
    .withMessage('El id del rol debe ser un numero entero positivo'),
    check('edad')
    .not().isEmpty()
    .withMessage('La edad es obligatorio')
    .isInt({ min: 1 })
    .withMessage('La edad debe ser un numero entero positivo'),
    check('telefono')
    .not().isEmpty()
    .withMessage('El telefono es obligatorio')
    .isString()
    .withMessage('El telefono debe ser un string'),
    check('direccion')
    .not().isEmpty()
    .withMessage('La direccion es obligatorio')
    .isString()
    .withMessage('La direccion debe ser un string'),
    check('email')
    .not().isEmpty()
    .withMessage('El email es obligatorio')
    .isEmail()
    .withMessage('La direccion debe ser un valido'),
    check('nombre')
    .not().isEmpty()
    .withMessage('El nombre es obligatorio')
    .isString()
    .withMessage('El nombre debe ser un string'),
    check('apellido')
    .not().isEmpty()
    .withMessage('El apellido es obligatorio')
    .isString()
    .withMessage('El apellido debe ser un string'),
    check('password')
    .not().isEmpty()
    .withMessage('El password es obligatorio')
    .isString()
    .withMessage('El password debe ser un string')
    .isLength({ min: 8 })
    .withMessage('El password debe tener al menos 8 caracteres'),
    check('username')
    .not().isEmpty()
    .withMessage('El username es obligatorio')
    .isString()
    .withMessage('El username debe ser un string'),
    validFields
], createEmployee)

router.put('/:id', [
    check('id', hasExistEmployee),
    check('idComercial')
    .not().isEmpty()
    .withMessage('El id de la comercial es obligatorio')
    .isInt({ min: 1 })
    .withMessage('El id de la comercial debe ser un numero entero positivo'),
    check('idRol')
    .not().isEmpty()
    .withMessage('El id del rol es obligatorio')
    .isInt({ min: 1 })
    .withMessage('El id del rol debe ser un numero entero positivo'),
    check('edad')
    .not().isEmpty()
    .withMessage('La edad es obligatorio')
    .isInt({ min: 1 })
    .withMessage('La edad debe ser un numero entero positivo'),
    check('telefono')
    .not().isEmpty()
    .withMessage('El telefono es obligatorio')
    .isString()
    .withMessage('El telefono debe ser un string'),
    check('direccion')
    .not().isEmpty()
    .withMessage('La direccion es obligatorio')
    .isString()
    .withMessage('La direccion debe ser un string'),
    check('email')
    .not().isEmpty()
    .withMessage('El email es obligatorio')
    .isEmail()
    .withMessage('La direccion debe ser un valido'),
    check('nombre')
    .not().isEmpty()
    .withMessage('El nombre es obligatorio')
    .isString()
    .withMessage('El nombre debe ser un string'),
    check('apellido')
    .not().isEmpty()
    .withMessage('El apellido es obligatorio')
    .isString()
    .withMessage('El apellido debe ser un string'),
    check('username')
    .not().isEmpty()
    .withMessage('El username es obligatorio')
    .isString()
    .withMessage('El username debe ser un string'),
    validFields
], updateEmployee)

router.delete('/:id', [
    check('id', hasExistEmployee),
], deleteEmployee)

export default router;