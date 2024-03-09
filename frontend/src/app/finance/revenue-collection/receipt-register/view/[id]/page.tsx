import { EditReceiptRegister } from "@/components/JuidcoFinance/page/RevenueCollection/ReceiptRegister/EditReceiptRegister";
import PageLayout from "@/components/Layouts/PageLayout";
import React from "react";

const page = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  return (
    <div>
      <PageLayout>
        <EditReceiptRegister ReceiptRegisterID={id} />
      </PageLayout>
    </div>
  );
};

export default page;
