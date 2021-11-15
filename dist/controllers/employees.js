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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEmployee = exports.updateEmployee = exports.createEmployee = exports.getEmployee = exports.getEmployees = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const models_1 = require("../models");
const rolAttributes = ['idRol', 'nombreRol'];
const saltRounds = 10;
const getEmployees = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const employees = yield models_1.Employee.findAll({
            where: {
                idComercial: 1,
                deletedAt: null
            },
            include: [{ model: models_1.Role, attributes: rolAttributes }],
        });
        return res.json({
            ok: true,
            collection: {
                hasItems: employees.length > 0,
                items: employees,
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
exports.getEmployees = getEmployees;
const getEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const employee = yield models_1.Employee.findOne({
            where: {
                idEmpleado: id,
            },
            include: [{ model: models_1.Role, attributes: rolAttributes }],
            attributes: { exclude: ["password"] }
        });
        return res.json({
            ok: true,
            employee
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false
        });
    }
});
exports.getEmployee = getEmployee;
const createEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    try {
        payload.password = bcrypt_1.default.hashSync(payload.password, saltRounds);
        const employee = yield models_1.Employee.create(payload);
        return res.json({
            ok: true,
            employee
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false
        });
    }
});
exports.createEmployee = createEmployee;
const updateEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const payload = req.body;
    try {
        const employee = yield models_1.Employee.findOne({
            where: {
                idEmpleado: id
            },
            include: [{ model: models_1.Role, attributes: rolAttributes }],
        });
        if (payload.password) {
            payload.password = bcrypt_1.default.hashSync(payload.password, saltRounds);
        }
        yield (employee === null || employee === void 0 ? void 0 : employee.update(payload));
        return res.json({
            ok: true,
            employee
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false
        });
    }
});
exports.updateEmployee = updateEmployee;
const deleteEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const employee = yield models_1.Employee.findByPk(id);
        yield (employee === null || employee === void 0 ? void 0 : employee.destroy());
        return res.json({
            ok: true
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false
        });
    }
});
exports.deleteEmployee = deleteEmployee;
//# sourceMappingURL=employees.js.map