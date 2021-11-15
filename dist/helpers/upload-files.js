"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFiles = void 0;
const path_1 = __importDefault(require("path"));
const uuid_1 = require("uuid");
const uploadFiles = (files, extensionsValids, folder = '') => {
    return new Promise((resolve, reject) => {
        const { file } = files;
        if (!file) {
            return;
        }
        const cutFile = file.name.split('.');
        const extension = cutFile[cutFile.length - 1];
        if (!extensionsValids.includes(extension)) {
            reject(`La extension ${extension} no es valida`);
        }
        const name = `${(0, uuid_1.v4)()}.${extension}`;
        const uploadPath = path_1.default.join(__dirname, '../uploads/', folder, name);
        file.mv(uploadPath, (err) => {
            if (err)
                reject(err);
            resolve(name);
        });
    });
};
exports.uploadFiles = uploadFiles;
//# sourceMappingURL=upload-files.js.map