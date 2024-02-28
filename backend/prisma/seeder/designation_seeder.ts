import { PrismaClient } from "@prisma/client";
import readXlsxFile from "read-excel-file/node";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();
const designations_seeder = async () => {
  const file_path = "./prisma/data/sprint1/cheque_issuance.xlsx";

  const desigantions = [
    {
      name: "Project Manager",
      udhd_id: 1,
    },
    {
      name: "Deputy Project Manager",
      udhd_id: 1,
    },
    {
      name: "Designation 1",
      udhd_id: 2,
    },
    {
      name: "Designation 2",
      udhd_id: 2,
    },
    {
      name: "Junior Engineer",
      udhd_id: 3,
    },
    {
      name: "Assistant Engineer",
      udhd_id: 3,
    },
    {
      name: "Designation 1",
      udhd_id: 4,
    },
    {
      name: "Designation 2",
      udhd_id: 4,
    },
  ];

  // readXlsxFile(file_path, { sheet: 'Payee names' }).then(async (rows) => {
  //     const n = rows.length;
  //     for (let i = 1; i < n; i++) {
  //       const row = rows[i];

  //       await prisma.designations.create({
  //         data: {
  //             name: row[0].toString(),
  //             udhd_id: 1,
  //             created_at: faker.date.past(),
  //             updated_at: faker.date.recent(),
  //         },
  //       });
  //     }
  //   });

  ////////////////////////////

  desigantions.forEach(async (item) => {
    await prisma.designations.create({
      data: {
        name: item.name.toString(),
        udhd_id: item.udhd_id,
        created_at: faker.date.past(),
        updated_at: faker.date.recent(),
      },
    });
  });
};
export default designations_seeder;
