"use client";

import React from "react";
import ReceiptEntryHeader from "./Header/ReceiptEntryHeader";
import ReceiptList from "./ReceiptList/ReceiptList";




export const HeroReceiptEntry = () => {
  
  return (
    <>
      <section>
        <ReceiptEntryHeader />
      </section>

      <section className="mt-8">
        <ReceiptList title="List of Receipts" />
      </section>
    </>
  );
};
