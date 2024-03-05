import { Prisma, PrismaClient, municipality_codes } from "@prisma/client";
import { generateRes } from "../../../../util/generateRes";
import { Request } from "express";

const prisma = new PrismaClient();

// -> Belongs to Chart of Accounts
class MuncipalityCodeDao {
  // Get All muncipilaty code
  get = async (req: Request) => {
    const search: string =
      req.query.search == undefined ? "" : String(req.query.search);

    const pattern1: string = `${search}%`;
    const pattern2: string = `%${search}%`;

    const data = await prisma.$queryRaw<municipality_codes[]>`
     select
     id,
     ulbs,
     district,
     state_code,
     district_code,
     category,
     code
     from
     municipality_codes
     where CONCAT(state_code, district_code, category, code) LIKE ${pattern1} or ulbs LIKE ${pattern2} or district LIKE ${pattern2}
     `;

    return generateRes(data);
  };

  get_all = async () => {
    const query: Prisma.municipality_codesFindManyArgs = {
      select: {
        id: true,
        ulbs: true,
      },
    };
    const data = prisma.municipality_codes.findMany(query);
    return generateRes(data);
  };
}

export default MuncipalityCodeDao;
