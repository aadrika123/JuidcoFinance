"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecordDemandsOnNewAsses = void 0;
const record_new_assess_demand_pb_1 = require("../../proto/record_new_assess_demand_pb");
exports.RecordDemandsOnNewAsses = {
    recordDemandsOnNewAssessment: function (call, callback) {
        // define
        console.log("ulb: " + call.request.getUlb());
        console.log("bill no: " + call.request.getBillNo());
        console.log("old ward no: " + call.request.getOldWardNo());
        console.log("new ward no: " + call.request.getNewWardNo());
        const property_details = call.request.getPropertyDetails();
        console.log("\n\nProperty details: ");
        console.log("Assessment code: " + (property_details === null || property_details === void 0 ? void 0 : property_details.getAssessmentCode()));
        const res = new record_new_assess_demand_pb_1.GeneralResponse()
            .setCode(200)
            .setMessage("OK");
        callback(null, res);
    },
};
