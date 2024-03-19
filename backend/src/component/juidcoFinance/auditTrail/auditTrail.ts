import { Request, Response } from "express";
import { resObj } from "../../../util/types";
import { PrismaClient } from "@prisma/client";
import { warnlogger } from "../../../../loggerConfig";

const prisma = new PrismaClient();

class AuditTrail {
  constructor() {
    //
  }

  store = async (error: any, resObj: resObj, res: Response, req: Request) => {
    const totalTime = process.hrtime(res.locals.startTime);

    try {
      await prisma.audit_trails.create({
        data: {
          error: error,
          message: error.message,
          meta_data: {
            ...resObj,
            responseTime: totalTime[0] * 1000 + totalTime[1] / 1e6,
          },
          user: res.locals.user || {
            user: "User Not Found, BCZ of Invalid Token!!!",
          },
          payload: {
            body: { ...req?.body },
            params: { ...req?.params },
            headers: { ...req?.headers },
          },
          ram_usage: res.locals.memoInfo || 0.0,
          request_no: 0,
          db_connection_no: 0,
          cpu_usage: res.locals.cpuInfo || 0.0,
        },
      });

    } catch (error: any) {
      warnlogger.warn({
        metaData: {
          ...resObj,
          responseTime: totalTime[0] * 1000 + totalTime[1] / 1e6,
        },
        error,
        message: error.message,
      });
    }
  };
}

export default AuditTrail;
