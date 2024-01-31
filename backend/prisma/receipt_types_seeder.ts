import { PrismaClient, receipt_types } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

const receipt_types_seeder = async () => {
  ///////////////// Receipt Types ////////////////////////
  



  const records : receipt_types[]  = [];

  const names = ['CASH', 'CHEQUE', "DD", "RTGS", "NEFT"];
  
  for(let i=0;i<names.length;i++){
    records.push({
      id: i,
      name: names[i],
      remark: faker.lorem.sentence(),
      created_at: faker.date.past(),
      updated_at: faker.date.recent()
    });
  }


  for (const item of records) {
    await prisma.receipt_types.create({
      data: {
        id: item.id,
        name: item.name,
        remark: item.remark,
        created_at: item.created_at,
        updated_at: item.updated_at,
      },
    });
  }
};

export default receipt_types_seeder;
