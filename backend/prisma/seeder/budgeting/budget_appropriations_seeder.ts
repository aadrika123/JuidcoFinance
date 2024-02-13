import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";
const prisma = new PrismaClient();
const budget_appropriations_seeder = async () => {
    const number_of_records = 10;
    for (let i = 0; i < number_of_records; i++) {
        const record = {
            fin_year_id: 1,
            primary_acc_code_id: 1,
            remark: faker.lorem.sentence(),
            from_primary_acc_code_id: 1,
            approved_amount: faker.datatype.number(),
            transfer_amount: faker.datatype.number(),
            created_at: faker.date.past(),
            updated_at: faker.date.recent(),
        };
        await prisma.budget_appropriations.create({ data: record });
    }
};
export default budget_appropriations_seeder;