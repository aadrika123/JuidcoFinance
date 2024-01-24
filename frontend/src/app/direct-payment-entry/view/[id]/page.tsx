import PageLayout from "@/components/Layouts/PageLayout";
import React from "react";
import { HeroViewPaymentEntry } from "@/components/DirectPaymentEntry/ViewPaymentEntry/Index";

export default function Home({params}: {params: {id: string}}) {
  const {id} = params;
  return (
    <PageLayout>
      <HeroViewPaymentEntry paymentId={id}/>
    </PageLayout>
  );
}
