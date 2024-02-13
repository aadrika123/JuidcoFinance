import { EditBudgetAppro } from "@/components/JuidcoFinance/page/Budgeting/BudgetAppro/EditBudgetAppro";
import PageLayout from "@/components/Layouts/PageLayout";
import React from "react";

const page = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  return (
    <div>
      <PageLayout>
        <EditBudgetAppro BudgetApproID={id} />
      </PageLayout>
    </div>
  );
};

export default page;
