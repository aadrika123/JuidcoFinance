// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var record_new_assess_demand_pb = require('./record_new_assess_demand_pb.js');

function serialize_record_new_assess_demand_GeneralResponse(arg) {
  if (!(arg instanceof record_new_assess_demand_pb.GeneralResponse)) {
    throw new Error('Expected argument of type record_new_assess_demand.GeneralResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_record_new_assess_demand_GeneralResponse(buffer_arg) {
  return record_new_assess_demand_pb.GeneralResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_record_new_assess_demand_NewAssesDemandDetails(arg) {
  if (!(arg instanceof record_new_assess_demand_pb.NewAssesDemandDetails)) {
    throw new Error('Expected argument of type record_new_assess_demand.NewAssesDemandDetails');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_record_new_assess_demand_NewAssesDemandDetails(buffer_arg) {
  return record_new_assess_demand_pb.NewAssesDemandDetails.deserializeBinary(new Uint8Array(buffer_arg));
}


var RecordNewAssesDemandService = exports.RecordNewAssesDemandService = {
  recordDemandsOnNewAssessment: {
    path: '/record_new_assess_demand.RecordNewAssesDemand/RecordDemandsOnNewAssessment',
    requestStream: false,
    responseStream: false,
    requestType: record_new_assess_demand_pb.NewAssesDemandDetails,
    responseType: record_new_assess_demand_pb.GeneralResponse,
    requestSerialize: serialize_record_new_assess_demand_NewAssesDemandDetails,
    requestDeserialize: deserialize_record_new_assess_demand_NewAssesDemandDetails,
    responseSerialize: serialize_record_new_assess_demand_GeneralResponse,
    responseDeserialize: deserialize_record_new_assess_demand_GeneralResponse,
  },
};

exports.RecordNewAssesDemandClient = grpc.makeGenericClientConstructor(RecordNewAssesDemandService);
