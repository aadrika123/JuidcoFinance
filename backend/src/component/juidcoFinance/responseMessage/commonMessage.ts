export function resMessage(value: string): {
    NOT_FOUND: string;
    FOUND: string;
    CREATED: string;
    UPDATED: string;
    LOGIN: string;
    INVALID: string;
  } {
    const NOT_FOUND: string =`${value} Not Found`;
    const FOUND: string = `${value} Found Successfully!!`;
    const CREATED: string =`${value} created Successfully!!`;
    const UPDATED: string = `${value} updated Successfully!!`;
    const LOGIN: string = `${value} Loged in Successfully!!`;
    const INVALID: string = `Invalid ${value}`;
  
    return { FOUND, NOT_FOUND, CREATED, UPDATED, LOGIN, INVALID};
  }