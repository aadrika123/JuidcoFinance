import { EditReceipt } from "@/components/JuidcoFinance/page/Transaction/ReceiptEntry/EditReceipt";
import PageLayout from "@/components/Layouts/PageLayout";
import React from "react";

export default function Home({params}: {params: {id: string}}) {
  const {id} = params;
  return (
    <PageLayout>
      <EditReceipt receiptID={id}/>
    </PageLayout>
  );
}
