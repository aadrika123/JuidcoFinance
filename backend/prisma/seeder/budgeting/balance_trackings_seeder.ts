import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";
const prisma = new PrismaClient();
const balance_trackings_seeder = async () => {
    const number_of_records = 10;
    for (let i = 0; i < number_of_records; i++) {
        const record = {
            primary_acc_code_id: 1,
            balance_amount: faker.datatype.number(),
            created_at: faker.date.past(),
            updated_at: faker.date.recent(),
        };
        await prisma.balance_trackings.create({ data: record });
    }
};
export default balance_trackings_seeder;