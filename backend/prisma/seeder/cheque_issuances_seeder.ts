import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";
const prisma = new PrismaClient();
const cheque_issuances_seeder = async () => {
    const number_of_records = 10;
    for (let i = 0; i < number_of_records; i++) {
        const record = {
            voucher_no: faker.datatype.number(),
            voucher_date: faker.date.past(),
            bill_type_id: 1,
            narration: faker.lorem.sentence(),
            admin_ward_id: 1,
            payee_id: 1,
            grant_id: 1,
            bank_id: 1,
            module_id: 1,
            department_id: 1,
            issue_date: faker.date.past(),
            cheque_no: faker.lorem.sentence(),
            amount: faker.datatype.number(),
            created_at: faker.date.past(),
            updated_at: faker.date.recent(),
        };
        await prisma.cheque_issuances.create({ data: record });
    }
};
export default cheque_issuances_seeder;