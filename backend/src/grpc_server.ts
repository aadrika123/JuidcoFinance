import { Server, ServerCredentials } from "@grpc/grpc-js";
import { GreeterService } from "./grpc/proto/helloworld_grpc_pb";
import { GreeterServer } from "./grpc/services/helloworld_services";
import { DatabaseTesterService } from "./grpc/proto/dbtest_grpc_pb";
import { DatabaseTestServer } from "./grpc/services/dbtest_services";

import {HoldingAndTaxService } from "./grpc/proto/holding_and_tax_grpc_pb";
import { HoldingAndTaxServer } from "./grpc/services/holding_and_tax_services";
import { RecordNewAssesDemandService } from "./grpc/proto/record_new_assess_demand_grpc_pb";
import { RecordDemandsOnNewAsses } from "./grpc/services/holding_and_tax/record_new_assess_demand_services";
import { PetRegistrationService } from "./grpc/proto/pet_registration_grpc_pb";
import { PetRegistrationServer } from "./grpc/services/PetRegistrationServer";

const startGRPC = (port: number | string) => {
  const server = new Server();

  server.addService(GreeterService, GreeterServer);
  server.addService(DatabaseTesterService, DatabaseTestServer);
  server.addService(HoldingAndTaxService, HoldingAndTaxServer);
  server.addService(RecordNewAssesDemandService, RecordDemandsOnNewAsses)
  server.addService(PetRegistrationService, PetRegistrationServer);

  const uri = `0.0.0.0:${port}`;
  console.log(`Listening on ${uri}`);
  server.bindAsync(uri, ServerCredentials.createInsecure(), (err) => {
    if (err) console.log(err);
    server.start();
  });


  process.on('SIGINT', () => {
    console.log("Stopping GRPC server.");
    server.tryShutdown(() => {
      console.log("GRPC server finished!");
      process.exit(0);
    });
  });
   
}

export default startGRPC;

