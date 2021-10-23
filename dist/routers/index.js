"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tables = exports.orderDetails = exports.orders = exports.menuItems = exports.categories = void 0;
const categories_1 = __importDefault(require("./categories"));
exports.categories = categories_1.default;
const menu_items_1 = __importDefault(require("./menu-items"));
exports.menuItems = menu_items_1.default;
const orders_1 = __importDefault(require("./orders"));
exports.orders = orders_1.default;
const order_details_1 = __importDefault(require("./order-details"));
exports.orderDetails = order_details_1.default;
const tables_1 = __importDefault(require("./tables"));
exports.tables = tables_1.default;
//# sourceMappingURL=index.js.map