"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const udhdSubDepartmentController_1 = __importDefault(require("../controller/udhdSubDepartmentController"));
const common_1 = require("../../../util/common");
/**
 * | Route - 44
 */
class UDHDSubDepartmentRoute {
    constructor() {
        this.controller = new udhdSubDepartmentController_1.default();
    }
    configure(app, apiId) {
        app
            .route(`${common_1.baseUrl}/udhd/get-all`)
            .get((req, res) => this.controller.getAll(req, res, apiId + "01")); // 01
        app
            .route(`${common_1.baseUrl}/udhd/designations/get-all/:udhd_id`)
            .get((req, res) => this.controller.getAllDesignation(req, res, apiId + "02")); // 02
    }
}
exports.default = UDHDSubDepartmentRoute;
