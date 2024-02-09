import PageLayout from "@/components/Layouts/PageLayout";
import React from "react";
import { EditDirectPaymentEntry } from "@/components/JuidcoFinance/page/Transaction/DirectPaymentEntry/EditDirectPaymentEntry";

export default function Home ({ params }: { params: { id: string } }) {
  const { id } = params;
  return (
    <PageLayout>
      <EditDirectPaymentEntry PaymentID={id} />
    </PageLayout>
  );
}
