import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";
const prisma = new PrismaClient();
const investment_types_seeder = async () => {
    const number_of_records = 10;
    for (let i = 0; i < number_of_records; i++) {
        const record = {
            name: faker.lorem.word(),
            remarks: faker.lorem.sentence(),
            created_at: faker.date.past(),
            updated_at: faker.date.recent(),
        };
        await prisma.investment_types.create({ data: record });
    }
};
export default investment_types_seeder;