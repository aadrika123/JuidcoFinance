import PageLayout from "@/components/Layouts/PageLayout";
import { HeroReceiptEntry } from "@/components/JuidcoFinance/Transaction/ReceiptEntry/Index";
import React from "react";

export default function Home() {
  return (
    <PageLayout>
      <HeroReceiptEntry />
    </PageLayout>
  );
}