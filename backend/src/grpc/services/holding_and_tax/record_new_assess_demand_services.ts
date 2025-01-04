// import { ServerUnaryCall, sendUnaryData } from "@grpc/grpc-js";
// import { IRecordNewAssesDemandServer } from "../../proto/record_new_assess_demand_grpc_pb";
// import { GeneralResponse, NewAssesDemandDetails } from "../../proto/record_new_assess_demand_pb";

  


// export const RecordDemandsOnNewAsses: IRecordNewAssesDemandServer = {
//     recordDemandsOnNewAssessment: function (call: ServerUnaryCall<NewAssesDemandDetails, GeneralResponse>, callback: sendUnaryData<GeneralResponse>): void {
    
//     // define
//     console.log("ulb: " + call.request.getUlb());
//     console.log("bill no: " + call.request.getBillNo());
//     console.log("old ward no: " + call.request.getOldWardNo());
//     console.log("new ward no: " + call.request.getNewWardNo());

//     const property_details = call.request.getPropertyDetails();
//     console.log("\n\nProperty details: ");

//     console.log("Assessment code: " + property_details?.getAssessmentCode());
   
//     const res = new GeneralResponse()
//     .setCode(200)
//     .setMessage("OK");
    
//     callback(null, res);
//   },
// };