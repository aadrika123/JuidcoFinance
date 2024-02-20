import express from "express";
import FinanceRoute from "./component/juidcoFinance/router";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

/// JUIDCO_FINANCE ///
new FinanceRoute(app);

export default app;
