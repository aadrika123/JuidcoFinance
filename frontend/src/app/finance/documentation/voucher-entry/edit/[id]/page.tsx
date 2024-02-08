import { EditVoucherEntry } from "@/components/JuidcoFinance/page/Documentation/VoucherEntry/EditVoucher/Index";
import PageLayout from "@/components/Layouts/PageLayout";
import React from "react";

const page = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  return (
    <div>
      <PageLayout>
        <EditVoucherEntry VoucherID={id} />
      </PageLayout>
    </div>
  );
};

export default page;
