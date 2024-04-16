import { IncomeStatementComponent } from "@/components/JuidcoFinance/FinancialStatements/IncomeStatement/Index";
import PageLayout from "@/components/Layouts/PageLayout";
import React from "react";

export default function Home() {
 
  return (
    <PageLayout>
      <IncomeStatementComponent />
    </PageLayout>
  );
}
