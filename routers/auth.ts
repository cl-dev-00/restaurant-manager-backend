import { Router } from 'express';
import { loginEmployee } from '../controllers/auth';
import { check } from 'express-validator';
import { validFields } from '../middlewares';


const router: Router = Router();

router.post('/login', [
    check("username").not().isEmpty()
    .withMessage('El nombre de usuario es obligatorio')
    .isString().withMessage('El nombre de usuario debe ser un string'),
    check("password").not().isEmpty()
    .withMessage('El password es obligatorio')
    .isString().withMessage('El password debe ser un string'),
    validFields
], loginEmployee);

export default router;