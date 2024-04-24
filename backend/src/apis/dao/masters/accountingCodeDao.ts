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

  requestNewCode = async (reqDetails: any) => {
    const data = await prisma.request_account_codes.create({
      data: reqDetails,
    });

    return generateRes(data);
  };

  getLedgerCodes = async () => {
    const data = await prisma.$queryRaw<
      account_codes[]
    >`SELECT id, code, description FROM account_codes where code_type_id = 3`;
    if (!data) {
      return generateRes(null);
    }

    return generateRes(data);
  };

  getLedgerCodesForBankEntry = async () => {

    const codeList: number[] = [
      1100101, 1100102,
1100103,
1100104,
1100105,
1100106,
1100107,
1101101,
1101102,
1101103,
1101104,
1101105,
1101106,
1101107,
1101108,
1109001,
1109002,
1109003,
1109004,
1109005,
1109006,
1109007,
1109008,
1109009,
1109010,
1109011,
1109012,
1109080,
1301000,
1301001,
1301002,
1301003,
1301004,
1301005,
1301006,
1301007,
1302001,
1303001,
1304001,
1308001,
1309000,
1309001,
1309002,
1309003,
1309004,
1309005,
1401000,
1401001,
1401008,
1401101,
1401102,
1401103,
1401104,
1401105,
1401106,
1401107,
1401108,
1401109,
1401110,
1401111,
1401112,
1401113,
1401114,
1401116,
1401302,
1404006,
1405005,
1405007,
1405015,
1405016,
1801003,
1801104,
1404010,
1404011,
1404012,
    ];

    const data = await prisma.$queryRaw<
      account_codes[]
    >`SELECT id, code, description FROM account_codes where code::int in (${Prisma.join(codeList)})`;
    if (!data) {
      return generateRes(null);
    }

    return generateRes(data);
  };
}

export default AccountingCodeDao;
