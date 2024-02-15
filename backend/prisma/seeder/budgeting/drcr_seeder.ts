import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";
const prisma = new PrismaClient();
const drcr_seeder = async () => {
    await prisma.drcr.create({ data: {
        name: 'DR'
    }});

    await prisma.drcr.create({ data: {
        name: 'CR'
    }});
};
export default drcr_seeder;