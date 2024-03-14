import {
    ServerUnaryCall,
    sendUnaryData,
    ServerWritableStream,
  } from "@grpc/grpc-js";

import { PrismaClient, Prisma } from "@prisma/client";

import { IDatabaseTesterServer } from "../proto/dbtest_grpc_pb";
import { Bank, BankRequest, BanksRequest } from "../proto/dbtest_pb";
  


export const DatabaseTestServer: IDatabaseTesterServer = {
  getBanksStreamed: async function (): Promise<void> {
    
  },
  getBank: async function (call: ServerUnaryCall<BankRequest, Bank>, callback: sendUnaryData<Bank>): Promise<void> {
    const prisma = new PrismaClient();

    const id = call.request.getId();

    const query: Prisma.banksFindManyArgs = {
      where: {
        id: id,
      },
      select: {
        id: true,
        name: true,
      },
    };
    const bank: any = await prisma.banks.findFirst(query);

      const b = new Bank();

      // console.log(bank);

      if(bank != null){
        b.setId(bank['id' as keyof typeof bank]);
        b.setName(bank['name' as keyof typeof bank]);  
      }

      callback(null, b);
  },
  getBanks: async function (call: ServerWritableStream<BanksRequest, Bank>): Promise<void> {
    const prisma = new PrismaClient();

    const query: Prisma.banksFindManyArgs = {
      select: {
        id: true,
        name: true,
      },
    };
    const banks = await prisma.banks.findMany(query);

    for (let i = 0; i < banks.length; i++) {
      const b = new Bank();
      b.setId(banks[i].id);
      b.setName(banks[i].name);
      call.write(b);
    }
    call.end();
  }
}