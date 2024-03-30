import { PrismaClient, municipality_codes } from "@prisma/client";
import { generateRes } from "../../../../util/generateRes";
import { Request } from "express";

const prisma = new PrismaClient();

// -> Belongs to Chart of Accounts
class MuncipalityCodeDao {
  // Get All muncipilaty code
  get = async () => {

    const data = await prisma.$queryRaw<municipality_codes[]>`
     select
     id,
     ulbs,
     district,
     state_code,
     district_code,
     category,
     code,
     CONCAT(state_code, district_code, category, code) as full_code
     from
     municipality_codes
     `;

    return generateRes(data);
  };

  get_all = async () => {
    const data = prisma.$queryRaw`select id, ulbs, ulbs as name from municipality_codes`;
    return generateRes(data);
  };
}

export default MuncipalityCodeDao;
