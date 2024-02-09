import PageLayout from "@/components/Layouts/PageLayout";
import React from "react";
import { HeroViewBillPaymentEntry } from "@/components/JuidcoFinance/page/Transaction/BillPaymentEntry/ViewPaymentEntry/Index";

export default function Home({ params }: { params: { id: string } }) {
  const { id } = params;
  return (
    <PageLayout>
      <HeroViewBillPaymentEntry paymentId={id} />
    </PageLayout>
  );
}
