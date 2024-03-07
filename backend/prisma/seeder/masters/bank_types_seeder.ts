import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";
const prisma = new PrismaClient();
const bank_types_seeder = async () => {

    const items = [
        "4502100 - Nationalized Banks - Municipal Fund",
        "4502200 - Other Schedule Banks - Municipal Fund",
        "4502300 - Schedule Co-operative Banks - Municipal Fund"
    ];

    items.forEach(async (item, i) => {
        const record = {
            id: i+1,
            name: item,
            created_at: faker.date.past(),
            updated_at: faker.date.recent(),
        };
        await prisma.bank_types.create({ data: record });
    });

};
export default bank_types_seeder;