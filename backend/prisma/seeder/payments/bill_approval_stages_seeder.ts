import { PrismaClient, bill_approval_stages } from "@prisma/client";
import { faker } from "@faker-js/faker";
import { BillStages } from "jflib";

const prisma = new PrismaClient();

const bill_approval_stages_seeder = async () => {
  ///////////////// Receipt Types ////////////////////////

  const records: bill_approval_stages[] = [];

  function formatString(inputString: string) {
    return inputString.replace(/([A-Z])/g, ' $1').trim();
}

  Object.keys(BillStages).forEach((item) => {
    records.push({
      id: Number(BillStages[item as keyof typeof BillStages]),
      name: formatString(item)
    });
  });

  for (const item of records) {
    await prisma.bill_approval_stages.create({
      data: {
        id: item.id, 
        name: item.name
      },
    });
  }
};

export default bill_approval_stages_seeder;


















// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// const stages = [
//     {id: 1, name: "Level 1: Approved By Junior Engineer"},
//     {id: 2, name: "Level 2: Approved By Manager"},
// ];
// const bill_approval_stages_seeder = async () => {
//     console.log("Seeding bill approval stages.");

//     stages.forEach(async (stage) => {
//         await prisma.bill_approval_stages.create({data: stage});
//     });
// }

// export default bill_approval_stages_seeder;
