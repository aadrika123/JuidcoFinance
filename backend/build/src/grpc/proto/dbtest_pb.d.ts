// package: dbtest
// file: dbtest.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";

export class BanksRequest extends jspb.Message { 

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): BanksRequest.AsObject;
    static toObject(includeInstance: boolean, msg: BanksRequest): BanksRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: BanksRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): BanksRequest;
    static deserializeBinaryFromReader(message: BanksRequest, reader: jspb.BinaryReader): BanksRequest;
}

export namespace BanksRequest {
    export type AsObject = {
    }
}

export class BankRequest extends jspb.Message { 
    getId(): number;
    setId(value: number): BankRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): BankRequest.AsObject;
    static toObject(includeInstance: boolean, msg: BankRequest): BankRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: BankRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): BankRequest;
    static deserializeBinaryFromReader(message: BankRequest, reader: jspb.BinaryReader): BankRequest;
}

export namespace BankRequest {
    export type AsObject = {
        id: number,
    }
}

export class Bank extends jspb.Message { 
    getId(): number;
    setId(value: number): Bank;
    getName(): string;
    setName(value: string): Bank;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Bank.AsObject;
    static toObject(includeInstance: boolean, msg: Bank): Bank.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Bank, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Bank;
    static deserializeBinaryFromReader(message: Bank, reader: jspb.BinaryReader): Bank;
}

export namespace Bank {
    export type AsObject = {
        id: number,
        name: string,
    }
}
