"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRes2 = void 0;
const generateRes2 = (data, count, page, limit) => {
    if (!data || data.length == 0)
        return [];
    if (data && !(data.length > 0))
        return data;
    return {
        currentPage: page,
        count,
        totalPage: count && limit ? Math.ceil(count / limit) : 0,
        data,
    };
};
exports.generateRes2 = generateRes2;
