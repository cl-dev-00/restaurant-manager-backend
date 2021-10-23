"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const db_validators_1 = require("../helpers/db-validators");
const menu_items_1 = require("../controllers/menu-items");
const middlewares_1 = require("../middlewares");
const router = (0, express_1.Router)();
router.get('/commercial/:idComercial', [
    (0, express_validator_1.check)('idComercial').custom(db_validators_1.hasExistComercial),
    middlewares_1.validFields
], menu_items_1.getMenuItems);
router.get('/available/commercial/:idComercial', [
    (0, express_validator_1.check)('idComercial').custom(db_validators_1.hasExistComercial),
    middlewares_1.validFields
], menu_items_1.getMenuItemsAvailable);
router.get('/:id', [
    (0, express_validator_1.check)('id').custom(db_validators_1.hasExistMenuItem),
    middlewares_1.validFields
], menu_items_1.getMenuItem);
router.get('/category/:idCategory', [
    (0, express_validator_1.check)('idCategory').custom(db_validators_1.hasExistCategory),
    middlewares_1.validFields
], menu_items_1.getMenuItemsByCategory);
router.post('/', [
    (0, express_validator_1.check)('nombre_item')
        .not().isEmpty()
        .withMessage('El nombre del item es obligatorio')
        .isLength({ min: 3 })
        .withMessage('El nombre del item debe tener al menos 3 caracteres'),
    (0, express_validator_1.check)('precio')
        .not().isEmpty()
        .withMessage('El precio es obligatorio')
        .isFloat()
        .withMessage('El precio debe ser un numero flotante'),
    (0, express_validator_1.check)('disponibilidad')
        .not().isEmpty()
        .withMessage('La disponibilidad es obligatorio')
        .isInt()
        .withMessage('La disponibilidad debe ser un numero entero'),
    (0, express_validator_1.check)('detalles_item')
        .not().isEmpty()
        .withMessage('El detalle del item es obligatorio')
        .isLength({ min: 5 })
        .withMessage('El detalle del item debe tener al menos 5 caracteres'),
    (0, express_validator_1.check)('descuento')
        .not().isEmpty()
        .withMessage('El descuento es obligatorio')
        .isFloat()
        .withMessage('El descuento debe ser un numero flotante'),
    (0, express_validator_1.check)('idCategoria')
        .not().isEmpty()
        .withMessage('El idCategoria es obligatorio')
        .isInt()
        .withMessage('El idCategoria debe ser un numero entero'),
    (0, express_validator_1.check)('idComercial')
        .not().isEmpty()
        .withMessage('El idComercial es obligatorio')
        .isInt()
        .withMessage('El idComercial debe ser un numero entero'),
    middlewares_1.validFields
], menu_items_1.createMenuItem);
router.put('/:id', [
    (0, express_validator_1.check)('id').custom(db_validators_1.hasExistMenuItem),
    (0, express_validator_1.check)('nombre_item')
        .not().isEmpty()
        .withMessage('El nombre del item es obligatorio')
        .isLength({ min: 3 })
        .withMessage('El nombre del item debe tener al menos 3 caracteres'),
    (0, express_validator_1.check)('precio')
        .not().isEmpty()
        .withMessage('El precio es obligatorio')
        .isFloat()
        .withMessage('El precio debe ser un numero flotante'),
    (0, express_validator_1.check)('disponibilidad')
        .not().isEmpty()
        .withMessage('La disponibilidad es obligatorio')
        .isInt()
        .withMessage('La disponibilidad debe ser un numero entero'),
    (0, express_validator_1.check)('detalles_item')
        .not().isEmpty()
        .withMessage('El detalle del item es obligatorio')
        .isLength({ min: 5 })
        .withMessage('El detalle del item debe tener al menos 5 caracteres'),
    (0, express_validator_1.check)('descuento')
        .not().isEmpty()
        .withMessage('El descuento es obligatorio')
        .isFloat()
        .withMessage('El descuento debe ser un numero flotante'),
    (0, express_validator_1.check)('idCategoria')
        .not().isEmpty()
        .withMessage('El idCategoria es obligatorio')
        .isInt()
        .withMessage('El idCategoria debe ser un numero entero'),
    (0, express_validator_1.check)('idComercial')
        .not().isEmpty()
        .withMessage('El idComercial es obligatorio')
        .isInt()
        .withMessage('El idComercial debe ser un numero entero'),
    middlewares_1.validFields
], menu_items_1.updateMenuItem);
router.delete('/:id', [
    (0, express_validator_1.check)('id').custom(db_validators_1.hasExistMenuItem),
    middlewares_1.validFields
], menu_items_1.deleteMenuItem);
exports.default = router;
//# sourceMappingURL=menu-items.js.map