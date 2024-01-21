import express from "express";
import dotenv from 'dotenv';
import FinanceRoute from "./component/juidcoFinance/router";

dotenv.config();
const app = express();
app.use(express.json());

/// JUIDCO_FINANCE ///
new FinanceRoute(app);

export default app;
