import PageLayout from "@/components/Layouts/PageLayout";
import { HeroReceiptEntry } from "@/components/JuidcoFinance/page/Transaction/ReceiptEntry/Index";
import React from "react";

export default function Home() {
  return (
    <PageLayout>
      <HeroReceiptEntry />
    </PageLayout>
  );
}