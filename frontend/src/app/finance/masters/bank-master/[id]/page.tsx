import EditBankAccount from "@/components/JuidcoFinance/page/Masters/BankMasters/EditBankAccount/EditBankAccount";
import PageLayout from "@/components/Layouts/PageLayout";
import React from "react";

export default function page({ params }: { params: { id: string } }) {
  const { id } = params;
  return (
    <>
      <PageLayout>
        <EditBankAccount bankID={id} />
      </PageLayout>
    </>
  );
}
