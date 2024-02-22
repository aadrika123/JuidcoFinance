import { PrismaClient  } from "@prisma/client";
import { faker } from "@faker-js/faker";
const prisma = new PrismaClient();
const drcr_seeder = async () => {
const number_of_records = 10;
for(let i=0;i<number_of_records; i++){
const record ={
name: faker.lorem.word(),
created_at: faker.date.past(),
updated_at: faker.date.recent(),
};
await prisma.drcr.create({data: record});
}};
export default drcr_seeder;