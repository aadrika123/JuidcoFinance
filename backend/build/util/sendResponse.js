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
exports.sendResponse = void 0;
const errorCodes_1 = __importDefault(require("./errorCodes"));
/**
 * | Response Msg Version with apiMetaData
 */
const sendResponse = (status, message, resData, responseCode, action, apiId, version, res, deviceId) => __awaiter(void 0, void 0, void 0, function* () {
    if (!status) {
        resData = errorCodes_1.default[resData];
    }
    const jsonRes = {
        status,
        message,
        "meta-data": {
            apiId,
            version,
            responseTime: responseTime(res),
            action,
            deviceId,
        },
        data: resData,
    };
    return res.status(responseCode).json(jsonRes);
});
exports.sendResponse = sendResponse;
// export const responseTime = (req:Request, res:Response, next: NextFunction): void=>{
//   const startTime = process.hrtime();
//   // let totalTimeInMs;
//   res.on('finish', ()=>{
//     const totalTime = process.hrtime(startTime);
//      const totalTimeInMs = totalTime[0] * 1000 + totalTime[1] / 1e6;
//      res.locals.responseTime = totalTimeInMs;
//      console.log("first",res.locals.responseTime)
//   });
//   next();
//   // return totalTimeInMs;
// }
const responseTime = (res) => {
    const startTime = process.hrtime();
    return new Promise((resolve) => {
        res.on('finish', () => {
            const totalTime = process.hrtime(startTime);
            const totalTimeInMs = totalTime[0] * 1000 + totalTime[1] / 1e6;
            resolve(totalTimeInMs);
        });
    });
};
