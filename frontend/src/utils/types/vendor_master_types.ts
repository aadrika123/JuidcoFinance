// Vendor Master Types //

export interface VendorDetailsData {
  is_authorized?: boolean;
  id?: number;
  vendor_no?: string;
  vendor_type?: {
    name: string;
  }
  vendor_type_id: string | number;
  department_id: string | number;
  name: string;
  mobile_no: string;
  tin_no: string;
  gst_no: string;
  pan_no: string;
  bank_name: string;
  ifsc_code: string;
  email: string;
  contact_address: string;
  aadhar_no: string;
  bank_account_no: string;
  bank_branch_name: string;
}
