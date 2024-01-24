// Vendor Master Types //

export interface VendorDetailsData {
  id: number;
  vendor_type: {
    id: number;
    name: string;
  };
  department: {
    id: number;
    name: string;
  };
  name: string;
  mobile_no: string;
  tin_no: string;
  gst_no: string;
  comm_address: string;
  pan_no: string;
  bank_name: string;
  ifsc_code: string;
  email: string;
  office_address: string;
  aadhar_no: string;
  bank_account_no: string;
  bank_branch_name: string;
  is_authorized: boolean;
  created_at: string;
  authorized_date: string | null;
  updated_at: string;
}
