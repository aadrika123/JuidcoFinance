import {
    ServerUnaryCall,
    sendUnaryData,
  } from "@grpc/grpc-js";
  import { IGreeterServer } from "../proto/helloworld_grpc_pb";
  import { HelloReply, HelloRequest } from "../proto/helloworld_pb";
  
  export const GreeterServer: IGreeterServer = {
    sayHello(call: ServerUnaryCall<HelloRequest, HelloReply>, callback: sendUnaryData<HelloReply>) {
      const helloReply = new HelloReply();
      helloReply.setMessage("Hello! " + call.request.getName());
      callback(null, helloReply);
    },
  };