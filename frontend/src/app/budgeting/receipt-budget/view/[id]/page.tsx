import { EditReceiptBudget } from "@/components/JuidcoFinance/page/Budgeting/ReceiptBudget/EditReceiptBudget";
import PageLayout from "@/components/Layouts/PageLayout";
import React from "react";

const page = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  return (
    <div>
      <PageLayout>
        <EditReceiptBudget ReceiptBudgetID={id} />
      </PageLayout>
    </div>
  );
};

export default page;
