import { EditRevisedBudget } from "@/components/JuidcoFinance/page/Budgeting/RevisedBudget/EditRevisedBudget";
import PageLayout from "@/components/Layouts/PageLayout";
import React from "react";

const page = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  return (
    <div>
      <PageLayout>
        <EditRevisedBudget RevisedBudgetID={id} />
      </PageLayout>
    </div>
  );
};

export default page;
