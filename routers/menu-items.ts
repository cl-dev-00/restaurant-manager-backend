import { Router } from "express";
import { check } from "express-validator";
import { hasExistMenuItem, hasExistCategory } from '../helpers/db-validators';

import {
    getMenuItems,
    getMenuItem,
    getMenuItemsByCategory,
    createMenuItem,
    updateMenuItem,
    deleteMenuItem,
} from '../controllers';
import { validFields } from "../middlewares";

const router: Router = Router();


router.get('/', getMenuItems);

router.get('/:id', [
    check('id').custom(hasExistMenuItem),
    validFields
], getMenuItem);

router.get('/category/:idCategory', [
    check('idCategory').custom(hasExistCategory),
    validFields
], getMenuItemsByCategory);

router.post('/', [
    check('nombre_Item')
    .not().isEmpty()
    .withMessage('El nombre del item es obligatorio')
    .isLength({ min: 3 })
    .withMessage('El nombre del item debe tener al menos 3 caracteres'),
    check('precio')
    .not().isEmpty()
    .withMessage('El precio es obligatorio')
    .isFloat()
    .withMessage('El precio debe ser un numero flotante'),
    check('disponibilidad')
    .not().isEmpty()
    .withMessage('La disponibilidad es obligatorio')
    .isInt()
    .withMessage('La disponibilidad debe ser un numero entero'),
    check('detalles_item')
    .not().isEmpty()
    .withMessage('El detalle del item es obligatorio')
    .isLength({ min: 5 })
    .withMessage('El detalle del item debe tener al menos 5 caracteres'),
    check('descuento')
    .not().isEmpty()
    .withMessage('El descuento es obligatorio')
    .isFloat()
    .withMessage('El descuento debe ser un numero flotante'),
    check('idCategoria')
    .not().isEmpty()
    .withMessage('El idCategoria es obligatorio')
    .isInt()
    .withMessage('El idCategoria debe ser un numero entero'),
    validFields
], createMenuItem);

router.put('/:id', [
    check('id').custom(hasExistMenuItem),
    check('nombre_Item')
    .not().isEmpty()
    .withMessage('El nombre del item es obligatorio')
    .isLength({ min: 3 })
    .withMessage('El nombre del item debe tener al menos 3 caracteres'),
    check('precio')
    .not().isEmpty()
    .withMessage('El precio es obligatorio')
    .isFloat()
    .withMessage('El precio debe ser un numero flotante'),
    check('disponibilidad')
    .not().isEmpty()
    .withMessage('La disponibilidad es obligatorio')
    .isInt()
    .withMessage('La disponibilidad debe ser un numero entero'),
    check('detalles_item')
    .not().isEmpty()
    .withMessage('El detalle del item es obligatorio')
    .isLength({ min: 5 })
    .withMessage('El detalle del item debe tener al menos 5 caracteres'),
    check('descuento')
    .not().isEmpty()
    .withMessage('El descuento es obligatorio')
    .isFloat()
    .withMessage('El descuento debe ser un numero flotante'),
    check('idCategoria')
    .not().isEmpty()
    .withMessage('El idCategoria es obligatorio')
    .isInt()
    .withMessage('El idCategoria debe ser un numero entero'),
    validFields
], updateMenuItem);

router.delete('/:id', [
    check('id').custom(hasExistMenuItem),
    validFields
], deleteMenuItem);

export default router;