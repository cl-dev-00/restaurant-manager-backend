"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
express_validator_1.validationResult;
const validFields = (req, res, next) => {
    const error = (0, express_validator_1.validationResult)(req);
    if (!error.isEmpty()) {
        console.log(error);
        return res.status(400).json({
            ok: false,
            error
        });
    }
    next();
};
exports.default = validFields;
//# sourceMappingURL=valid-fields.js.map