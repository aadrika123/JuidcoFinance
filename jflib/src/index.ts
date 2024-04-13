'use strict';

import BankMasterValidation from "./validations/BankMasterValidation";
import { AccountingCodeType } from "./standard/accounting_code_types";
import BalanceTrackingsValidation from "./validations/BalanceTrackingsValidation";

// escape input string for in regular expressions
const escapeRegExp = (text:string):string => {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}


export {
  escapeRegExp,
  AccountingCodeType,
  BankMasterValidation,
  BalanceTrackingsValidation
};
