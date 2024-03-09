import React from "react";
import { SubHeading } from "@/components/Helpers/Heading";
import PrimaryButton from "@/components/Helpers/Button";
import Link from "next/link";
import { usePathname } from "next/navigation";

const AddVendorWidget: React.FC = () => {
  const pathName = usePathname();
  return (
    <>
      <div className="overflow-x-auto flex shadow-lg p-4 border justify-between">
        <div className="flex items-center">
          <SubHeading className="text-2xl">Vendor Master</SubHeading>
        </div>
        <div className="flex">
          <Link href={`${pathName}/add`}>
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
