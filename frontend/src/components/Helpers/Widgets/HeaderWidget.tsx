/**
 * Author: Krish
 * status: close
 */

import React from "react";
import { SubHeading } from "@/components/Helpers/Heading";
import PrimaryButton from "@/components/Helpers/Button";
import Link from "next/link";
import { usePathname } from "next/navigation";

type HeaderFactory = "add" | "view";
interface HeaderWidgetProps {
  title: string;
  variant: HeaderFactory;
}

export function HeaderWidget(props: HeaderWidgetProps) {
  const pathName = usePathname();

  const AddHeader = (
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
  );

  const ViewHeader = (
    <div className="overflow-x-auto flex justify-between pb-[2rem]">
      <div className="flex items-center">
        <SubHeading className="text-2xl">{props.title}</SubHeading>
      </div>
    </div>
  );
  return props.variant === "add"
    ? AddHeader
    : props.variant === "view"
      ? ViewHeader
      : null;
}
