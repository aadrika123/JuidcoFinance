"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("../../../util/common");
const chequebookEntryController_1 = __importDefault(require("../controller/chequebookEntryController"));
/**
 * | Author- Bijoy Paitandi
 * | Created On- 24-01-2024
 * | Created for- Chequebook Entry
 * | Status: closed
 */
class ChequeBookEntryRoute {
    constructor() {
        this.baseUrl = `${common_1.baseUrl}/chequebook-entry`;
        this.chequebookEntryController = new chequebookEntryController_1.default();
    }
    configure(app) {
        app.route(`${this.baseUrl}/create`).post(this.chequebookEntryController.create); //801;
        app.route(`${this.baseUrl}/get`).get(this.chequebookEntryController.get); //0802
    }
}
exports.default = ChequeBookEntryRoute;
