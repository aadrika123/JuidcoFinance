"use client"

import React from "react";
import { SubHeading } from "@/components/Helpers/Heading";
import PrimaryButton from "@/components/Helpers/Button";
import Link from "next/link";
import { usePathname } from "next/navigation";


const ReceiptEntryHeader: React.FC = () => {
  const pathName = usePathname();
  return (
    <>
      <div className="overflow-x-auto flex justify-between">
        <div className="flex items-center">
          <SubHeading className="text-2xl">Receipt Entry</SubHeading>

        </div>
        <div className="flex">
        
          <Link
            href={`${pathName}/add`}>
            <PrimaryButton variant="primary" className="rounded-3xl">
              + Add Receipt
            </PrimaryButton>
          </Link>


        </div>
      </div>
    </>
  );
};

export default ReceiptEntryHeader;
