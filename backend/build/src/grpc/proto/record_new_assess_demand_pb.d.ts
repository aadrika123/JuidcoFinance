// package: record_new_assess_demand
// file: record_new_assess_demand.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";

export class GeneralResponse extends jspb.Message { 
    getCode(): number;
    setCode(value: number): GeneralResponse;
    getMessage(): string;
    setMessage(value: string): GeneralResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GeneralResponse.AsObject;
    static toObject(includeInstance: boolean, msg: GeneralResponse): GeneralResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GeneralResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GeneralResponse;
    static deserializeBinaryFromReader(message: GeneralResponse, reader: jspb.BinaryReader): GeneralResponse;
}

export namespace GeneralResponse {
    export type AsObject = {
        code: number,
        message: string,
    }
}

export class NewAssesDemandDetails extends jspb.Message { 
    getUlb(): string;
    setUlb(value: string): NewAssesDemandDetails;
    getBillNo(): string;
    setBillNo(value: string): NewAssesDemandDetails;
    getDateOfBillRaised(): string;
    setDateOfBillRaised(value: string): NewAssesDemandDetails;
    getOldWardNo(): string;
    setOldWardNo(value: string): NewAssesDemandDetails;
    getNewWardNo(): string;
    setNewWardNo(value: string): NewAssesDemandDetails;
    getDepartmentSection(): string;
    setDepartmentSection(value: string): NewAssesDemandDetails;

    hasPropertyDetails(): boolean;
    clearPropertyDetails(): void;
    getPropertyDetails(): PropertyDetails | undefined;
    setPropertyDetails(value?: PropertyDetails): NewAssesDemandDetails;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): NewAssesDemandDetails.AsObject;
    static toObject(includeInstance: boolean, msg: NewAssesDemandDetails): NewAssesDemandDetails.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: NewAssesDemandDetails, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): NewAssesDemandDetails;
    static deserializeBinaryFromReader(message: NewAssesDemandDetails, reader: jspb.BinaryReader): NewAssesDemandDetails;
}

export namespace NewAssesDemandDetails {
    export type AsObject = {
        ulb: string,
        billNo: string,
        dateOfBillRaised: string,
        oldWardNo: string,
        newWardNo: string,
        departmentSection: string,
        propertyDetails?: PropertyDetails.AsObject,
    }
}

export class PropertyDetails extends jspb.Message { 
    getAssessmentCode(): string;
    setAssessmentCode(value: string): PropertyDetails;

    hasAccountingEntries(): boolean;
    clearAccountingEntries(): void;
    getAccountingEntries(): AccountingEntry | undefined;
    setAccountingEntries(value?: AccountingEntry): PropertyDetails;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): PropertyDetails.AsObject;
    static toObject(includeInstance: boolean, msg: PropertyDetails): PropertyDetails.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: PropertyDetails, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): PropertyDetails;
    static deserializeBinaryFromReader(message: PropertyDetails, reader: jspb.BinaryReader): PropertyDetails;
}

export namespace PropertyDetails {
    export type AsObject = {
        assessmentCode: string,
        accountingEntries?: AccountingEntry.AsObject,
    }
}

export class AccountingEntry extends jspb.Message { 
    getDescription(): string;
    setDescription(value: string): AccountingEntry;
    getDebitAmount(): number;
    setDebitAmount(value: number): AccountingEntry;
    getCreditAmount(): number;
    setCreditAmount(value: number): AccountingEntry;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): AccountingEntry.AsObject;
    static toObject(includeInstance: boolean, msg: AccountingEntry): AccountingEntry.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: AccountingEntry, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): AccountingEntry;
    static deserializeBinaryFromReader(message: AccountingEntry, reader: jspb.BinaryReader): AccountingEntry;
}

export namespace AccountingEntry {
    export type AsObject = {
        description: string,
        debitAmount: number,
        creditAmount: number,
    }
}
