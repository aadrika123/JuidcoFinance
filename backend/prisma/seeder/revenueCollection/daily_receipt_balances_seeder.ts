import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";
const prisma = new PrismaClient();
const daily_receipt_balance_seeder = async () => {
//   const number_of_records = 20;
//   for (let i = 0; i < number_of_records; i++) {
    const record = {
      opening_balance: faker.number.int(),
      created_at: faker.date.past(),
      updated_at: faker.date.recent(),
    };
    await prisma.daily_receipt_balances.create({ data: record });
//   }
};
export default daily_receipt_balance_seeder;
