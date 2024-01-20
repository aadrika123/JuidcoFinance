"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const controller_1 = __importDefault(require("../controller/controller"));
class Router {
    constructor() {
        this.controller = new controller_1.default();
    }
    configure(app) {
        app
            .route(`/api/v1/create`)
            .get(this.controller.create);
        app
            .route(`/api/v1/yes`)
            .get(this.controller.add);
    }
}
exports.default = Router;
