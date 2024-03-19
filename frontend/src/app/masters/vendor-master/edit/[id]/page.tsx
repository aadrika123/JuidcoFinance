import PageLayout from "@/components/Layouts/PageLayout";
import { HeroEditVendor } from "@/components/JuidcoFinance/page/Masters/VendorMaster/EditVendor/Index";
import React from "react";

export default function Home({ params }: { params: { id: string } }) {
  const { id } = params;
  return (
    <PageLayout>
      <HeroEditVendor vendorID={id} />
    </PageLayout>
  );
}
