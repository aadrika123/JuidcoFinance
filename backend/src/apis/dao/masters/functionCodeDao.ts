import { Prisma, PrismaClient, function_codes } from "@prisma/client";
import { generateRes } from "../../../util/generateRes";
import { Request } from "express";

const prisma = new PrismaClient();

// -> Belongs to Chart of Accounts
class FunctionCodeDao {
  get = async (page: number, limit: number) => {
    const query: Prisma.function_codesFindManyArgs = {
      skip: (page - 1) * limit,
      take: limit,
      select: {
        id: true,
        group: true,
        description_code: true,
        cost_center: true,
        description: true,
      },
    };
    const [data, count] = await prisma.$transaction([
      prisma.function_codes.findMany(query),
      prisma.function_codes.count(),
    ]);

    return generateRes(data, count, page, limit);
  };

  getAll = async (req: Request) => {
    const search: string = req.query.search == undefined ? "" : String(req.query.search);

    const c = `${search}%`;
    const cc = `%${search}%`;

    const data = await prisma.$queryRaw<function_codes[]>`
    select 
    id,
    "group",
    description_code,
    cost_center,
    description
    from
    function_codes
    where
    CONCAT("group", description_code, cost_center) LIKE ${c} or description LIKE ${cc}
    `;

    return generateRes(data);
  };
}

export default FunctionCodeDao;
