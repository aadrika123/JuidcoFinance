import { EditLoanManagement } from "@/components/JuidcoFinance/page/Budgeting/LoanManagement/EditLoanManagement";
import PageLayout from "@/components/Layouts/PageLayout";
import React from "react";

const page = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  return (
    <div>
      <PageLayout>
        <EditLoanManagement LoanManagementID={id} />
      </PageLayout>
    </div>
  );
};

export default page;
