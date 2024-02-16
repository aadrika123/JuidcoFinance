import { Prisma, PrismaClient, account_codes } from "@prisma/client";
import { generateRes } from "../../../../util/generateRes";
import { Request } from "express";

const prisma = new PrismaClient();

// -> Belongs to Chart of Accounts
class AccountingCodeDao {
  // Get limitted accounting codes
  get = async (page: number, limit: number) => {
    const query: Prisma.account_codesFindManyArgs = {
      skip: (page - 1) * limit,
      take: limit,
      select: {
        id: true,
        code: true,
        major_head: true,
        minor_head: true,
        detail_code: true,
        description: true,
      },
    };
    const [data, count] = await prisma.$transaction([
      prisma.account_codes.findMany(query),
      prisma.account_codes.count(),
    ]);

    return generateRes(data, count, page, limit );
  };


  get_all = async () => {
    const query: Prisma.account_codesFindManyArgs = {
      select: {
        id: true,
        code: true,
        description: true,
      },
    };
    const data = prisma.account_codes.findMany(query);
    return generateRes(data);
  };


  getMainCodes = async () => {
    const query: Prisma.account_codesFindManyArgs = {
      select: {
        id: true,
        code: true,
        description: true,
      },
    };

    query.where = {
      parent_id:{
        equals: 0,
      }
    }

    const data = prisma.account_codes.findMany(query);
    return generateRes(data);
  }

  getSubCodes = async () => {
    const query: Prisma.account_codesFindManyArgs = {
      select: {
        id: true,
        code: true,
        description: true,
      },
    };

    query.where = {
      parent_id:{
        not: 0,
      }
    }

    const data = prisma.account_codes.findMany(query);
    return generateRes(data);
  }


  getChildCodes = async (id: number) => {
    const acc = await prisma.$queryRaw<account_codes[]>`SELECT * FROM account_codes where id=${id}`;
    if (!acc){
      return generateRes(null);
    }

    const code = acc[0].code;

    const prefix = code.substring(0, code.length-2);

    const query: Prisma.account_codesFindManyArgs = {
      select: {
        id: true,
        code: true,
        description: true,
      },
    };

    query.where = {
      parent_id: {
        equals: id,
      }
    }

    const data = prisma.account_codes.findMany(query);

    return generateRes(data);
  }

}

export default AccountingCodeDao;
