import { HeroPaymentEntry } from "@/components/JuidcoFinance/Transaction/DirectPaymentEntry/Index";
import PageLayout from "@/components/Layouts/PageLayout";
import React from "react";

export default function Home() {
  return (
    <PageLayout>
      <HeroPaymentEntry />
    </PageLayout>
  );
}
