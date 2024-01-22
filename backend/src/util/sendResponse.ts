import { Response } from "express";
import errorCodes from "./errorCodes";

/**
 * | Response Msg Version with apiMetaData
 */

export const sendResponse = async (
  status: boolean,
  message: string,
  resData: unknown,
  responseCode: number,
  action: string,
  apiId: string,
  version: string,
  res: Response,
  deviceId?: string
): Promise<Response> => {
  if (!status) {
    resData = errorCodes[resData as keyof typeof errorCodes];
  }

  const jsonRes = {
    status,
    message,
    "meta-data": {
      apiId,
      version,
      responseTime: responseTime(res),
      action,
      deviceId,
    },
    data: resData,
  };

  return res.status(responseCode).json(jsonRes);
};


// export const responseTime = (req:Request, res:Response, next: NextFunction): void=>{
//   const startTime = process.hrtime();
//   // let totalTimeInMs;

//   res.on('finish', ()=>{
//     const totalTime = process.hrtime(startTime);
//      const totalTimeInMs = totalTime[0] * 1000 + totalTime[1] / 1e6;
//      res.locals.responseTime = totalTimeInMs;
//      console.log("first",res.locals.responseTime)
//   });
//   next();
//   // return totalTimeInMs;
// }

const responseTime = (res: Response): Promise<number> => {
  const startTime = process.hrtime();

  return new Promise((resolve) => {
    res.on('finish', () => {
      const totalTime = process.hrtime(startTime);
      const totalTimeInMs = totalTime[0] * 1000 + totalTime[1] / 1e6;
      resolve(totalTimeInMs);
    });
  });
};
