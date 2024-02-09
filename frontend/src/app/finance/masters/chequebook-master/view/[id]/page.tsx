import { EditChequebook } from "@/components/JuidcoFinance/page/Masters/ChequebookMaster/EditChequebook";
import PageLayout from "@/components/Layouts/PageLayout";
import React from "react";

export default function Home({ params }: { params: { id: string } }) {
  const { id } = params;
  console.log(id);
  return (
    <PageLayout>
      <EditChequebook chequebookID={id} />
    </PageLayout>
  );
}
