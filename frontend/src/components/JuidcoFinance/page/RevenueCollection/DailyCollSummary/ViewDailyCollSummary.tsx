// "use client";

// import React, { lazy, useEffect, useState } from "react";
// import { FINANCE_URL } from "@/utils/api/urls";
// import axios from "@/lib/axiosConfig";
// import { DateFormatter } from "@/utils/helper";
// import { useQuery } from "react-query";
// const HeaderWidget = lazy(() =>
//   import("@/components/Helpers/Widgets/HeaderWidget").then((module) => ({
//     default: module.HeaderWidget,
//   }))
// );
// const FormikW = lazy(() => import("../ReceiptRegister/ReceiptRegisterFormFields"));
// import { ReceiptRegisterDetailsData } from "../ReceiptRegister/receipt_register_types";
// import { receiptRegisterDetailsSchema } from "../ReceiptRegister/receipt_register.validation";
// import Loader from "@/components/global/atoms/Loader";

// export const ViewDailyCollSummary = ({
//   DailyCollSummaryID,
// }: {
//   DailyCollSummaryID: string;
// }) => {

//   const [initialData, setInitialData] = useState<ReceiptRegisterDetailsData>({
//     receipt_no: "",
//     ulb_id: "",
//     primary_acc_code_id: "",
//     revenue_module_id: "",
//     revenue_accounted_type_id: "",
//     paid_by: "",
//     receipt_mode_id: "",
//     receipt_date: "",
//     cheque_or_draft_no: "",
//     bank_amount: "",
//     cash_amount: "",
//     bank_acc_no: "",
//     deposit_date: "",
//     realisation_date: "",
//     wheather_returned: undefined,
//     remarks: "",
//     entered_by_id: "",
//     entered_by_print_name: "",
//     checked_by_id: "",
//     checked_by_print_name: "",
//   });

//   // Get voucher entry bv ID
//   const fetchData = async () => {
//     try {
//       const res = await axios({
//         method: "GET",
//         url: `${FINANCE_URL.DAILY_COLL_SUMMARY.getById}/${DailyCollSummaryID}`,
//       });

//       if (!res.data.status) {
//         throw "Something Went Wrong!!!";
//       } else if (!res.data.data) {
//         throw "Not Found";
//       }
//       setInitialData((prev) => {
//         return {
//           ...prev,
//           receipt_no: res.data.data.receipt_no,
//           ulb_id: res.data.data.ulb.id,
//           primary_acc_code_id: res.data.data.primary_acc_code.id,
//           revenue_module_id: res.data.data.revenue_module.id,
//           revenue_accounted_type_id: res.data.data.revenue_accounted_type.id,
//           paid_by: res.data.data.paid_by,
//           receipt_mode_id: res.data.data.receipt_mode.id,
//           receipt_date: DateFormatter(res.data.data.receipt_date) || "",
//           cheque_or_draft_no: res.data.data?.cheque_or_draft_no || "",
//           bank_amount: res.data.data.bank_amount,
//           cash_amount: res.data.data.cash_amount,
//           bank_acc_no: res.data.data.bank_acc_no || "",
//           deposit_date:  DateFormatter(res.data.data.deposit_date) ,
//           realisation_date: DateFormatter(res.data.data.realisation_date),
//           wheather_returned: res.data.data.wheather_returned,
//           remarks: res.data.data.remarks,
//           entered_by_id: res.data.data.entered_by.id,
//           entered_by_print_name: res.data.data.entered_by_print_name,
//           checked_by_id: res.data.data.checked_by_id?.id,
//           checked_by_print_name: res.data.data.checked_by_print_name,
//           del_checked_by_name: res.data.data.checked_by?.name,
//           del_checked_by_designation:
//             res.data.data.checked_by?.wf_roleusermaps[0]?.wf_role?.role_name,
//           del_entered_by_name: res.data.data.entered_by.name,
//           del_entered_by_designation:
//             res.data.data.entered_by?.wf_roleusermaps[0]?.wf_role?.role_name,
//         };
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const { refetch: reloadData, isFetching: isFetching } = useQuery(
//     ["daily-coll-summary-get-single", DailyCollSummaryID],
//     fetchData
//   );

//   useEffect(() => {
//     reloadData();
//   }, [DailyCollSummaryID]);

//   return (
//     <>
//       <HeaderWidget
//         title="Daily Collection Summary"
//         variant="view"
//       />
//       {isFetching ? (
//         <Loader />
//       ) : (
//         <FormikW
//           title=""
//           initialValues={initialData}
//           enableReinitialize={true}
//           validationSchema={receiptRegisterDetailsSchema}
//           onSubmit={()=>{}}
//           readonly={true}
//         />
//       )}
//     </>
//   );
// };
