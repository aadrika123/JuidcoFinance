import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";
const prisma = new PrismaClient();
const revised_budgets_seeder = async () => {
    const number_of_records = 10;
    for (let i = 0; i < number_of_records; i++) {
        const record = {
            primary_acc_code_id: 1,
            approved_amount: faker.number.float(),
            revised_amount: faker.number.float(),
            remarks: faker.lorem.sentence(),
            created_at: faker.date.past(),
            updated_at: faker.date.recent(),
        };
        await prisma.revised_budgets.create({ data: record });
    }
};
export default revised_budgets_seeder;