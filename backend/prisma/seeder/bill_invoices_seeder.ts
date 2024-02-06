import { PrismaClient, bill_invoices  } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

const bill_invoices_seeder = async () => {
  ///////////////// Bill invoices ////////////////////////

  const bill_types = [1,2,3];
  const vendor_ids = [1,2,3];
  const department_id = [1,2,3,4];
  const bill_stages = [1,2,3];
  const admin_wards = [1,2,3];


  const random_one = (items: Array<number>) => {
    return items[Math.floor(Math.random()*items.length)];
  }


  const number_of_receipts = 10;
  for(let i=0;i<number_of_receipts; i++){
    const record: bill_invoices ={
      id: i+1,
      bill_number: faker.number.float(),
      type_id: random_one(bill_types),
      vendor_id: random_one(vendor_ids),
      department_id: random_one(department_id),
      bill_date: faker.date.past(),
      stage_id: random_one(bill_stages),
      entry_date: faker.date.recent(),
      narration: faker.lorem.sentence(),
      address: faker.lorem.sentence(),
      admin_ward_id: random_one(admin_wards),
      amount: faker.number.float(),


      created_at: faker.date.past(),
      updated_at: faker.date.recent(),
    };

    // console.log(record);
    await prisma.bill_invoices.create({data: record});
  }


  
};

export default bill_invoices_seeder;