"use client";

import DataViewForm from "@/components/global/molecules/DataViewForm";
import APIs from "@/json/apis.json";
import Routes from "@/json/routes.json";
import React from "react";


export const HeroViewReceipt = ({receiptId}: {receiptId:string}) => {

  
  return (
    <>
    <DataViewForm 
      api={`${APIs.receipt_entry$get}/${receiptId}`}
      onBack={() => open(Routes.receipt_entry, "_self")}
      title="Receipt Details"
      fields={[
        {name: "date", type: "date", caption: "Receipt Date"},
        {name: "email", caption: "Email ID"},
        {name: "receipt_no", caption: "Receipt No"},
        {name: "module_id", caption: "module"},
        {name: "paid_by", caption: "Paid By"},
        {name: "receipt_type_id", caption: "Receipt Type"},
        {name: "mobile_no", caption: "Mobile No"},
        {name: "admin_ward_id", caption: "Administration Ward"},
        {name: "narration", caption: "Narration"},
        {name: "narration", caption: "Subledger"},
        {name: "amount", caption: "Amount"},
      ]}
      />
    </>
  );
}