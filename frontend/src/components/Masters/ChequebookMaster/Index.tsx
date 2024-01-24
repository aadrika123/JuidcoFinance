"use client";

import React from "react";

import ChequebookList from "./ChequebokList/ChequebookList";


import ChequebookMasterHeader from "./Header/ChequebookMasterHeader";

export const HeroChequebookMaster = () => {
  
  return (
    <>
      <section>
        <ChequebookMasterHeader />
      </section>

      <section className="mt-8">
      <ChequebookList title="List of chequebooks" />
      </section>
    </>
  );
};
