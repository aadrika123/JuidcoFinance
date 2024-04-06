import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";
const prisma = new PrismaClient();
const revenue_accounted_types_seeder = async () => {
  const data = [
    "Cash Basis",
    "Accural Basis"
  ]
  for (let i = 0; i < data.length; i++) {
    const record = {
      name: data[i],
      created_at: faker.date.past(),
      updated_at: faker.date.recent(),
    };
    await prisma.revenue_accounted_types.create({ data: record });
  }
};
export default revenue_accounted_types_seeder;
