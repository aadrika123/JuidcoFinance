import { EditBillPaymentEntry } from "@/components/JuidcoFinance/page/Transaction/BillPaymentEntry/EditBillPaymentEntry/Index";
import PageLayout from "@/components/Layouts/PageLayout";
import React from "react";

export default function Home({ params }: { params: { id: string } }) {
  const { id } = params;
  return (
    <PageLayout>
      <EditBillPaymentEntry BillPaymentID={id} />
    </PageLayout>
  );
}
