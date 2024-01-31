import { faker } from "@faker-js/faker";
import { PrismaClient, bill_types } from "@prisma/client";

const prisma = new PrismaClient();

const bill_type_seed = async() => {
    function createRandomBillType(): bill_types {
        return {
          id: faker.datatype.number(),
          type: faker.company.name(),
          remark: faker.lorem.sentence(),
          created_at: faker.date.recent(),
          updated_at: faker.date.recent(),
        };
      }
    
      const billTypes = faker.helpers.multiple(createRandomBillType, {
        count: 5,
      });
    
      let ib = 1;
      for (const item of billTypes) {
        await prisma.bill_types.create({
          data: {
            id: ib, //item.id,
            type: item.type,
            remark: item.remark,
            created_at: item.created_at,
            updated_at: item.updated_at,
          },
        });
        ib++;
      }
}

export default bill_type_seed;