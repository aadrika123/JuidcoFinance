import { EditGrantManagement } from "@/components/JuidcoFinance/page/Budgeting/GrantManagement/EditGrantManagement";
import PageLayout from "@/components/Layouts/PageLayout";
import React from "react";

const page = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  return (
    <div>
      <PageLayout>
        <EditGrantManagement GrantManagementID={id} />
      </PageLayout>
    </div>
  );
};

export default page;
