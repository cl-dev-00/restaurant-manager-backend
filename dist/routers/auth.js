"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../controllers/auth");
const express_validator_1 = require("express-validator");
const middlewares_1 = require("../middlewares");
const router = (0, express_1.Router)();
router.post('/login', [
    (0, express_validator_1.check)("username").not().isEmpty()
        .withMessage('El nombre de usuario es obligatorio')
        .isString().withMessage('El nombre de usuario debe ser un string'),
    (0, express_validator_1.check)("password").not().isEmpty()
        .withMessage('El password es obligatorio')
        .isString().withMessage('El password debe ser un string'),
    middlewares_1.validFields
], auth_1.loginEmployee);
exports.default = router;
//# sourceMappingURL=auth.js.map