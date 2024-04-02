import { Request, Response } from "express";
import ReceiptEntryDao from "../../dao/transactions/receiptEntryDao";
import Joi from "joi";
import { resObj } from "../../../../util/types";
import { receiptValidation, receiptValidationWithID } from "../../requests/transactions/receiptEntryValidation";
import CommonRes from "../../../../util/helper/commonResponse";
import { resMessage } from "../../responseMessage/commonMessage";

import MemoryStream from 'memorystream';

import latex from 'node-latex';
import fs from 'fs';
import dayjs from "dayjs";
import lescape from 'escape-latex';


/**
 * | Author- Bijoy Paitandi
 * | Created On- 31-01-2024
 * | Created for- Chequebook Entry
 * | Status- open
 */

class ReceiptEntryController {
  private dao: ReceiptEntryDao;
  private initMsg: string;
  constructor() {
    this.dao = new ReceiptEntryDao();
    this.initMsg = "Receipt entry";

  }

  create = async (req: Request, res: Response, apiId: string): Promise<Response> => {
    const resObj: resObj = {
      apiId,
      action: "POST",
      version: "1.0",
    };
    try {

      console.log(req.body.data);

      const { error } = receiptValidation.validate(req.body.data);

      if (error) return CommonRes.VALIDATION_ERROR(error, resObj, res, req);

      const data = await this.dao.store(req);
      return CommonRes.CREATED(
        resMessage(this.initMsg).CREATED,
        data,
        resObj,
        res
      );
    } catch (error: any) {
      console.log(error);
      return CommonRes.SERVER_ERROR(error, resObj, res, req);
    }
  };

  get = async (req: Request, res: Response, apiId: string): Promise<Response> => {
    const resObj: resObj = {
      apiId,
      action: "GET",
      version: "1.0",
    };
    try {
      const data = await this.dao.get(req);

      if (!data)
        return CommonRes.SUCCESS(
          resMessage(this.initMsg).NOT_FOUND,
          data,
          resObj,
          res
        );

      return CommonRes.SUCCESS(resMessage(this.initMsg).FOUND, data, resObj, res);
    } catch (error: any) {
      return CommonRes.SERVER_ERROR(error, resObj, res, req);
    }
  };


  // get receipt by ID
  getById = async (req: Request, res: Response, apiId: string): Promise<Response> => {

    const resObj: resObj = {
      apiId,
      action: "GET",
      version: "1.0",
    };

    try {
      // get the data
      const id: number = Number(req.params.receiptId);


      // validate
      const { error } = Joi.object({
        id: Joi.number().required()
      }).validate({ 'id': id });

      if (error) return CommonRes.VALIDATION_ERROR(error, resObj, res, req);

      const data = await this.dao.getById(id);

      if (!data)
        return CommonRes.SUCCESS(
          resMessage(this.initMsg).NOT_FOUND,
          data,
          resObj,
          res
        );

      return CommonRes.SUCCESS(resMessage(this.initMsg).FOUND, data, resObj, res);
    } catch (error: any) {
      return CommonRes.SERVER_ERROR(error, resObj, res, req);
    }

  };


  update = async (
    req: Request,
    res: Response,
    apiId: string
  ): Promise<Response> => {
    const resObj: resObj = {
      apiId,
      action: "POST",
      version: "1.0",
    };
    try {
      const { error } = receiptValidationWithID.validate(req.body.data);

      if (error) return CommonRes.VALIDATION_ERROR(error, resObj, res, req);

      const data = await this.dao.update(req);
      return CommonRes.CREATED(
        resMessage(this.initMsg).UPDATED,
        data,
        resObj,
        res
      );
    } catch (error: any) {
      return CommonRes.SERVER_ERROR(error, resObj, res, req);
    }
  };

  // get receipt by ID
  getPDF = async (req: Request, res: Response, apiId: string): Promise<Response> => {

    const resObj: resObj = {
      apiId,
      action: "GET",
      version: "1.0",
    };

    try {
      // get the data
      const id: number = Number(req.params.receiptId);


      // validate
      const { error } = Joi.object({
        id: Joi.number().required()
      }).validate({ 'id': id });

      if (error) return CommonRes.VALIDATION_ERROR(error, resObj, res, req);

      const data = await this.dao.getById(id);

      if (!data)
        return CommonRes.SUCCESS(
          resMessage(this.initMsg).NOT_FOUND,
          data,
          resObj,
          res
        );


      
      const texFile = './src/data/typesettings/receipt.tex';
      const texTemplate = fs.readFileSync(texFile).toString();

      const data1 = {...data,
        receipt_type: data.receipt_type.name,
        ward_no: data.admin_ward.name,
        subledger: data.subledger.name,
        date: dayjs(data.date).format('DD MMM YYYY')
      };
      1

      const texData = texTemplate.replace(
        /%(\w*)%/g, // or /{(\w*)}/g for "{this} instead of %this%"
        function( m, key ){
          return Object.prototype.hasOwnProperty.call(data1, key) ? lescape(data1[ key as keyof typeof data1 ]) : "";
        }
      );

      res.status(200).setHeader("Content-Type", "application/pdf");

      const pdf = latex(new MemoryStream(texData));
      pdf.pipe(res);
 
      return res;
    } catch (error: any) {
      return CommonRes.SERVER_ERROR(error, resObj, res, req);
    }

  };


}

export default ReceiptEntryController;
