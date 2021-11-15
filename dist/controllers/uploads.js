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
exports.uploadImage = void 0;
const cloudinary_1 = require("cloudinary");
const employee_1 = __importDefault(require("../models/employee"));
const uploadImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const employee = yield employee_1.default.findByPk(id);
    if (employee === null || employee === void 0 ? void 0 : employee.url) {
        const nameArr = employee.url.split('/');
        const img = nameArr[nameArr.length - 1];
        const [id_publico] = img.split('.');
        cloudinary_1.v2.uploader.destroy(id_publico);
    }
    const { tempFilePath } = req.files.file;
    const { secure_url } = yield cloudinary_1.v2.uploader.upload(tempFilePath);
    yield (employee === null || employee === void 0 ? void 0 : employee.update({
        url: secure_url
    }));
    return res.json({
        ok: true,
        employee
    });
});
exports.uploadImage = uploadImage;
//# sourceMappingURL=uploads.js.map