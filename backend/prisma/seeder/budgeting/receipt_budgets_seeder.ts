import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";
const prisma = new PrismaClient();
const receipt_budgets_seeder = async () => {
    const number_of_records = 10;
    for (let i = 0; i < number_of_records; i++) {
        const record = {
            fin_year_id: 1,
            primary_acc_code_id: 1,
            amount: faker.number.int(),
            created_at: faker.date.past(),
            updated_at: faker.date.recent(),
        };
        await prisma.receipt_budgets.create({ data: record });
    }
};
export default receipt_budgets_seeder;