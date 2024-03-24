// package: record_new_assess_demand
// file: record_new_assess_demand.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "@grpc/grpc-js";
import * as record_new_assess_demand_pb from "./record_new_assess_demand_pb";

interface IRecordNewAssesDemandService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    recordDemandsOnNewAssessment: IRecordNewAssesDemandService_IRecordDemandsOnNewAssessment;
}

interface IRecordNewAssesDemandService_IRecordDemandsOnNewAssessment extends grpc.MethodDefinition<record_new_assess_demand_pb.NewAssesDemandDetails, record_new_assess_demand_pb.GeneralResponse> {
    path: "/record_new_assess_demand.RecordNewAssesDemand/RecordDemandsOnNewAssessment";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<record_new_assess_demand_pb.NewAssesDemandDetails>;
    requestDeserialize: grpc.deserialize<record_new_assess_demand_pb.NewAssesDemandDetails>;
    responseSerialize: grpc.serialize<record_new_assess_demand_pb.GeneralResponse>;
    responseDeserialize: grpc.deserialize<record_new_assess_demand_pb.GeneralResponse>;
}

export const RecordNewAssesDemandService: IRecordNewAssesDemandService;

export interface IRecordNewAssesDemandServer extends grpc.UntypedServiceImplementation {
    recordDemandsOnNewAssessment: grpc.handleUnaryCall<record_new_assess_demand_pb.NewAssesDemandDetails, record_new_assess_demand_pb.GeneralResponse>;
}

export interface IRecordNewAssesDemandClient {
    recordDemandsOnNewAssessment(request: record_new_assess_demand_pb.NewAssesDemandDetails, callback: (error: grpc.ServiceError | null, response: record_new_assess_demand_pb.GeneralResponse) => void): grpc.ClientUnaryCall;
    recordDemandsOnNewAssessment(request: record_new_assess_demand_pb.NewAssesDemandDetails, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: record_new_assess_demand_pb.GeneralResponse) => void): grpc.ClientUnaryCall;
    recordDemandsOnNewAssessment(request: record_new_assess_demand_pb.NewAssesDemandDetails, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: record_new_assess_demand_pb.GeneralResponse) => void): grpc.ClientUnaryCall;
}

export class RecordNewAssesDemandClient extends grpc.Client implements IRecordNewAssesDemandClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
    public recordDemandsOnNewAssessment(request: record_new_assess_demand_pb.NewAssesDemandDetails, callback: (error: grpc.ServiceError | null, response: record_new_assess_demand_pb.GeneralResponse) => void): grpc.ClientUnaryCall;
    public recordDemandsOnNewAssessment(request: record_new_assess_demand_pb.NewAssesDemandDetails, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: record_new_assess_demand_pb.GeneralResponse) => void): grpc.ClientUnaryCall;
    public recordDemandsOnNewAssessment(request: record_new_assess_demand_pb.NewAssesDemandDetails, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: record_new_assess_demand_pb.GeneralResponse) => void): grpc.ClientUnaryCall;
}
