import { EditBillsPaymentEntry } from "@/components/JuidcoFinance/page/Transaction/BillsInvoiceEntry/EditVoucher/Index";
import PageLayout from "@/components/Layouts/PageLayout";
import React from "react";

export default function page({ params }: { params: { id: string } }) {
  const { id } = params;
  return (
    <PageLayout>
      <EditBillsPaymentEntry BillsInvoiceID={id} />
    </PageLayout>
  );
}
