import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class {{BankDao}} {
  get = async () => {
    const query: Prisma.{{banks}}FindManyArgs = {
      select: {
        id: true,
        name: true,
      },
    };
    const data = prisma.{{banks}}.findMany(query);
    return generateRes(data);
  };
}

export default {{BankDao}};
