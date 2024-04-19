import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";
import readXlsxFile from "read-excel-file/node";

const prisma = new PrismaClient();
const revenue_accounted_type_maps_seeder = async () => {
  const file_path = "./prisma/data/new_revenue_accounted_type (1).xlsx";

  readXlsxFile(file_path, { sheet: "Sheet2" }).then(async (rows) => {
    const rowLength = rows.length;
    console.log("seeding revenue accounted types maps");

    for (let i = 1; i < rowLength; i++) {
      const row = rows[i];

      const code_id = await prisma.account_codes.findFirst({
        where: {
          code: String(row[0]),
        },
        select: {
          id: true,
        },
      });
      const revenue_id = await prisma.revenue_modules.findFirst({
        where: {
          name: String(row[1]),
        },
        select: {
          id: true,
        },
      });

      const rct = await prisma.revenue_accounted_types.findFirst({
        where: {
          name: String(row[2]),
        },
        select: {
          id: true,
        },
      });

      if (code_id?.id && revenue_id?.id && rct?.id) {
        const record = {
          primary_acc_code_id: code_id.id,
          revenue_module_id: revenue_id.id,
          revenue_accounted_type_id: rct.id,
          created_at: faker.date.past(),
          updated_at: faker.date.recent(),
        };

        await prisma.revenue_accounted_type_maps.create({ data: record });
      }
    }
  });
};
export default revenue_accounted_type_maps_seeder;
