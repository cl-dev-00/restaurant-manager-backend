"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateJWT = (payload) => new Promise((resolve, reject) => {
    const privateKey = process.env.PRIVATE_SECRET_KEY || '';
    jsonwebtoken_1.default.sign({
        data: payload,
    }, privateKey, {
        expiresIn: '120ms'
    }, (error, token) => {
        if (error) {
            console.log(error);
            reject('No se pudo generar el token');
        }
        else {
            resolve(token);
        }
    });
});
exports.generateJWT = generateJWT;
//# sourceMappingURL=generate-jwt.js.map