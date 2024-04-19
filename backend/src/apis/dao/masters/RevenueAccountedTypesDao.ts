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
    const { rmId, accId } = req.params;
    const query: Prisma.revenue_accounted_type_mapsFindManyArgs = {
      where: {
        revenue_module_id: Number(rmId),
        primary_acc_code_id: Number(accId),
      },
      select: {
        revenue_accounted_type: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    };
    const data: any = await prisma.revenue_accounted_type_maps.findFirst(query);

    const updatedData = { ...data.revenue_accounted_type };
    return generateRes(updatedData);
  };
}

export default RevenueAccountedTypesDao;
