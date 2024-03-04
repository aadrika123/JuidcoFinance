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
      name: "Project Management Consultant",
      udhd_id: 1,
    },
    {
      name: "Assistant Project Manager",
      udhd_id: 1,
    },
    {
      name: "Deputy Project Manager",
      udhd_id: 1,
    },
    {
      name: "Deputy General Manager",
      udhd_id: 1,
    },
    {
      name: "General Manager",
      udhd_id: 1,
    },
    {
      name: "Project Director Finance",
      udhd_id: 1,
    },
    {
      name: "Accountant",
      udhd_id: 1,
    },
    {
      name: "Manager",
      udhd_id: 1,
    },
    {
      name: "Payment Committee",
      udhd_id: 1,
    },
    {
      name: "Accounts Department – Accountant",
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
      name: "Executive Engineer",
      udhd_id: 3,
    },
    {
      name: "Executive Officer / AMC",
      udhd_id: 3,
    },
    {
      name: "Internal Auditor",
      udhd_id: 3,
    },
    {
      name: "Accounts Department – Project Director",
      udhd_id: 4,
    },
    {
      name: "Accounts Department – Manager",
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
