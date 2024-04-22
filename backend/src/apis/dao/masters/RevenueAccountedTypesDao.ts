import { Prisma, PrismaClient } from "@prisma/client";
import { generateRes } from "../../../util/generateRes";
import { Request } from "express";

const prisma = new PrismaClient();

class RevenueAccountedTypesDao {
  get = async () => {
    const query: Prisma.revenue_accounted_typesFindManyArgs = {
      select: {
        id: true,
        name: true,
      },
    };
    const data = prisma.revenue_accounted_types.findMany(query);
    return generateRes(data);
  };

  ////////// Get Revenue Accounted Type On revenue_id and accounting id
  getByRevenueAndAccountingId = async (req: Request) => {
    const { accId } = req.params;
    const query: Prisma.revenue_accounted_type_mapsFindManyArgs = {
      where: {
        primary_acc_code_id: Number(accId),
      },
      select: {
        revenue_module:{
          select:{
            id: true,
            name: true
          }
        },
        revenue_accounted_type: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    };
    const data: any = await prisma.revenue_accounted_type_maps.findFirst(query);

    return generateRes(data);
  };
}

export default RevenueAccountedTypesDao;
