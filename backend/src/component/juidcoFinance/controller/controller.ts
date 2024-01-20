"use strict";

import { Request, Response } from "express";
import Dao from "../dao/dao";
import {sendAndLogResponse} from "../../../util/sendResponse"
import errorCodes from "../../../util/errorCodes";
import { Prisma } from '@prisma/client'


class Controller {
  create = async (req: Request, res: Response): Promise<Response> => {
    return res.json("In try block of create function");
    // if (!req.body.isExist) {
    //   //Create StudyPlannerCreateDto

    //   //Transform it in DB Model

    //   //Save it in DB
    //   try {
    //     //Transform it in Json Model
    //     console.log("In try block of create function");
    //   } catch (error) {
    //     console.log("In catch block of create function");

    //     // responseCode = ResponseCode.BAD_REQUEST;

    //     // jsonResponse = {
    //     //   status: false,
    //     //   message: error.message,
    //     // };
    //   }

    //   this.sendAndLogResponse(jsonResponse, responseCode, res);
    // } else {
    //   this.createStudyLecture(req, res);

    // }
  };

  add = async (req: Request, res: Response): Promise<void> => {

    try{
      let dao = new Dao();
      let data = await dao.add();

     sendAndLogResponse(data, 200, res);
    }catch(error: any){
      sendAndLogResponse(error.code, 409, res, false);
    }
   
    // return res.json(`Hello you are in add function ${JSON.stringify(data)}`);
  };

  // sendAndLogResponse = async (
  //   json: any,
  //   responseCode: number,
  //   res: Response
  // )=> {
  //   const size = Buffer.byteLength(JSON.stringify(json));
  //   // this.logger.debug("Response Size: " + size + " bytes");

  //   res.status(responseCode).json(json);
  // };
}

export default Controller;
