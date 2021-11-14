import { Router } from 'express';
import { createBoxAction, getBoxActions } from '../controllers/box-actions';
import { hasExistCashRegister } from '../helpers/db-validators';
import { validFields } from '../middlewares';
import { check } from 'express-validator';


const router: Router = Router();

router.get('/', [

], getBoxActions);

router.post('/', [
    check('idCashRegister').custom(hasExistCashRegister),
    check('monto')
        .not().isEmpty().withMessage('El monto es obligatorio')
        .isFloat({ min: 1 }).withMessage('El monto debe ser un numero decimal positivo'),
    check('isInput')
        .not().isEmpty().withMessage('isInput es obligatorio')
        .isBoolean().withMessage('isInput debe ser un valor booleano'),
    check('descripcion')
        .not().isEmpty().withMessage('La descripcion es obligatoria')
        .isString().withMessage('La descripcion debe ser un string'),
    check('fecha')
        .not().isEmpty().withMessage('La fecha es obligatoria'),
        // .isDate().withMessage('La fecha debe tener el formato correcto'),
    validFields
], createBoxAction);


export default router;