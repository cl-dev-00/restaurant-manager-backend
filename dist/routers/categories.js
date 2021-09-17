"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const middlewares_1 = require("../middlewares");
const helpers_1 = require("../helpers");
const controllers_1 = require("../controllers");
const router = (0, express_1.Router)();
router.get('/', controllers_1.getCategories);
router.get('/:id', [
    (0, express_validator_1.check)('id').custom(helpers_1.hasExistCategory),
    middlewares_1.validFields
], controllers_1.getCategory);
router.post('/', [
    (0, express_validator_1.check)('nombreCategoria').not().isEmpty().
        withMessage('El nombre es obligatorio').
        isLength({ min: 3 }).
        withMessage('El nombre debe tener al menos 3 letras'),
    middlewares_1.validFields
], controllers_1.createCategory);
router.put('/:id', [
    (0, express_validator_1.check)('id').custom(helpers_1.hasExistCategory),
    (0, express_validator_1.check)('nombreCategoria').not().isEmpty().
        withMessage('El nombre es obligatorio').
        isLength({ min: 3 }).
        withMessage('El nombre debe tener al menos 3 letras'),
    middlewares_1.validFields
], controllers_1.updateCategory);
router.delete('/:id', [
    (0, express_validator_1.check)('id').custom(helpers_1.hasExistCategory),
    middlewares_1.validFields
], controllers_1.deleteCategory);
exports.default = router;
//# sourceMappingURL=categories.js.map