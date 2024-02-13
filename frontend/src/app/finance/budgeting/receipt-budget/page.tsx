import { HeroReceiptBudget } from "@/components/JuidcoFinance/page/Budgeting/ReceiptBudget/Index";
import PageLayout from "@/components/Layouts/PageLayout";
import React from "react";

export default function page() {
  return (
    <>
      <PageLayout>
        <HeroReceiptBudget />
      </PageLayout>
    </>
  );
}