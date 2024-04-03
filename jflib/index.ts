'use strict';

import BankMasterValidation from "./src/validations/BankMasterValidation";

// escape input string for in regular expressions
const escapeRegExp = (text:string):string => {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}


export {
  escapeRegExp,
  BankMasterValidation
};
