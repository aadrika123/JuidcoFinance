import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";
const prisma = new PrismaClient();
const investments_seeder = async () => {
    const number_of_records = 10;
    for (let i = 0; i < number_of_records; i++) {
        const record = {
            ulb_id: 1,
            primary_acc_code_id: 1,
            investment_no: faker.random.alphaNumeric(10).toUpperCase(),
            authorization_date: faker.date.past(),
            investment_date: faker.date.past(),
            particulars: faker.lorem.sentence(),
            investment_type_id: 1,
            purchase_amount: faker.datatype.number(),
            face_value_amount: faker.datatype.number(),
            interest_due_date: faker.date.past(),
            interest_due_amount: faker.datatype.number(),
            employee_id: 1,
            interest_recovered_amount: faker.datatype.number(),
            interest_recovery_date: faker.date.past(),
            acc_adj_recovery_date: faker.date.past(),
            realization_final_amount: faker.datatype.number(),
            realization_date: faker.date.past(),
            acc_adj_realization_date: faker.date.past(),
            remarks: faker.lorem.sentence(),
            created_at: faker.date.past(),
            updated_at: faker.date.recent(),
        };
        await prisma.investments.create({ data: record });
    }
};
export default investments_seeder;