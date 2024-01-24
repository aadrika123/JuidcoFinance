import EditBankAccount from "@/components/BankMasters/EditBankAccount/EditBankAccount";
import PageLayout from "@/components/Layouts/PageLayout";
import React from "react";

export default function page() {
  return (
    <>
      <PageLayout>
        <EditBankAccount />
      </PageLayout>
    </>
  );
}
