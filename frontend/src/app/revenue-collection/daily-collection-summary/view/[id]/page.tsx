import { ViewDailyCollSummary } from "@/components/JuidcoFinance/page/RevenueCollection/DailyCollSummary/ViewDailyCollSummary";
import PageLayout from "@/components/Layouts/PageLayout";
import React from "react";

const page = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  return (
    <PageLayout>
      <ViewDailyCollSummary DailyCollSummaryID={id} />
    </PageLayout>
  );
};

export default page;
