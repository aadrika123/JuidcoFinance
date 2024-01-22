import PageLayout from "@/components/Layouts/PageLayout";
import { HeroViewChequebook } from "@/components/ChequebookMaster/ViewChequebook/Index";
import React from "react";

export default function Home({params}: {params: {id: string}}) {
  const {id} = params;
  console.log(id)
  return (
    <PageLayout>
      <HeroViewChequebook chequebookID={id}/>
    </PageLayout>
  );
}
