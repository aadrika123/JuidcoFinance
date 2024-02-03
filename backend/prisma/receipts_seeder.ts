import { PrismaClient, receipt_entries } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

const receipts_seeder = async () => {
  ///////////////// Receipts ////////////////////////

  const module_ids = [1,2,3,4,5];
  const receipt_type_ids = [1,2,3,4, 5];
  const admin_ward_ids = [1,2,3,4];
  const subledger_ids = [1,2,3];


  const random_one = (items: Array<number>) => {
    return items[Math.floor(Math.random()*items.length)];
  }


  const number_of_receipts = 10;
  for(let i=0;i<number_of_receipts; i++){
    const record: receipt_entries ={
      id: i+1,
      receipt_no: "R"+(i+1),
      date: faker.date.past(),
      paid_by: faker.company.name(),
      email: faker.internet.email(),
      mobile_no: faker.phone.number(),
      narration: faker.lorem.sentence(),
      amount: parseFloat(faker.commerce.price()),
      created_at: faker.date.past(),
      updated_at: faker.date.recent(),

      admin_ward_id: random_one(admin_ward_ids),
      receipt_type_id: random_one(receipt_type_ids),
      module_id: random_one(module_ids),
      subledger_id: random_one(subledger_ids),
    };

    console.log(record);
    await prisma.receipt_entries.create({data: record});
  }


  
};

export default receipts_seeder;
