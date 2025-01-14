import { EditBillsInvoiceEntry } from "@/components/JuidcoFinance/page/Transaction/BillsInvoiceEntry/EditInvoiceEntry/Index";
import PageLayout from "@/components/Layouts/PageLayout";
import React from "react";

export default function page({ params }: { params: { id: string } }) {
  const { id } = params;
  return (
    <PageLayout>
      <EditBillsInvoiceEntry BillsInvoiceID={id} />
    </PageLayout>
  );
}
