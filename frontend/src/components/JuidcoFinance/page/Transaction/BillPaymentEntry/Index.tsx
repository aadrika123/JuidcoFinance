"use client";

import React from "react";
import BillPaymentList from "./BillPaymentEntryList/Index";
import BillPaymentEntryHeader from "./Header/BillPaymentEntryHeader";




export const HeroBillPaymentEntry = () => {
  
  return (
    <>
      <section>
        <BillPaymentEntryHeader />
      </section>

      <section className="mt-8">
        <BillPaymentList title="Bill Payment Entry List" />
      </section>
    </>
  );
};
