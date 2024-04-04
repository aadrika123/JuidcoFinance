import express, { Request, Response } from "express";

export interface APIv1Response {
  status: boolean;
  code: number;
  message: string;
  data: any;
}

export class APIv1 {

  protected apiVersion = "v1";
  protected baseUrl;
  protected routeId;
  protected app;
  protected routeName;
  protected apiCount = 0;

  constructor(routeId: string, app: express.Application, routeName: string) {
    this.routeId = routeId.padStart(2,"0");
    this.app = app;
    this.routeName = routeName;
    this.baseUrl = `/api/finance/${this.apiVersion}/${this.routeName}`;
  }

  addGetRoute(path: string, handler: (req: Request) => Promise<APIv1Response>): void {
    this.app.route(`${this.baseUrl}/${path}`)
      .get((req: Request, res: Response) => this.apiWrapper(req, res, this.generateAPIId(), handler));
  }

  addPostRoute(path: string, handler: (req: Request) => Promise<APIv1Response>): void {
    this.app.route(`${this.baseUrl}/${path}`)
      .post((req: Request, res: Response) => this.apiWrapper(req, res, this.generateAPIId(), handler));
  }

  private generateAPIId = () => {
    return `${this.routeId}`+`${++this.apiCount}`.padStart(2, "0");
  }

  protected apiWrapper = async (req: Request, res: Response, apiId: string, handler: (req: Request) => Promise<APIv1Response>): Promise<Response> => {

    console.log(`api call (${req.path})`);
    const result: APIv1Response = await handler(req);
    console.log("api finished");

    if (result.code == 500) {
      console.log(result);
    }

    const finalResponse = {
      ...result,
      "meta-data": {
        apiId: apiId,
        version: this.apiVersion,
        action: req.method,
      },
    };


    return res.status(result.code).json(finalResponse);
  }


}