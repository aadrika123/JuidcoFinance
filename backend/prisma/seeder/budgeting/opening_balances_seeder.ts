import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";
const prisma = new PrismaClient();
const opening_balances_seeder = async () => {
    const number_of_records = 10;
    for (let i = 0; i < number_of_records; i++) {
        const record = {
            fin_year_id: 1,
            dr_cr_id: 1,
            primary_acc_code_id: 1,
            amount: faker.datatype.number(),
            created_at: faker.date.past(),
            updated_at: faker.date.recent(),
        };
        await prisma.opening_balances.create({ data: record });
    }
};
export default opening_balances_seeder;