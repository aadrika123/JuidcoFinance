"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dao_1 = __importDefault(require("../dao/dao"));
const sendResponse_1 = require("../../../util/sendResponse");
class Controller {
    constructor() {
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            return res.json("In try block of create function");
            // if (!req.body.isExist) {
            //   //Create StudyPlannerCreateDto
            //   //Transform it in DB Model
            //   //Save it in DB
            //   try {
            //     //Transform it in Json Model
            //     console.log("In try block of create function");
            //   } catch (error) {
            //     console.log("In catch block of create function");
            //     // responseCode = ResponseCode.BAD_REQUEST;
            //     // jsonResponse = {
            //     //   status: false,
            //     //   message: error.message,
            //     // };
            //   }
            //   this.sendAndLogResponse(jsonResponse, responseCode, res);
            // } else {
            //   this.createStudyLecture(req, res);
            // }
        });
        this.add = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                let dao = new dao_1.default();
                let data = yield dao.add();
                (0, sendResponse_1.sendAndLogResponse)(data, 200, res);
            }
            catch (error) {
                (0, sendResponse_1.sendAndLogResponse)(error.code, 409, res, false);
            }
            // return res.json(`Hello you are in add function ${JSON.stringify(data)}`);
        });
        // sendAndLogResponse = async (
        //   json: any,
        //   responseCode: number,
        //   res: Response
        // )=> {
        //   const size = Buffer.byteLength(JSON.stringify(json));
        //   // this.logger.debug("Response Size: " + size + " bytes");
        //   res.status(responseCode).json(json);
        // };
    }
}
exports.default = Controller;
