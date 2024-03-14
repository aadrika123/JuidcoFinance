"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRes = void 0;
const generateRes = (data, count, page, limit, others) => {
    others === null || others === void 0 ? true : delete others.total;
    if (!data || data.length == 0)
        return null;
    if (data && (!(data.length > 0) || !count || !page || !limit))
        return data;
    return {
        currentPage: page,
        count,
        totalPage: count && limit ? Math.ceil(count / limit) : 0,
        others,
        data,
    };
};
exports.generateRes = generateRes;
