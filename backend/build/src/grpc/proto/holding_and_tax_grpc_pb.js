// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var holding_and_tax_pb = require('./holding_and_tax_pb.js');

function serialize_holding_and_tax_DemandsOnExistingAssessments(arg) {
  if (!(arg instanceof holding_and_tax_pb.DemandsOnExistingAssessments)) {
    throw new Error('Expected argument of type holding_and_tax.DemandsOnExistingAssessments');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_holding_and_tax_DemandsOnExistingAssessments(buffer_arg) {
  return holding_and_tax_pb.DemandsOnExistingAssessments.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_holding_and_tax_GeneralResponse(arg) {
  if (!(arg instanceof holding_and_tax_pb.GeneralResponse)) {
    throw new Error('Expected argument of type holding_and_tax.GeneralResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_holding_and_tax_GeneralResponse(buffer_arg) {
  return holding_and_tax_pb.GeneralResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var HoldingAndTaxService = exports.HoldingAndTaxService = {
  recordDemandsOnExistingAssessments: {
    path: '/holding_and_tax.HoldingAndTax/RecordDemandsOnExistingAssessments',
    requestStream: false,
    responseStream: false,
    requestType: holding_and_tax_pb.DemandsOnExistingAssessments,
    responseType: holding_and_tax_pb.GeneralResponse,
    requestSerialize: serialize_holding_and_tax_DemandsOnExistingAssessments,
    requestDeserialize: deserialize_holding_and_tax_DemandsOnExistingAssessments,
    responseSerialize: serialize_holding_and_tax_GeneralResponse,
    responseDeserialize: deserialize_holding_and_tax_GeneralResponse,
  },
};

exports.HoldingAndTaxClient = grpc.makeGenericClientConstructor(HoldingAndTaxService);
