import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";
const prisma = new PrismaClient();
const budget_reappropriations_seeder = async () => {
    const number_of_records = 10;
    for (let i = 0; i < number_of_records; i++) {
        const record = {
            fin_year_id: 1,
            primary_acc_code_id: 1,
            transaction_date: faker.date.past(),
            budget_name_id: 1,
            actual_amount: faker.datatype.number(),
            from_primary_acc_code_id: 1,
            approved_amount: faker.datatype.number(),
            balance_amount: faker.datatype.number(),
            transfer_amount: faker.datatype.number(),
            remark: faker.lorem.sentence(),
            created_at: faker.date.past(),
            updated_at: faker.date.recent(),
        };
        await prisma.budget_reappropriations.create({ data: record });
    }
};
export default budget_reappropriations_seeder;