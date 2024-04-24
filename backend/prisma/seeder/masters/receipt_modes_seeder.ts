import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";
const prisma = new PrismaClient();
const receipt_modes_seeder = async () => {
  const data = [
    'cash',
    'cheque',
    'online'
  ]

  for (let i = 0; i < data.length; i++) {
    const record = {
      name: data[i],
      created_at: faker.date.past(),
      updated_at: faker.date.recent(),
    };
    await prisma.receipt_modes.create({ data: record });
  }
};
export default receipt_modes_seeder;
