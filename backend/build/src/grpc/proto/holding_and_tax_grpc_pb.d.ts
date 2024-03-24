// package: holding_and_tax
// file: holding_and_tax.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "@grpc/grpc-js";
import * as holding_and_tax_pb from "./holding_and_tax_pb";

interface IHoldingAndTaxService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    recordDemandsOnExistingAssessments: IHoldingAndTaxService_IRecordDemandsOnExistingAssessments;
}

interface IHoldingAndTaxService_IRecordDemandsOnExistingAssessments extends grpc.MethodDefinition<holding_and_tax_pb.DemandsOnExistingAssessments, holding_and_tax_pb.GeneralResponse> {
    path: "/holding_and_tax.HoldingAndTax/RecordDemandsOnExistingAssessments";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<holding_and_tax_pb.DemandsOnExistingAssessments>;
    requestDeserialize: grpc.deserialize<holding_and_tax_pb.DemandsOnExistingAssessments>;
    responseSerialize: grpc.serialize<holding_and_tax_pb.GeneralResponse>;
    responseDeserialize: grpc.deserialize<holding_and_tax_pb.GeneralResponse>;
}

export const HoldingAndTaxService: IHoldingAndTaxService;

export interface IHoldingAndTaxServer extends grpc.UntypedServiceImplementation {
    recordDemandsOnExistingAssessments: grpc.handleUnaryCall<holding_and_tax_pb.DemandsOnExistingAssessments, holding_and_tax_pb.GeneralResponse>;
}

export interface IHoldingAndTaxClient {
    recordDemandsOnExistingAssessments(request: holding_and_tax_pb.DemandsOnExistingAssessments, callback: (error: grpc.ServiceError | null, response: holding_and_tax_pb.GeneralResponse) => void): grpc.ClientUnaryCall;
    recordDemandsOnExistingAssessments(request: holding_and_tax_pb.DemandsOnExistingAssessments, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: holding_and_tax_pb.GeneralResponse) => void): grpc.ClientUnaryCall;
    recordDemandsOnExistingAssessments(request: holding_and_tax_pb.DemandsOnExistingAssessments, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: holding_and_tax_pb.GeneralResponse) => void): grpc.ClientUnaryCall;
}

export class HoldingAndTaxClient extends grpc.Client implements IHoldingAndTaxClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
    public recordDemandsOnExistingAssessments(request: holding_and_tax_pb.DemandsOnExistingAssessments, callback: (error: grpc.ServiceError | null, response: holding_and_tax_pb.GeneralResponse) => void): grpc.ClientUnaryCall;
    public recordDemandsOnExistingAssessments(request: holding_and_tax_pb.DemandsOnExistingAssessments, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: holding_and_tax_pb.GeneralResponse) => void): grpc.ClientUnaryCall;
    public recordDemandsOnExistingAssessments(request: holding_and_tax_pb.DemandsOnExistingAssessments, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: holding_and_tax_pb.GeneralResponse) => void): grpc.ClientUnaryCall;
}
