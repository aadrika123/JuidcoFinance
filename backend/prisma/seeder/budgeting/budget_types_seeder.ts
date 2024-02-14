import { PrismaClient } from "@prisma/client";
import readXlsxFile from "read-excel-file/node";


const prisma = new PrismaClient();
const budget_types_seeder = async () => {

    const file_path = "./prisma/data/sprint2/receipt_budgets.xlsx";

    readXlsxFile(file_path, { sheet: 'Budget Type' }).then(async (rows) => {
        const n = rows.length;
        for (let i = 1; i < n; i++) {
          const row = rows[i];

          await prisma.budget_types.create({
            data: {
                name: row[0].toString(),
                remarks: row[0].toString(),
            },
          });
        }
      });

};
export default budget_types_seeder;