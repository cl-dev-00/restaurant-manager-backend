"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.roles = exports.employees = exports.tables = exports.orders = exports.menuItems = exports.categories = exports.auth = void 0;
const auth_1 = __importDefault(require("./auth"));
exports.auth = auth_1.default;
const categories_1 = __importDefault(require("./categories"));
exports.categories = categories_1.default;
const menu_items_1 = __importDefault(require("./menu-items"));
exports.menuItems = menu_items_1.default;
const orders_1 = __importDefault(require("./orders"));
exports.orders = orders_1.default;
const tables_1 = __importDefault(require("./tables"));
exports.tables = tables_1.default;
const employees_1 = __importDefault(require("./employees"));
exports.employees = employees_1.default;
const roles_1 = __importDefault(require("./roles"));
exports.roles = roles_1.default;
//# sourceMappingURL=index.js.map