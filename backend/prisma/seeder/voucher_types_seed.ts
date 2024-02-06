import { faker } from "@faker-js/faker";
import { PrismaClient, voucher_types } from "@prisma/client";

const prisma = new PrismaClient();

const voucher_types_seed = async() => {
    function createRandomVoucherType(): voucher_types {
        return {
          id: faker.datatype.number(),
          type: faker.company.name(),
          remark: faker.lorem.sentence(),
          created_at: faker.date.recent(),
          updated_at: faker.date.recent(),
        };
      }
    
      const voucherType = faker.helpers.multiple(createRandomVoucherType, {
        count: 5,
      });
    
      let id = 1;
      for (const item of voucherType) {
        await prisma.voucher_types.create({
          data: {
            id: id, //item.id,
            type: item.type,
            remark: item.remark,
            created_at: item.created_at,
            updated_at: item.updated_at,
          },
        });
        id++;
      }
}

export default voucher_types_seed;