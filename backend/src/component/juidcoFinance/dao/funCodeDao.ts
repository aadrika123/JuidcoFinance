"use strict";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class FunCodeDao {
  constructor() {
    //////
  }

  // Get limited function codes
  get = async () => {
    try {
      return await prisma.function_code.findMany({
        skip: 1,
        take: 10,
        where: {
          group: {
            contains: "10",
          },
        },
      });
    } catch (error: any) {
      throw error;
    }
  };
}

export default FunCodeDao;
