import React from "react";
import { SubHeading } from "@/components/Helpers/Heading";
import PrimaryButton from "@/components/Helpers/Button";
import Link from "next/link";


const ChequebookMasterHeader: React.FC = () => {
  return (
    <>
      <div className="overflow-x-auto flex justify-between">
        <div className="flex items-center">
          <SubHeading className="text-2xl">Chequebook Master</SubHeading>

        </div>
        <div className="flex">
        <Link
            href={"/chequebook-master/return"}>
            <PrimaryButton variant="cancel" className="rounded-3xl mr-8">
              Return Chequebook
            </PrimaryButton>
          </Link>

          <Link
            href={"/chequebook-master/add"}>
            <PrimaryButton variant="primary" className="rounded-3xl">
              + Add Chequebook
            </PrimaryButton>
          </Link>


        </div>
      </div>
    </>
  );
};

export default ChequebookMasterHeader;
