// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var dbtest_pb = require('./dbtest_pb.js');

function serialize_dbtest_Bank(arg) {
  if (!(arg instanceof dbtest_pb.Bank)) {
    throw new Error('Expected argument of type dbtest.Bank');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_dbtest_Bank(buffer_arg) {
  return dbtest_pb.Bank.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_dbtest_BankRequest(arg) {
  if (!(arg instanceof dbtest_pb.BankRequest)) {
    throw new Error('Expected argument of type dbtest.BankRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_dbtest_BankRequest(buffer_arg) {
  return dbtest_pb.BankRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_dbtest_BanksRequest(arg) {
  if (!(arg instanceof dbtest_pb.BanksRequest)) {
    throw new Error('Expected argument of type dbtest.BanksRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_dbtest_BanksRequest(buffer_arg) {
  return dbtest_pb.BanksRequest.deserializeBinary(new Uint8Array(buffer_arg));
}


var DatabaseTesterService = exports.DatabaseTesterService = {
  getBank: {
    path: '/dbtest.DatabaseTester/GetBank',
    requestStream: false,
    responseStream: false,
    requestType: dbtest_pb.BankRequest,
    responseType: dbtest_pb.Bank,
    requestSerialize: serialize_dbtest_BankRequest,
    requestDeserialize: deserialize_dbtest_BankRequest,
    responseSerialize: serialize_dbtest_Bank,
    responseDeserialize: deserialize_dbtest_Bank,
  },
  getBanks: {
    path: '/dbtest.DatabaseTester/GetBanks',
    requestStream: false,
    responseStream: true,
    requestType: dbtest_pb.BanksRequest,
    responseType: dbtest_pb.Bank,
    requestSerialize: serialize_dbtest_BanksRequest,
    requestDeserialize: deserialize_dbtest_BanksRequest,
    responseSerialize: serialize_dbtest_Bank,
    responseDeserialize: deserialize_dbtest_Bank,
  },
};

exports.DatabaseTesterClient = grpc.makeGenericClientConstructor(DatabaseTesterService);
