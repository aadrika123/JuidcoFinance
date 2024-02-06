/**
 * | Author- Bijoy Paitandi
 * | Created On- 26-01-2024
 * | Status: open
 * | Intended Use: central place to define API endpoints
 */

const APIs = class {
  // Chequebook master routes
  static chequebook_master_root = "/api/v1/finance/chequebook-entry"
  static chequebook_master$get = this.chequebook_master_root+"/get";
  static chequebook_mater$create = this.chequebook_master_root+"/create";
  static chequebook_master$update = this.chequebook_master_root+"/update";
  static chequebook_master$employee_list = this.chequebook_master_root+"/get-employee-list";

  static receipt_entry_root = "/api/v1/finance/receipt-entry";
  static receipt_entry$get = this.receipt_entry_root+"/get";

}


export default APIs;