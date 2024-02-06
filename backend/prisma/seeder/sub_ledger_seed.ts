import { faker } from "@faker-js/faker";
import { PrismaClient, sub_ledger } from "@prisma/client";

const prisma = new PrismaClient();

const sub_ledger_seed = async() => {
    function createRandomSubLedger(): sub_ledger {
        return {
          id: faker.datatype.number(),
          name: faker.company.name(),
          remark: faker.lorem.sentence(),
          created_at: faker.date.recent(),
          updated_at: faker.date.recent(),
        };
      }
    
      const subLedger = faker.helpers.multiple(createRandomSubLedger, {
        count: 5,
      });
    
      let id = 1;
      for (const item of subLedger) {
        await prisma.sub_ledger.create({
          data: {
            id: id, //item.id,
            name: item.name,
            remark: item.remark,
            created_at: item.created_at,
            updated_at: item.updated_at,
          },
        });
        id++;
      }
}

export default sub_ledger_seed;