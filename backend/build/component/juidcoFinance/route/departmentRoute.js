"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("../../../util/common");
const departmentController_1 = __importDefault(require("../controller/departmentController"));
/**
 * | Route - 06
 */
class DepartmentRoute {
    constructor() {
        this.departmentController = new departmentController_1.default();
    }
    configure(app) {
        app.route(`${common_1.baseUrl}/department/get`).get(this.departmentController.get); // 01
    }
}
exports.default = DepartmentRoute;
