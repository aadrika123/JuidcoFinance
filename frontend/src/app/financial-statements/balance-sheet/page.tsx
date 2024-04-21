import { BalanceSheetComponent } from "@/components/JuidcoFinance/FinancialStatements/BalanceSheet/Index";
import PageLayout from "@/components/Layouts/PageLayout";
import React from "react";

export default function Home() {
 
  return (
    <PageLayout>
        <BalanceSheetComponent />
    </PageLayout>
  );
}
