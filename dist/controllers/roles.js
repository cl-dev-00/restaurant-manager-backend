"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRoles = void 0;
const models_1 = require("../models");
const getRoles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const roles = yield models_1.Role.findAll({
            where: {
                deletedAt: null
            }
        });
        return res.json({
            ok: true,
            collection: {
                items: roles,
                hasItems: roles.length > 0
            }
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false
        });
    }
});
exports.getRoles = getRoles;
//# sourceMappingURL=roles.js.map