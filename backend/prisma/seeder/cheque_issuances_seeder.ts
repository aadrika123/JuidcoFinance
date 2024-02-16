import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";
import { v4 as uuidv4 } from "uuid";

const generateUniqueNo = (initialString?: string): string => {
  const uniqueId = uuidv4();

  // Extract the first 8 characters from the UUID
  const unqId = uniqueId.substring(0, 6);

  return initialString ? initialString + unqId : unqId;
};


const prisma = new PrismaClient();

  
const cheque_issuances_seeder = async () => {
    const number_of_records = 10;
    for (let i = 0; i < number_of_records; i++) {
        const record = {
            voucher_no:  generateUniqueNo("VN"),
            voucher_date: faker.date.past(),
            bill_type_id: 1,
            narration: faker.lorem.sentence(),
            admin_ward_id: 1,
            payee_id: 1,
            grant_id: 1,
            bank_id: 1,
            module_id: 1,
            department_id: 1,
            issue_date: faker.date.past(),
            cheque_no: faker.random.alphaNumeric(12).toUpperCase(),
            amount: faker.datatype.number(),
            created_at: faker.date.past(),
            updated_at: faker.date.recent(),
        };
        await prisma.cheque_issuances.create({ data: record });
    }
};
export default cheque_issuances_seeder;