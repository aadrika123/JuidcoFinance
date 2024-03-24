"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resMessage = void 0;
function resMessage(value) {
    const NOT_FOUND = `${value} Not Found`;
    const FOUND = `${value} Found Successfully!!`;
    const CREATED = `${value} created Successfully!!`;
    const UPDATED = `${value} updated Successfully!!`;
    const LOGIN = `${value} Loged in Successfully!!`;
    const INVALID = `Invalid ${value}`;
    const OTP_SENT = `OTP sent successfully!!`;
    return { FOUND, NOT_FOUND, CREATED, UPDATED, LOGIN, INVALID, OTP_SENT };
}
exports.resMessage = resMessage;
