import React from "react";
import { SubHeading } from "@/components/Helpers/Heading";
import PrimaryButton from "@/components/Helpers/Button";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface AddHeaderWidgetProps {
  title: string;
}

const AddHeaderWidget: React.FC<AddHeaderWidgetProps> = (props) => {
  const pathName = usePathname();
  return (
    <>
      <div className="overflow-x-auto flex justify-between pb-[2rem]">
        <div className="flex items-center">
          <SubHeading className="text-2xl">{props.title}</SubHeading>
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

export default AddHeaderWidget;
