"use client"

import PrimaryButton from "@/components/Helpers/Button";
import { SubHeading } from "@/components/Helpers/Heading";
import React from "react";
import { useQuery} from "react-query";
import axios from "axios";
import { ReceiptTableData } from "@/utils/types/receipt_entry_types";
import Loader from "@/components/Helpers/Basic/Loader";
import ReceiptTable from "@/components/Helpers/Tables/ReceiptTable";
import APIs from "@/json/apis.json";
import ReceiptTableWithSubtotal from "@/components/Helpers/Tables/ReceiptTableWithSubtotal";


/**
 * | Author- Bijoy Paitandi
 * | Created On- 1-02-2024
 * | Created for- Chequebook Entry
 * | Status: closed
 */


const HeroAddReceipt = () => {
  

  return (
    <section className="border rounded-lg border-zinc-300 p-6 px-10">
      <div className="flex justify-between">
        <SubHeading>Receipt Entry Table</SubHeading>        
      </div>

      <div className="mt-8">
      <ReceiptTableWithSubtotal />

      </div>

        
      <div className="mt-4 flex items-center gap-5 justify-end">
        <PrimaryButton buttonType="button" variant="cancel">
            Back
          </PrimaryButton>

          <PrimaryButton buttonType="button" variant="cancel">
            Reset
          </PrimaryButton>
          <PrimaryButton buttonType="submit" variant="primary">
            Save
          </PrimaryButton>
        </div>
      
    </section>
  );
};

export default HeroAddReceipt;