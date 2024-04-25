import * as Yup from "yup";

// Validating request data
export const billEntryValidationSchema = Yup.object({
  ulb_id: Yup.number().required("ULB is required").integer().min(1, "Kindly select ulb"),
  bill_date: Yup.date().required("Bill date is required."),
  party_id: Yup.number().required("party id is required.").integer().min(1, "Kindly select party"),
  particulars: Yup.string().required("particulars is required."),
  amount: Yup.number().required("amount is required."),
  remarks: Yup.string().required("remarks is required."),
});
export const multiBillEntryValidationSchema = Yup.array(
  billEntryValidationSchema
);

export default {
  billEntryValidationSchema,
  multiBillEntryValidationSchema
}