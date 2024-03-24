"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HoldingAndTaxServer = void 0;
const holding_and_tax_pb_1 = require("../proto/holding_and_tax_pb");
exports.HoldingAndTaxServer = {
    recordDemandsOnExistingAssessments: function (call, callback) {
        // define
        console.log("ulb: " + call.request.getUlb());
        console.log("bill no: " + call.request.getBillNo());
        console.log("date bill raised: " + call.request.getDateBillRaised());
        console.log("old ward no: " + call.request.getOldWardNo());
        console.log("new ward no: " + call.request.getNewWardNo());
        console.log("department/section: " + call.request.getDepartmentOrSection());
        const property_details = call.request.getPropertyDetails();
        console.log("\n\nProperty details: ");
        console.log("Assessment code: " + (property_details === null || property_details === void 0 ? void 0 : property_details.getAssessmentCode()));
        const accounting_entries = property_details === null || property_details === void 0 ? void 0 : property_details.getAccountingEntriesList();
        console.log("Accounting entries: ");
        accounting_entries === null || accounting_entries === void 0 ? void 0 : accounting_entries.forEach(item => {
            console.log("Description: " + item.getDescription());
            console.log("Credit Amount: " + item.getCreditAmount());
            console.log("Debit Amount: " + item.getDebitAmount());
            console.log("========================");
        });
        const res = new holding_and_tax_pb_1.GeneralResponse()
            .setCode(200)
            .setMessage("OK");
        callback(null, res);
    },
};
