
import { ViewCollectionRegister } from "@/components/JuidcoFinance/page/RevenueCollection/CollectionRegister/ViewCollectionRegister";
import PageLayout from "@/components/Layouts/PageLayout";
import React from "react";

const page = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  return (
    <div>
      <PageLayout>
        <ViewCollectionRegister CollectionRegisterID={id} />
      </PageLayout>
    </div>
  );
};

export default page;
