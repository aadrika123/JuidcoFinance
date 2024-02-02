'use client'

import React from "react";
import ReceiptEntryHeader from "./Header/ReceiptEntryHeader";
import TableWithSearch from "@/components/molecules/TableWithSearch";
import APIs from "@/json/apis.json";

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
        api={`${APIs.receipt_entry$get}`}
        numberOfRowsPerPage={5}
        title="Receipt List"
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

        />
      </section>
    </>
  );
};
