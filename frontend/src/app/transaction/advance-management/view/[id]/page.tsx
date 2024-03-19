import { EditAdvanceManagement } from "@/components/JuidcoFinance/page/Budgeting/AdvanceManagement/EditAdvanceManagement";
import PageLayout from "@/components/Layouts/PageLayout";
import React from "react";

const page = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  return (
    <div>
      <PageLayout>
        <EditAdvanceManagement AdvanceManagementID={id} />
      </PageLayout>
    </div>
  );
};

export default page;
