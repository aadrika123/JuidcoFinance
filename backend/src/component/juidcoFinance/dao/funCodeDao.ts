"use strict";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class FunCodeDao {
  constructor() {
    //////
  }

  // Get limited function codes
  get = async () => {
      return await prisma.function_code.findMany({
        skip: 1,
        take: 10,
        where: {
          group: {
            contains: "10",
          },
        },
      });
  };
}

export default FunCodeDao;
