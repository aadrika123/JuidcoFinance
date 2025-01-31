/**
 * | Author- Bijoy Paitandi
 * | Created On- 26-01-2024
 * | Status: open
 * | Intended Use: central place to define API endpoints
 */

const APIs = class {
  // Chequebook master apis

  static chequebook_master_root = "/api/v1/finance/chequebook-entry"
  static chequebook_master$get = this.chequebook_master_root+"/get";
  static chequebook_mater$create = this.chequebook_master_root+"/create";
  static chequebook_master$update = this.chequebook_master_root+"/update";
  static chequebook_master$employee_list = this.chequebook_master_root+"/get-employee-list";

  static receipt_entry_root = "/api/v1/finance/receipt-entry";
  static receipt_entry$get = this.receipt_entry_root+"/get";


  static modules_root = "/modules/get";

  static receipt_type_root = "/receipt-types/get";

  static employee_root = "/employees/get";


  static bank_types_root = "/bank-types";
  static bank_types$get = this.bank_types_root + "/get";

  static chart_of_accounts_root = "";
  static chart_of_accounts$get_municipality_codes = this.chart_of_accounts_root + "/get-all-munci-code";

}


export default APIs;