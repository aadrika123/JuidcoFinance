"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const controller_1 = __importDefault(require("../controller/controller"));
/**
 * | Route - 01
 */
class Router {
    constructor() {
        this.controller = new controller_1.default();
    }
    configure(app) {
        app
            .route(`/api/v1/create`)
            .get(this.controller.create); //0101
        app
            .route(`/api/v1/yes`)
            .get(this.controller.add); //0102
    }
}
exports.default = Router;
