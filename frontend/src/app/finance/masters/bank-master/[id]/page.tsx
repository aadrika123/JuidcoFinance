import ViewBankAccount from "@/components/JuidcoFinance/page/Masters/BankMasters/ViewBankAccount";
import PageLayout from "@/components/Layouts/PageLayout";
import React from "react";

export default function page({ params }: { params: { id: string } }) {
  const { id } = params;
  return (
    <>
      <PageLayout>
        <ViewBankAccount bankID={id} />
      </PageLayout>
    </>
  );
}
