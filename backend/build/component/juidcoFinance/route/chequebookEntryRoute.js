"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("../../../util/common");
const chequebookEntryController_1 = __importDefault(require("../controller/chequebookEntryController"));
class ChequeBookEntryRoute {
    constructor() {
        this.baseUrl = `${common_1.baseUrl}/chequebook-entry`;
        this.chequebookEntryController = new chequebookEntryController_1.default();
    }
    configure(app) {
        app.route(`${this.baseUrl}/get`).get(this.chequebookEntryController.get); //0702
    }
}
exports.default = ChequeBookEntryRoute;
