"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const employees_1 = require("../controllers/employees");
const middlewares_1 = require("../middlewares");
const db_validators_1 = require("../helpers/db-validators");
const router = (0, express_1.Router)();
router.get('/', [], employees_1.getEmployees);
router.get('/:id', [
    (0, express_validator_1.check)('id', db_validators_1.hasExistEmployee),
], employees_1.getEmployee);
router.post('/', [
    (0, express_validator_1.check)('idComercial')
        .not().isEmpty()
        .withMessage('El id de la comercial es obligatorio')
        .isInt({ min: 1 })
        .withMessage('El id de la comercial debe ser un numero entero positivo'),
    (0, express_validator_1.check)('idRol')
        .not().isEmpty()
        .withMessage('El id del rol es obligatorio')
        .isInt({ min: 1 })
        .withMessage('El id del rol debe ser un numero entero positivo'),
    (0, express_validator_1.check)('edad')
        .not().isEmpty()
        .withMessage('La edad es obligatorio')
        .isInt({ min: 1 })
        .withMessage('La edad debe ser un numero entero positivo'),
    (0, express_validator_1.check)('telefono')
        .not().isEmpty()
        .withMessage('El telefono es obligatorio')
        .isString()
        .withMessage('El telefono debe ser un string'),
    (0, express_validator_1.check)('direccion')
        .not().isEmpty()
        .withMessage('La direccion es obligatorio')
        .isString()
        .withMessage('La direccion debe ser un string'),
    (0, express_validator_1.check)('email')
        .not().isEmpty()
        .withMessage('El email es obligatorio')
        .isEmail()
        .withMessage('La direccion debe ser un valido'),
    (0, express_validator_1.check)('nombre')
        .not().isEmpty()
        .withMessage('El nombre es obligatorio')
        .isString()
        .withMessage('El nombre debe ser un string'),
    (0, express_validator_1.check)('apellido')
        .not().isEmpty()
        .withMessage('El apellido es obligatorio')
        .isString()
        .withMessage('El apellido debe ser un string'),
    (0, express_validator_1.check)('password')
        .not().isEmpty()
        .withMessage('El password es obligatorio')
        .isString()
        .withMessage('El password debe ser un string')
        .isLength({ min: 8 })
        .withMessage('El password debe tener al menos 8 caracteres'),
    (0, express_validator_1.check)('username')
        .not().isEmpty()
        .withMessage('El username es obligatorio')
        .isString()
        .withMessage('El username debe ser un string'),
    middlewares_1.validFields
], employees_1.createEmployee);
router.put('/:id', [
    (0, express_validator_1.check)('id', db_validators_1.hasExistEmployee),
    (0, express_validator_1.check)('idComercial')
        .not().isEmpty()
        .withMessage('El id de la comercial es obligatorio')
        .isInt({ min: 1 })
        .withMessage('El id de la comercial debe ser un numero entero positivo'),
    (0, express_validator_1.check)('idRol')
        .not().isEmpty()
        .withMessage('El id del rol es obligatorio')
        .isInt({ min: 1 })
        .withMessage('El id del rol debe ser un numero entero positivo'),
    (0, express_validator_1.check)('edad')
        .not().isEmpty()
        .withMessage('La edad es obligatorio')
        .isInt({ min: 1 })
        .withMessage('La edad debe ser un numero entero positivo'),
    (0, express_validator_1.check)('telefono')
        .not().isEmpty()
        .withMessage('El telefono es obligatorio')
        .isString()
        .withMessage('El telefono debe ser un string'),
    (0, express_validator_1.check)('direccion')
        .not().isEmpty()
        .withMessage('La direccion es obligatorio')
        .isString()
        .withMessage('La direccion debe ser un string'),
    (0, express_validator_1.check)('email')
        .not().isEmpty()
        .withMessage('El email es obligatorio')
        .isEmail()
        .withMessage('La direccion debe ser un valido'),
    (0, express_validator_1.check)('nombre')
        .not().isEmpty()
        .withMessage('El nombre es obligatorio')
        .isString()
        .withMessage('El nombre debe ser un string'),
    (0, express_validator_1.check)('apellido')
        .not().isEmpty()
        .withMessage('El apellido es obligatorio')
        .isString()
        .withMessage('El apellido debe ser un string'),
    (0, express_validator_1.check)('username')
        .not().isEmpty()
        .withMessage('El username es obligatorio')
        .isString()
        .withMessage('El username debe ser un string'),
    middlewares_1.validFields
], employees_1.updateEmployee);
router.delete('/:id', [
    (0, express_validator_1.check)('id', db_validators_1.hasExistEmployee),
], employees_1.deleteEmployee);
exports.default = router;
//# sourceMappingURL=employees.js.map