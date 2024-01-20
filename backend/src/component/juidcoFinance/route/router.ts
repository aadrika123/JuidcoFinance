"use strict";

import Controller from '../controller/controller';
import express from 'express';

class Router {
  private controller: Controller;

  constructor() {
    this.controller = new Controller();
  }

  configure(app: express.Application): void {
    app
      .route(`/api/v1/create`)
      .get(this.controller.create);

    app
      .route(`/api/v1/yes`)
      .get(this.controller.add);
  } 
}

export default Router;
