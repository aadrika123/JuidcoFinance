import { HeroAddPaymentEntry } from "@/components/Transaction/DirectPaymentEntry/AddDirectPaymentEntry/Index";
import PageLayout from "@/components/Layouts/PageLayout";
import React from "react";

export default function Home() {
  return (
    <PageLayout>
      <HeroAddPaymentEntry />
    </PageLayout>
  );
}
