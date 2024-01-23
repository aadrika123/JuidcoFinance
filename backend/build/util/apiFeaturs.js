"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ApiFeatures {
    constructor() {
        this.pagination = (page, limit) => {
            return {
                skip: limit * page - 1,
                take: limit
            };
        };
        this;
    }
}
exports.default = ApiFeatures;
