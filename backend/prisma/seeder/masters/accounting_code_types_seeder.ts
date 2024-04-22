import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();
const accounting_code_types_seeder = async () => {

    console.log("Seeding accounting code types ...");


    const items = [
        "schedule",
        "general_ledger",
        "ledger"
    ];

    items.forEach(async (item, i) => {
        const record = {
            id: i+1,
            name: item,
            created_at: faker.date.past(),
            updated_at: faker.date.recent(),
        };
        await prisma.accounting_code_types.create({ data: record });
    });

};
export default accounting_code_types_seeder;