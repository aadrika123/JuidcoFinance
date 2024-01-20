"use strict";

import Router from "./component/juidcoFinance/route/router";
import express from "express";
import dotenv from 'dotenv';

dotenv.config();
const app = express();
app.use(express.json());

/// ROUTER ///
const router = new Router();
router.configure(app);

export default app;
