"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pagination = void 0;
const pagination = (data, count, page, limit) => {
    if (!data && !(data.length > 0))
        return null;
    if (data && !(data.length > 0))
        return data;
    return {
        currentPage: page,
        count,
        totalPage: Math.ceil(count / limit),
        data,
    };
};
exports.pagination = pagination;
