import { Prisma, PrismaClient, account_codes } from "@prisma/client";
import { generateRes } from "../../../../util/generateRes";

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
    
    const data = await prisma.$queryRaw<account_codes[]>`SELECT id, code, description FROM account_codes where parent_id != 0 order by description asc`;
    if (!data){
      return generateRes(null);
    }

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

  getParentCode = async (id: number) => {
    const acc = await prisma.$queryRaw<account_codes[]>`SELECT * FROM account_codes where id=${id}`;
    if (!acc){
      return generateRes(null);
    }

    const parent_id = acc[0].parent_id;

    const data = await prisma.$queryRaw<account_codes[]>`SELECT code, description FROM account_codes where id=${parent_id}`;
    

    return generateRes(data);
  }


  getCodesWithParentDetail = async () => {
    const data = await prisma.$queryRaw<account_codes[]>`select a.id, a.code, a.description, b.description as parent_name 
    from account_codes a 
    left join account_codes b on a.parent_id = b.id where a.parent_id != 0 
    union
    SELECT id, code, description, '' as parent_name FROM account_codes where parent_id=0`;

    return generateRes(data);
  }


}

export default AccountingCodeDao;
