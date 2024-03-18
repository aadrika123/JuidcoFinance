import { EditVoucherEntry } from "@/components/JuidcoFinance/page/Documentation/VoucherEntry/EditVoucherEntry";
import PageLayout from "@/components/Layouts/PageLayout";
import React from "react";

const page = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  return (
    <div>
      <PageLayout>
        <EditVoucherEntry VoucherEntryID={id} />
      </PageLayout>
    </div>
  );
};

export default page;
