import { ViewCashBook } from "@/components/JuidcoFinance/page/Documentation/CashBook/CashBookView";
import PageLayout from "@/components/Layouts/PageLayout";
import React from "react";

const page = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  return (
    <div>
      <PageLayout>
        <ViewCashBook CashBookID={id} />
      </PageLayout>
    </div>
  );
};

export default page;
