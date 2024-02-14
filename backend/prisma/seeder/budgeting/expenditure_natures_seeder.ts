import { PrismaClient } from "@prisma/client";
import readXlsxFile from "read-excel-file/node";


const prisma = new PrismaClient();
const expenditure_natures_seeder = async () => {

    const file_path = "./prisma/data/sprint2/grant_entries.xlsx";

    readXlsxFile(file_path, { sheet: 'Nature of expenditure' }).then(async (rows) => {
        const n = rows.length;
        for (let i = 1; i < n; i++) {
          const row = rows[i];

          await prisma.expenditure_natures.create({
            data: {
                name: row[0].toString(),
                remarks: row[0].toString(),
            },
          });
        }
      });
};
export default expenditure_natures_seeder;