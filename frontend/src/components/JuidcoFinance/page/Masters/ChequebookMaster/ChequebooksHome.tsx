"use client";

import React from "react";

import { usePathname, useRouter } from "next/navigation";
import ViewIconButton from "@/components/global/atoms/ViewIconButton";
import TableWithFeatures from "@/components/global/organisms/TableWithFeatures";
import { HeaderWidget } from "@/components/Helpers/Widgets/HeaderWidget";


/**
 * | Author- Bijoy Paitandi
 * | Created On- 24-01-2024
 * | Created for- Chequebook Entry
 * | Status: closed
 */

export const ChequebooksHome = () => {
  const pathName = usePathname();
  const router = useRouter();


  const onViewButtonClick1 = (id: string) => {
    router.push(`${pathName}/view/${id}?mode=view`);
  };

  const onViewButtonClick2 = (id: string) => {
    router.push(`${pathName}/view/${id}?mode=edit`);
  };

  const tButton = (id: string) => {
    return (
      <>
        <ViewIconButton variant="view" onClick={() => onViewButtonClick1(id)} />
        <ViewIconButton variant="edit" onClick={() => onViewButtonClick2(id)} />
      </>
    );
  }

  const columns = [
    { name: 'id', caption: "Sr. No.", width: "w-[5%]" },
    { name: 'date', caption: "Issue Date", width: "w-[5%]" },
    { name: 'bank_branch', caption: "Bank Branch", width: "w-[5%]" },
    { name: 'bank', caption: "Bank Name", width: "w-[5%]" },
    { name: 'bank_account_no', caption: "Bank Account No", width: "w-[5%]" },
    { name: 'cheque_no_from', caption: "Cheque Number From", width: "w-[5%]" },
    { name: 'cheque_no_to', caption: "Cheque Number To", width: "w-[5%]" },
    { name: 'employee', caption: "Employee Name", width: "w-[5%]" },
    { name: 'issuer_name', caption: "Issuer Name", width: "w-[5%]" },
    {
      name: "View / Edit",
      caption: <span>View / Edit</span>,
      value: tButton,
      width: "w-[10%]",
    }
  ]

  return (
    <>
      <HeaderWidget variant="add" title={"Cheque Book"} />
      <TableWithFeatures
        title="Cheque Book List"
        center
        columns={columns}
        api={"/chequebook-entry/get" || ""}
        numberOfRowsPerPage={5}
      />
    </>
  );
};
