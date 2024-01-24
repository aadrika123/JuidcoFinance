import PageLayout from "@/components/Layouts/PageLayout";
import React from "react";
import { HeroViewReceipt } from "@/components/ReceiptEntry/ViewReceipt/Index";

export default function Home({params}: {params: {id: string}}) {
  const {id} = params;
  console.log(id)
  return (
    <PageLayout>
      <HeroViewReceipt receiptId={id}/>
    </PageLayout>
  );
}
