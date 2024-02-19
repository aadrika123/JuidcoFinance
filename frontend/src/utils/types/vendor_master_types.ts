// Vendor Master Types //

export interface VendorDetailsData {
  id?: number;
  is_authorized?: boolean;
  vendor_no?: string;
  vendor_type?: {
    id: string;
    name: string;
  };
  vendor_type_id: string | number;
  department_id: string | number;
  department?: {
    id: string;
  };
  name: string;
  mobile_no: string;
  tin_no: string;
  gst_no: string;
  pan_no: string;
  bank_id: number | string;
  bank?: {
    id: number | string;
  };
  ifsc_code: string;
  email: string;
  contact_address: string;
  aadhar_no: string;
  bank_account_no: string;
  bank_branch_name: string;
}
