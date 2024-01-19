import PageLayout from "@/components/Layouts/PageLayout";
import { HeroViewVendor } from "@/components/VendorMaster/ViewVendor/Index";
import React from "react";

export default function Home({params}: {params: {id: string}}) {
  const {id} = params;
  console.log(id)
  return (
    <PageLayout>
      <HeroViewVendor vendorID={id}/>
    </PageLayout>
  );
}
