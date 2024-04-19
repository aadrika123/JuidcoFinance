import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();
const revenue_accounted_types_seeder = async () => {
  const data: string[] = ["Accrual", "Cash"];

  console.log("Seeding revenue accounted types data")

  for (let i = 0; i < 2; i++) {
    const record = {
      name: String(data[i]),
      created_at: faker.date.past(),
      updated_at: faker.date.recent(),
    };

    await prisma.revenue_accounted_types.create({ data: record });
  }
};
export default revenue_accounted_types_seeder;
