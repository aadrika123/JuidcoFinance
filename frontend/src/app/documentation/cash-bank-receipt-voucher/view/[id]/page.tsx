import { ViewCashBankRVoucher } from "@/components/JuidcoFinance/page/Documentation/CashBankReceiptVoucher/ViewCashBankRVoucher";
import PageLayout from "@/components/Layouts/PageLayout";
import React from "react";

const page = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  return (
    <div>
      <PageLayout>
        <ViewCashBankRVoucher ReceiptVoucherID={id} />
      </PageLayout>
    </div>
  );
};

export default page;
