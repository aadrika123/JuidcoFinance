import {
    ServerUnaryCall,
    sendUnaryData,
  } from "@grpc/grpc-js";

import { IPetRegistrationServer } from "../proto/pet_registration_grpc_pb";
  

import { PrismaClient, Prisma } from "@prisma/client";
import { PetRegistrationReply, PetRegistrationRequest } from "../proto/pet_registration_pb";


export const PetRegistrationServer: IPetRegistrationServer = {
  recordPetRegistration: async function (call: ServerUnaryCall<PetRegistrationRequest, PetRegistrationReply>, callback: sendUnaryData<PetRegistrationReply>): Promise<void> {

    // collect the data
    const req = call.request;
    const data = {
      
      acc_code_id: req.getAccCodeId(),
      acc_code_no: req.getAccCodeNo(),
      acc_code_description: req.getAccCodeDescription(),

      receipt_no: req.getReceiptNo(),

      ulb_id: req.getUlbId(),
      ulb_name: req.getUlbName(),

      old_ward_no: req.getOldWardNo(),
      new_ward_no: req.getNewWardNo(),
      
      revenue_module_id: req.getRevenueModuleId(),
      revenue_module_name: req.getRevenueModuleName(),

      receipt_date: new Date(req.getReceiptDate()),
      
      receipt_mode_id: req.getReceiptModeId(),
      receipt_mode_name: req.getReceiptModeName(),
      
      paid_by: req.getPaidBy(),
      cheque_draft_no: req.getChequeDraftNo(),
      bank_amount: req.getBankAmount(),
      cash_amount: req.getCashAmount(),
      deposited_to: req.getDepositedTo(),
      deposit_date: new Date(req.getDepositDate()),
      realization_date: new Date(req.getRealizationDate()),
      whether_returned: req.getWhetherReturned(),
      remarks: req.getRemarks(),
      cash_basis: req.getCashBasis(),
      accrual_basis: req.getAccrualBasis(),
    }


    // validate
    console.log(data);

    // store into database
    const prisma = new PrismaClient();
    const result = await prisma.pet_registration_receipt.create({
      data: data
    });

    console.log(result);


    // convert account code to account code id

    const acc_code_id = 1;




    const receipt_register_data = {

      receipt_no: data.receipt_no,
      ulb_id: data.ulb_id,
      primary_acc_code_id: data.acc_code_id,
      revenue_module_id: data.revenue_module_id,
      revenue_accounted_type_id: 1,
      paid_by: data.paid_by,
      receipt_mode_id: data.receipt_mode_id,
      receipt_date: data.receipt_date,
      remarks: data.remarks,
      bank_acc_no: data.deposited_to,
      cheque_or_draft_no: data.cheque_draft_no,
      bank_amount: data.bank_amount,
      cash_amount: data.cash_amount,
      deposit_date: data.deposit_date,
      realisation_date: data.realization_date,
      wheather_returned: data.whether_returned,
      
      entered_by_id: null,
      entered_by_print_name: null,
      is_checked: true,
    }

    const result2 = await prisma.receipt_registers.create({
      data: receipt_register_data
    });
    
    console.log(result2);
    
    // send response
     const res = new PetRegistrationReply()
        .setCode(200)
        .setMessage("OK");

      callback(null, res);
  }
}