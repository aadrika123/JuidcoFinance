"use client";

import React from "react";

import ChequebookMasterHeader from "./Header/ChequebookMasterHeader";
import TableWithSearch from "@/components/molecules/TableWithSearch";
import APIs from "@/json/apis.json";


/**
 * | Author- Bijoy Paitandi
 * | Created On- 24-01-2024
 * | Created for- Chequebook Entry
 * | Status: closed
 */

export const HeroChequebookMaster = () => {

  const onViewButtonClick = () => {
    window.alert("Not defined yet");
  }
  
  return (
    <>
      <section>
        <ChequebookMasterHeader />
      </section>

      <section className="mt-8">
      {/* <ChequebookList title="List of chequebooks" /> */}

      <TableWithSearch
        api={`${APIs.chequebook_master$get}`}
        numberOfRowsPerPage={5}
        title="Chequebook List"
        onViewButtonClick={onViewButtonClick}

        columns={[
          {name: 'id', caption: "Sr. No."},
          {name: 'date', caption: "Issue Date"},
          {name: 'bank_branch', caption: "Bank Branch"},
          {name: 'bank_name', caption: "Bank Name"},
          {name: 'bank_account_no', caption: "Bank Account No"},
          {name: 'cheque_no_from', caption: "Cheque Number From"},
          {name: 'cheque_no_to', caption: "Cheque Number To"},
          {name: 'employee_id', caption: "Employee Name"},
          {name: 'issuer_name', caption: "Issuer Name"},
          {name: 'remarks', caption: "Remarks"},
        ]}
        />
      </section>
    </>
  );
};
