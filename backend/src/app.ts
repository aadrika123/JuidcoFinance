import express from "express";
import FinanceRoute from "./component/juidcoFinance/router";
import cors from "cors";
import { resourcesUsage, responseTime } from "./component/juidcoFinance/middleware/responseTime";

const app = express();
app.use(express.json());
app.use(cors());
app.use(responseTime);
app.use(resourcesUsage);

/// JUIDCO_FINANCE ///
new FinanceRoute(app);

export default app;
