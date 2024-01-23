"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ApiFeatures {
    constructor(query) {
        this.pagination = (page, limit) => {
            const skip = (page - 1) * limit;
            this.query = this.query({ skip, take: limit });
            return this;
        };
        this.search = () => {
            this.query = this.query.findMany({ where: { id: 1 } });
            return this;
        };
        this.query = query;
    }
}
exports.default = ApiFeatures;
