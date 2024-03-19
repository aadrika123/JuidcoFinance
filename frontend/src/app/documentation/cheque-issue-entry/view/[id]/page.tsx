import { EditChequeIssueEntry } from "@/components/JuidcoFinance/page/Documentation/ChequeIssueEntry/EditChequeIssue/Index";
import PageLayout from "@/components/Layouts/PageLayout";
import React from "react";

const page = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  return (
    <div>
      <PageLayout>
        <EditChequeIssueEntry ChequeIssueID={id} />
      </PageLayout>
    </div>
  );
};

export default page;
