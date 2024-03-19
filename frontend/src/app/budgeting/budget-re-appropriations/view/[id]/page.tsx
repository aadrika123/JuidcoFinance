import { EditBudgetReAppro } from "@/components/JuidcoFinance/page/Budgeting/BudgetReAppro/EditBudgetReAppro";
import PageLayout from "@/components/Layouts/PageLayout";
import React from "react";

const page = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  return (
    <div>
      <PageLayout>
        <EditBudgetReAppro BudgetReApproID={id} />
      </PageLayout>
    </div>
  );
};

export default page;
