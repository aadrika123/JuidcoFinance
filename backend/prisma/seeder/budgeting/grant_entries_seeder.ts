import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";
const prisma = new PrismaClient();
const grant_entries_seeder = async () => {
    const number_of_records = 10;
    for (let i = 0; i < number_of_records; i++) {
        const record = {
            ulb_id: 1,
            primary_acc_code_id: 1,
            grant_id: 1,
            sanction_number: faker.lorem.sentence(),
            grant_nature_id: 1,
            grant_from_date: faker.date.past(),
            grant_to_date: faker.date.past(),
            sanctioned_amount: faker.datatype.number(),
            advance_rcving_date: faker.date.past(),
            advance_amount: faker.datatype.number(),
            expenditure_date: faker.date.past(),
            voucher_id: 1,
            expndtre_nature_id: 1,
            blnce_trckng_id: 1,
            refund_date: faker.date.past(),
            refund_amount: faker.datatype.number(),
            user_id: 1,
            signature: faker.lorem.sentence(),
            created_at: faker.date.past(),
            updated_at: faker.date.recent(),
        };
        await prisma.grant_entries.create({ data: record });
    }
};
export default grant_entries_seeder;