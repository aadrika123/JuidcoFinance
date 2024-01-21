"use strict";

import Controller from '../controller/controller';
import express from 'express';

/**
 * | Route - 01
 */

class Router {
  private controller: Controller;

  constructor() {
    this.controller = new Controller();
  }

  configure(app: express.Application): void {
    app
      .route(`/api/v1/create`)
      .get(this.controller.create);   //0101

    app
      .route(`/api/v1/yes`)
      .get(this.controller.add);    //0102
  } 
}

export default Router;
