// import {
//     ServerUnaryCall,
//     sendUnaryData,
//   } from "@grpc/grpc-js";

// import { IHoldingAndTaxServer } from "../proto/holding_and_tax_grpc_pb";
// import { DemandsOnExistingAssessments, GeneralResponse } from "../proto/holding_and_tax_pb";
  


// export const HoldingAndTaxServer: IHoldingAndTaxServer = {
//   recordDemandsOnExistingAssessments: function (call: ServerUnaryCall<DemandsOnExistingAssessments, GeneralResponse>, callback: sendUnaryData<GeneralResponse>): void {
    
//     // define
//     console.log("ulb: " + call.request.getUlb());
//     console.log("bill no: " + call.request.getBillNo());
//     console.log("date bill raised: " + call.request.getDateBillRaised());
//     console.log("old ward no: " + call.request.getOldWardNo());
//     console.log("new ward no: " + call.request.getNewWardNo());
//     console.log("department/section: " + call.request.getDepartmentOrSection());

//     const property_details = call.request.getPropertyDetails();
//     console.log("\n\nProperty details: ");

//     console.log("Assessment code: " + property_details?.getAssessmentCode());
    
//     const accounting_entries = property_details?.getAccountingEntriesList();
//     console.log("Accounting entries: ");
//     accounting_entries?.forEach(item => {
//       console.log("Description: " + item.getDescription());
//       console.log("Credit Amount: " + item.getCreditAmount());
//       console.log("Debit Amount: " + item.getDebitAmount());
//       console.log("========================");
//     });

//     const res = new GeneralResponse()
//     .setCode(200)
//     .setMessage("OK");
    
//     callback(null, res);
//   },
// }