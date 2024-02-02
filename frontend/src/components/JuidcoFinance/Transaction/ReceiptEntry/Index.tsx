'use client'

import React from "react";
import ReceiptEntryHeader from "./Header/ReceiptEntryHeader";
import TableWithSearch from "@/components/molecules/TableWithSearch";

export const HeroReceiptEntry = () => {

  const onViewButtonClick = () => {
    window.alert("Not defined yet");
  }
  return (
    <>
      <section>
        <ReceiptEntryHeader />
      </section>

      <section className="mt-8">
        {/* <ReceiptList title="List of Receipts" /> */}

        <TableWithSearch 
        onViewButtonClick={onViewButtonClick}

        columns={[
          {name: 'id', caption: "Sr. No."},
          {name: 'receipt_no', caption: "Receipt No"},
          {name: 'date', caption: "Receipt Date"},
          {name: 'subledger', caption: "Subledger"},
          {name: 'paid_by', caption: "Paid By"},
          {name: 'amount', caption: "Amount"},
          {name: 'narration', caption: "Narration"},
        ]}

        data={[
            {id: 1, receipt_no: "ARER34343", date: new Date(), subledger: 1, paid_by: "Someone", amount: 78, narration: "paid cash"},
            {id: 2, receipt_no: "ARER34343", date: new Date(), subledger: 1, paid_by: "Someone", amount: 78, narration: "paid cash"},

        ]}


        />
      </section>
    </>
  );
};
