"use strict";

import { Request, Response } from "express";
import Dao from "../dao/dao";
import {sendResponse} from "../../../util/sendResponse"
import errorCodes from "../../../util/errorCodes";
import { Prisma } from '@prisma/client'

/**
 * | Author- Sanjiv Kumar
 * | Created On- 20-01-2024 
 * | Created for- Controller
 * | Comman apiId- 01
 */

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

       sendResponse(true, "Data Found Successfully!!", data, 200, "GET", "0101", "1.0", res);
    }catch(error: any){
       sendResponse(false, error.message, error.code, 200, "GET", "0101", "1.0", res);

    }
  };
}

export default Controller;
