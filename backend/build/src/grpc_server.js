"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const grpc_js_1 = require("@grpc/grpc-js");
const helloworld_grpc_pb_1 = require("./grpc/proto/helloworld_grpc_pb");
const helloworld_services_1 = require("./grpc/services/helloworld_services");
const dbtest_grpc_pb_1 = require("./grpc/proto/dbtest_grpc_pb");
const dbtest_services_1 = require("./grpc/services/dbtest_services");
const holding_and_tax_grpc_pb_1 = require("./grpc/proto/holding_and_tax_grpc_pb");
const holding_and_tax_services_1 = require("./grpc/services/holding_and_tax_services");
const record_new_assess_demand_grpc_pb_1 = require("./grpc/proto/record_new_assess_demand_grpc_pb");
const record_new_assess_demand_services_1 = require("./grpc/services/holding_and_tax/record_new_assess_demand_services");
const startGRPC = (port) => {
    const server = new grpc_js_1.Server();
    server.addService(helloworld_grpc_pb_1.GreeterService, helloworld_services_1.GreeterServer);
    server.addService(dbtest_grpc_pb_1.DatabaseTesterService, dbtest_services_1.DatabaseTestServer);
    server.addService(holding_and_tax_grpc_pb_1.HoldingAndTaxService, holding_and_tax_services_1.HoldingAndTaxServer);
    server.addService(record_new_assess_demand_grpc_pb_1.RecordNewAssesDemandService, record_new_assess_demand_services_1.RecordDemandsOnNewAsses);
    const uri = `0.0.0.0:${port}`;
    console.log(`Listening on ${uri}`);
    server.bindAsync(uri, grpc_js_1.ServerCredentials.createInsecure(), (err) => {
        if (err)
            console.log(err);
        server.start();
    });
    process.on('SIGINT', () => {
        console.log("Stopping GRPC server.");
        server.tryShutdown(() => {
            console.log("GRPC server finished!");
            process.exit(0);
        });
    });
};
exports.default = startGRPC;
