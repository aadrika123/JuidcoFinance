import React from "react";
import { SubHeading } from "@/components/Helpers/Heading";
import PrimaryButton from "@/components/Helpers/Button";
import Link from "next/link";


const AddVendorWidget: React.FC = () => {
  return (
    <>
      <div className="overflow-x-auto flex justify-between">
        <div className="flex items-center">
          <SubHeading className="text-2xl">Vendors</SubHeading>

        </div>
        <div className="flex">
          <Link

            href={"/vendor-master/add"}>
            <PrimaryButton variant="primary" className="rounded-3xl">
              + Add Vendor
            </PrimaryButton>
          </Link>


        </div>
      </div>
    </>
  );
};

export default AddVendorWidget;
