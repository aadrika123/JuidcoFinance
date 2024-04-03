import { Prisma, PrismaClient, account_codes } from "@prisma/client";
import { generateRes } from "../../../util/generateRes";
import { Request } from "express";

const prisma = new PrismaClient();

// -> Belongs to Chart of Accounts
class AccountingCodeDao {
  // Get All accounting codes
  get = async (req: Request) => {
    const search: string = String(req.query.search);
    const query: Prisma.account_codesFindManyArgs = {
      select: {
        id: true,
        code: true,
        major_head: true,
        minor_head: true,
        detail_code: true,
        description: true,
      },
    };

    if (search !== "undefined" && search !== "") {
      query.where = {
        OR: [
          {
            code: {
              startsWith: search,
            },
          },
          {
            description: {
              contains: search,
            },
          },
        ],
      };
    }
    const data = prisma.account_codes.findMany(query);

    return generateRes(data);
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
      parent_id: {
        equals: 0,
      },
    };

    const data = prisma.account_codes.findMany(query);
    return generateRes(data);
  };

  getSubCodes = async () => {
    const data = await prisma.$queryRaw<
      account_codes[]
    >`SELECT id, code, description FROM account_codes where parent_id != 0 order by description asc`;
    if (!data) {
      return generateRes(null);
    }

    return generateRes(data);
  };

  getChildCodes = async (id: number) => {
    const acc = await prisma.$queryRaw<
      account_codes[]
    >`SELECT * FROM account_codes where id=${id}`;
    if (!acc) {
      return generateRes(null);
    }

    // const code = acc[0].code;

    // const prefix = code.substring(0, code.length - 2);

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
      },
    };

    const data = prisma.account_codes.findMany(query);

    return generateRes(data);
  };

  getParentCode = async (id: number) => {
    const acc = await prisma.$queryRaw<
      account_codes[]
    >`SELECT * FROM account_codes where id=${id}`;
    if (!acc) {
      return generateRes(null);
    }

    const parent_id = acc[0].parent_id;

    const data = await prisma.$queryRaw<
      account_codes[]
    >`SELECT code, description FROM account_codes where id=${parent_id}`;

    return generateRes(data);
  };

  getCodesWithParentDetail = async () => {
    const data = await prisma.$queryRaw<
      account_codes[]
    >`select a.id, a.code, a.description, b.description as parent_name 
    from account_codes a 
    left join account_codes b on a.parent_id = b.id where a.parent_id != 0 
    union
    SELECT id, code, description, '' as parent_name FROM account_codes where parent_id=0`;

    return generateRes(data);
  };

  /**
   * | Author- Sanjiv Kumar
   * | Created On- 05-03-2024
   * | Created for- Requesting New Accounting Code
   */

  requestNewCode = async (reqDetails: any) =>{
    const data = await prisma.request_account_codes.create({
      data: reqDetails
    })

    return generateRes(data);
  }
}

export default AccountingCodeDao;
