import { PrismaClient } from "@prisma/client";
import readXlsxFile from "read-excel-file/node";


const prisma = new PrismaClient();
const financial_years_seeder = async () => {

    const file_path = "./prisma/data/sprint2/receipt_budgets.xlsx";

    readXlsxFile(file_path, { sheet: 'Financial Year' }).then(async (rows) => {
        const n = rows.length;
        for (let i = 1; i < n; i++) {
          const row = rows[i];

          await prisma.financial_years.create({
            data: {
                name: row[0].toString(),
                remarks: row[0].toString(),
            },
          });
        }
      });

};
export default financial_years_seeder;