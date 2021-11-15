import { Router } from "express";
import { check } from "express-validator";

import { validFields } from "../middlewares";
import { hasExistCategory } from '../helpers/db-validators';

import {
    getCategories,
    getCategory,
    createCategory,
    updateCategory,
    deleteCategory,
} from '../controllers/categories';

const router = Router();

router.get('/', getCategories);

router.get('/:id', [
    check('id').custom(hasExistCategory),
    validFields
], getCategory);

router.post('/', [
    check('nombreCategoria').not().isEmpty().
    withMessage('El nombre es obligatorio').
    isLength({ min: 3 }).
    withMessage('El nombre debe tener al menos 3 letras'),
    
    validFields
], createCategory);

router.put('/:id', [
    check('id').custom(hasExistCategory),
    check('nombreCategoria').not().isEmpty().
    withMessage('El nombre es obligatorio').
    isLength({ min: 3 }).
    withMessage('El nombre debe tener al menos 3 letras'),

    validFields
], updateCategory);

router.delete('/:id', [
    check('id').custom(hasExistCategory),
    validFields
], deleteCategory);

export default router;