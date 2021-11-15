"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const uploads_1 = require("../controllers/uploads");
const express_validator_1 = require("express-validator");
const db_validators_1 = require("../helpers/db-validators");
const middlewares_1 = require("../middlewares");
const router = (0, express_1.Router)();
router.post('/image/:id', [
    (0, express_validator_1.check)('id').custom(db_validators_1.hasExistEmployee),
    middlewares_1.validFields
], uploads_1.uploadImage);
exports.default = router;
//# sourceMappingURL=uploads.js.map