// package: holding_and_tax
// file: holding_and_tax.proto

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

export class PropertyDetails extends jspb.Message { 
    getAssessmentCode(): string;
    setAssessmentCode(value: string): PropertyDetails;
    clearAccountingEntriesList(): void;
    getAccountingEntriesList(): Array<AccountingEntry>;
    setAccountingEntriesList(value: Array<AccountingEntry>): PropertyDetails;
    addAccountingEntries(value?: AccountingEntry, index?: number): AccountingEntry;

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
        accountingEntriesList: Array<AccountingEntry.AsObject>,
    }
}

export class DemandsOnExistingAssessments extends jspb.Message { 
    getUlb(): string;
    setUlb(value: string): DemandsOnExistingAssessments;
    getBillNo(): string;
    setBillNo(value: string): DemandsOnExistingAssessments;
    getDateBillRaised(): string;
    setDateBillRaised(value: string): DemandsOnExistingAssessments;
    getOldWardNo(): string;
    setOldWardNo(value: string): DemandsOnExistingAssessments;
    getNewWardNo(): string;
    setNewWardNo(value: string): DemandsOnExistingAssessments;
    getDepartmentOrSection(): string;
    setDepartmentOrSection(value: string): DemandsOnExistingAssessments;

    hasPropertyDetails(): boolean;
    clearPropertyDetails(): void;
    getPropertyDetails(): PropertyDetails | undefined;
    setPropertyDetails(value?: PropertyDetails): DemandsOnExistingAssessments;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): DemandsOnExistingAssessments.AsObject;
    static toObject(includeInstance: boolean, msg: DemandsOnExistingAssessments): DemandsOnExistingAssessments.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: DemandsOnExistingAssessments, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): DemandsOnExistingAssessments;
    static deserializeBinaryFromReader(message: DemandsOnExistingAssessments, reader: jspb.BinaryReader): DemandsOnExistingAssessments;
}

export namespace DemandsOnExistingAssessments {
    export type AsObject = {
        ulb: string,
        billNo: string,
        dateBillRaised: string,
        oldWardNo: string,
        newWardNo: string,
        departmentOrSection: string,
        propertyDetails?: PropertyDetails.AsObject,
    }
}
