"use client";

import React from "react";
import axios from "@/lib/axiosConfig";
import InputBox from "../../Helpers/InputBox";
import PrimaryButton from "@/components/Helpers/Button";
import { SubHeading } from "@/components/Helpers/Heading";

export const HeroEditVendor = () => {
  return (
    <>
      <section className="border rounded-lg border-zinc-300 p-6 px-10">
        <div className="flex justify-between">
          <SubHeading>Edit Vendor</SubHeading>
        </div>

        <div className="mt-8">
          <div className="grid grid-cols-2 gap-x-6 gap-4">
            <InputBox label="Vendor Type *" />
            <InputBox label="Contact Number" />
            <InputBox label="Department Name" />
            <InputBox label="Email Address" />
            <InputBox label="Vendor Name" />
            <InputBox label="Name of the Bank" />
            <InputBox label="Office Address" />
            <InputBox label="IFSC Code *" />
            <InputBox label="TIN No" />
            <InputBox label="Bank Account No." />
            <InputBox label="GST No." />
            <InputBox label="Bank Branch" />
            <InputBox label="Aadhaar No." />
            <span></span>
            <InputBox label="Pan No." />
          </div>

          <div className="flex items-center justify-end mt-5 gap-5">
            <PrimaryButton variant={"cancel"}>Back</PrimaryButton>

            <PrimaryButton variant={"cancel"}>Reset</PrimaryButton>

            <PrimaryButton variant="primary">Print</PrimaryButton>
          </div>
        </div>
      </section>
    </>
  );
};
