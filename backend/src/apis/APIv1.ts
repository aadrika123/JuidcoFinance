import express, { Request, Response } from "express";

export interface APIv1Response{
    status: boolean;
    code: number;
    msg: string;
    data: any; 
}

export class APIv1{
    
    protected apiVersion = "v1";
    protected baseUrl = `/api/finance/${this.apiVersion}`;    
    protected routeId;
    protected app;
    protected apiCount = 0;

    protected apiWrapper = async (req: Request, res: Response, apiNumber: string, handler: (req: Request) => Promise<APIv1Response>) : Promise<Response> => {

        console.log(`api call (${req.path})`);
        const result: APIv1Response =  await handler(req);
        console.log("api finished");
    
        if(result.code == 500){
          console.log(result);
        }
    
        const finalResponse = {
            status: result.status,
            message: result.msg,
            "meta-data": {
              apiId: this.routeId+apiNumber,
              version: this.apiVersion,
              action: req.method,
            },
            data: result.data,
          };
        
        
        return res.status(result.code).json(finalResponse);
    }

    constructor(routeId: string, app: express.Application){
      this.routeId = routeId;
      this.app = app;
    }

    getRoute(path: string, handler: (req: Request) => Promise<APIv1Response>): void{
      this.app.route(`${this.baseUrl}/${path}`)
      .get((req: Request, res: Response) => this.apiWrapper(req, res, `${++this.apiCount}`.padStart(2), handler));
    }

    postRoute(path: string, handler: (req: Request) => Promise<APIv1Response>): void{
      this.app.route(`${this.baseUrl}/${path}`)
      .post((req: Request, res: Response) => this.apiWrapper(req, res, `${++this.apiCount}`.padStart(2), handler));
    }
}