"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GreeterServer = void 0;
const helloworld_pb_1 = require("../proto/helloworld_pb");
exports.GreeterServer = {
    sayHello(call, callback) {
        const helloReply = new helloworld_pb_1.HelloReply();
        helloReply.setMessage("Hello! " + call.request.getName());
        callback(null, helloReply);
    },
};
