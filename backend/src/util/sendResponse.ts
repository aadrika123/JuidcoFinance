import {Response} from "express";
import errorCodes from "./errorCodes"

export const sendAndLogResponse = async (
    json: any,
    responseCode: number,
    res: Response,
    status?: boolean | true
  ): Promise<Response>=> {
    const size = Buffer.byteLength(JSON.stringify(json));
    // this.logger.debug("Response Size: " + size + " bytes");
    if(!status){
        json = errorCodes[json as keyof typeof errorCodes];
    }
   return res.status(responseCode).json(json);
  };