import { PrismaClient, account_codes } from "@prisma/client";
import { faker } from "@faker-js/faker";
const prisma = new PrismaClient();
const balance_trackings_seeder = async () => {

    const acc_codes = await prisma.$queryRaw<account_codes[]>`SELECT * FROM account_codes`;
    if (!acc_codes){
      return;
    }

    for (let i = 0; i < acc_codes.length; i++) {
        const record = {
            primary_acc_code_id: acc_codes[i].id,
            balance_amount: faker.datatype.number(),
            created_at: faker.date.past(),
            updated_at: faker.date.recent(),
        };
        await prisma.balance_trackings.create({ data: record });
    }
};
export default balance_trackings_seeder;