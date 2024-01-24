import PageLayout from "@/components/Layouts/PageLayout";
import { HeroAddReceipt } from "@/components/ReceiptEntry/AddReceipt/Index";
import React from "react";

export default function Home() {
  return (
    <PageLayout>
      <HeroAddReceipt />
    </PageLayout>
  );
}
