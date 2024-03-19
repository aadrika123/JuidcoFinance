import { EditOpeningBalance } from "@/components/JuidcoFinance/page/Budgeting/OpeningBalance/EditOpeningBalance";
import PageLayout from "@/components/Layouts/PageLayout";
import React from "react";

const page = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  return (
    <div>
      <PageLayout>
        <EditOpeningBalance OpeningBalanceID={id} />
      </PageLayout>
    </div>
  );
};

export default page;
