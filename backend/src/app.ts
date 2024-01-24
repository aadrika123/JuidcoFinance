import express from "express";
import dotenv from 'dotenv';
import FinanceRoute from "./component/juidcoFinance/router";
import cors from "cors";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

/// JUIDCO_FINANCE ///
new FinanceRoute(app);

export default app;
