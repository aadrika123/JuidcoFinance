"use client";

import React from "react";
import DirectPaymentEntryHeader from "./Header/DirectPaymentEntryHeader";
import PaymentList from "./DirectPaymentEntryList/PaymentEntryList";




export const HeroPaymentEntry = () => {
  
  return (
    <>
      <section>
        <DirectPaymentEntryHeader />
      </section>

      <section className="mt-8">
        <PaymentList title="Direct Payment Entry List" />
      </section>
    </>
  );
};
