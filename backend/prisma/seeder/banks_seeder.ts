import { PrismaClient, banks } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

const banks_seeder = async () => {
  ///////////////// Receipt Types ////////////////////////
  



  const records : banks[]  = [];

  const names = ["ICICI", "SBI", "BANK OF BARODA"];
  
  for(let i=0;i<names.length;i++){
    await prisma.banks.create({data: {
      name: names[i],
      remark: faker.lorem.sentence(),
      created_at: faker.date.past(),
      updated_at: faker.date.recent()
    }});
  }

};

export default banks_seeder;