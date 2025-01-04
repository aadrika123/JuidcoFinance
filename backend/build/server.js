"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const app_1 = __importDefault(require("./app"));
// import startGRPC from './grpc_server';
dotenv_1.default.config();
const PORT = process.env.PORT || 5001;
// const GRPC_PORT = process.env.GRPC_PORT || 9090;
app_1.default.listen(PORT, () => {
    console.log(`Server is running on port: http://localhost:${PORT}`);
});
// if(process.env.GRPC_ENABLED === "1"){startGRPC(GRPC_PORT);}
