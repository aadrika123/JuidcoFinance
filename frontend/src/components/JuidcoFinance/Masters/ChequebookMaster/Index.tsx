"use client";

import React from "react";

import ChequebookList from "./ChequebokList/ChequebookList";

import ChequebookMasterHeader from "./Header/ChequebookMasterHeader";


/**
 * | Author- Bijoy Paitandi
 * | Created On- 24-01-2024
 * | Created for- Chequebook Entry
 * | Status: closed
 */

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
