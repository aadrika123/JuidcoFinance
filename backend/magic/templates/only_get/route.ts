"use strict";

import { baseUrl } from "../../../util/common";
import express, { Request, Response } from "express";


class {{Bank}}Route {
  private controller: {{Bank}}Controller;
  constructor() {
    this.controller = new {{Bank}}Controller();
  }

  configure(app: express.Application, apiId: string): void {
    app.route(`${baseUrl}/{{banks}}/get`).get((req: Request, res: Response) => this.controller.get(req, res, apiId + "01"));
  }
}

export default {{Bank}}Route;
