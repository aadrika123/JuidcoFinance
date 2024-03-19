import { EditInvestments } from "@/components/JuidcoFinance/page/Budgeting/Investments/EditInvestments";
import PageLayout from "@/components/Layouts/PageLayout";
import React from "react";

const page = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  return (
    <div>
      <PageLayout>
        <EditInvestments InvestmentsID={id} />
      </PageLayout>
    </div>
  );
};

export default page;
