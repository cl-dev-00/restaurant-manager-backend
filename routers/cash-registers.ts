import { Router } from 'express';
import { createCashRegister, getCashRegister, getCashRegisters, updateCashRegister } from '../controllers/cash-register';
import { validFields } from '../middlewares';
import { check } from 'express-validator';
import { hasExistCashRegisterByDate } from '../helpers/db-validators';


const router: Router = Router();

router.get('/', [
], getCashRegister);

router.get('/by-date', [
], getCashRegisters);

router.post('/', [
    check('fecha')
        .not().isEmpty().withMessage('La fecha es obligatoria')
        .isDate().withMessage('La fecha debe tener el formato correcto')
        .custom(hasExistCashRegisterByDate),
    check('hora_inicio')
        .not().isEmpty().withMessage('La hora inicial es obligatoria'),
    check('saldo_inicial')
        .not().isEmpty().withMessage('El saldo inicial es obligatoria')
        .isFloat({ min: 1 }).withMessage('El saldo debe ser un decimal positivo'),
    validFields
], createCashRegister);

router.put('/:id', [
    check('estado')
        .not().isEmpty().withMessage('El estado es obligatoria')
        .isBoolean().withMessage('El estado debe ser un valor booleano'),
    check('hora_final')
        .not().isEmpty().withMessage('La hora final es obligatoria'),
    check('efectivo')
        .not().isEmpty().withMessage('El efectivo es obligatoria')
        .isFloat({ min: 1 }).withMessage('El efectivo debe ser un decimal positivo'),
    check('saldo_final')
        .not().isEmpty().withMessage('El saldo final es obligatoria')
        .isFloat().withMessage('El saldo debe ser un decimal'),
    check('dinero_real')
        .not().isEmpty().withMessage('El dinero_real final es obligatoria')
        .isFloat({ min: 1 }).withMessage('El dinero_real debe ser un decimal positivo'),
    check('faltante')
        .not().isEmpty().withMessage('El faltante es obligatoria')
        .isFloat().withMessage('El faltante debe ser un decimal'),
    validFields
], updateCashRegister);

export default router;