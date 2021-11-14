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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginEmployee = void 0;
const generate_jwt_1 = require("../helpers/generate-jwt");
const models_1 = require("../models");
const bcrypt_1 = __importDefault(require("bcrypt"));
const employeeAttributes = ['idEmpleado', 'idComercial', 'nombre', 'apellido', 'username', 'password'];
const roleAttributes = ['nombreRol'];
const userLevelAttributes = ['nivel_usuario'];
const commercialAttributes = ['nombre', 'ubicacion', 'telefono'];
const loginEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password: passwordInput } = req.body;
    try {
        const employee = yield models_1.Employee.findOne({
            where: {
                username
            },
            attributes: employeeAttributes,
            include: [{
                    model: models_1.Role, attributes: roleAttributes, include: [
                        { model: models_1.UserLevel, attributes: userLevelAttributes }
                    ]
                }, {
                    model: models_1.Commercial, attributes: commercialAttributes
                }],
        });
        if (!employee) {
            return res.status(400).json({
                ok: false,
            });
        }
        const verifyPassword = bcrypt_1.default.compareSync(passwordInput, employee.password);
        if (!verifyPassword) {
            return res.status(400).json({
                ok: false,
            });
        }
        const _a = employee.dataValues, { password } = _a, props = __rest(_a, ["password"]);
        const token = yield (0, generate_jwt_1.generateJWT)(Object.assign({}, props));
        return res.json({
            ok: true, username, password,
            token,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false
        });
    }
});
exports.loginEmployee = loginEmployee;
//# sourceMappingURL=auth.js.map