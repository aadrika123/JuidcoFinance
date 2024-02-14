import { PrismaClient } from "@prisma/client";
import readXlsxFile from "read-excel-file/node";
import { faker } from "@faker-js/faker";


const prisma = new PrismaClient();

const voucher_sub_type_seed = async () => {
    const n = 5;
    for (let i=0;i<n;i++) {
        await prisma.voucher_sub_types.create({
          data: {
            name: faker.company.name(),
            remark: faker.lorem.sentence(),
            created_at: faker.date.past(),
            updated_at: faker.date.recent(),
          },
        });
      }
}

export default voucher_sub_type_seed;

