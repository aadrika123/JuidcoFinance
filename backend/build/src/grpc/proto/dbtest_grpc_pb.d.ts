// package: dbtest
// file: dbtest.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "@grpc/grpc-js";
import * as dbtest_pb from "./dbtest_pb";

interface IDatabaseTesterService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    getBank: IDatabaseTesterService_IGetBank;
    getBanks: IDatabaseTesterService_IGetBanks;
}

interface IDatabaseTesterService_IGetBank extends grpc.MethodDefinition<dbtest_pb.BankRequest, dbtest_pb.Bank> {
    path: "/dbtest.DatabaseTester/GetBank";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<dbtest_pb.BankRequest>;
    requestDeserialize: grpc.deserialize<dbtest_pb.BankRequest>;
    responseSerialize: grpc.serialize<dbtest_pb.Bank>;
    responseDeserialize: grpc.deserialize<dbtest_pb.Bank>;
}
interface IDatabaseTesterService_IGetBanks extends grpc.MethodDefinition<dbtest_pb.BanksRequest, dbtest_pb.Bank> {
    path: "/dbtest.DatabaseTester/GetBanks";
    requestStream: false;
    responseStream: true;
    requestSerialize: grpc.serialize<dbtest_pb.BanksRequest>;
    requestDeserialize: grpc.deserialize<dbtest_pb.BanksRequest>;
    responseSerialize: grpc.serialize<dbtest_pb.Bank>;
    responseDeserialize: grpc.deserialize<dbtest_pb.Bank>;
}

export const DatabaseTesterService: IDatabaseTesterService;

export interface IDatabaseTesterServer extends grpc.UntypedServiceImplementation {
    getBank: grpc.handleUnaryCall<dbtest_pb.BankRequest, dbtest_pb.Bank>;
    getBanks: grpc.handleServerStreamingCall<dbtest_pb.BanksRequest, dbtest_pb.Bank>;
}

export interface IDatabaseTesterClient {
    getBank(request: dbtest_pb.BankRequest, callback: (error: grpc.ServiceError | null, response: dbtest_pb.Bank) => void): grpc.ClientUnaryCall;
    getBank(request: dbtest_pb.BankRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: dbtest_pb.Bank) => void): grpc.ClientUnaryCall;
    getBank(request: dbtest_pb.BankRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: dbtest_pb.Bank) => void): grpc.ClientUnaryCall;
    getBanks(request: dbtest_pb.BanksRequest, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<dbtest_pb.Bank>;
    getBanks(request: dbtest_pb.BanksRequest, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<dbtest_pb.Bank>;
}

export class DatabaseTesterClient extends grpc.Client implements IDatabaseTesterClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
    public getBank(request: dbtest_pb.BankRequest, callback: (error: grpc.ServiceError | null, response: dbtest_pb.Bank) => void): grpc.ClientUnaryCall;
    public getBank(request: dbtest_pb.BankRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: dbtest_pb.Bank) => void): grpc.ClientUnaryCall;
    public getBank(request: dbtest_pb.BankRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: dbtest_pb.Bank) => void): grpc.ClientUnaryCall;
    public getBanks(request: dbtest_pb.BanksRequest, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<dbtest_pb.Bank>;
    public getBanks(request: dbtest_pb.BanksRequest, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<dbtest_pb.Bank>;
}
