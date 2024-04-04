import dotenv from "dotenv";

import app from './app';
import startGRPC from './grpc_server';

dotenv.config();

const PORT = process.env.PORT;
if(PORT){
  app.listen(PORT, () => {
    console.log(`Server is running on port: http://localhost:${PORT}`);
  });  
}else{
  console.log("Server PORT not specified ...");
}

const GRPC_PORT = process.env.GRPC_PORT;
if(GRPC_PORT){
  if(process.env.GRPC_ENABLED === "1"){startGRPC(GRPC_PORT);}
}else{
  console.log("Server CRPC_PORT not specified ...");
}