import { Router } from 'express';
import { uploadImage } from '../controllers/uploads';
import { check } from 'express-validator';
import { hasExistEmployee } from '../helpers/db-validators';
import { validFields } from '../middlewares';

const router: Router = Router();

router.post('/image/:id', [
    check('id').custom(hasExistEmployee),
    validFields
], uploadImage);

export default router;