"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateUniquePaymentNo = void 0;
const uuid_1 = require("uuid");
const generateUniquePaymentNo = (initialString) => {
    const uniqueId = (0, uuid_1.v4)();
    // Extract the first 8 characters from the UUID
    const unqId = uniqueId.substring(0, 6);
    return initialString ? initialString + unqId : unqId;
};
exports.generateUniquePaymentNo = generateUniquePaymentNo;
