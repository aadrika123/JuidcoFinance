import { Prisma, PrismaClient } from "@prisma/client";
import readXlsxFile from "read-excel-file/node";
import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt"



const prisma = new PrismaClient();

interface DesignationDetail{
  id: number;
}

const getDesignationID = async (d: string) => {
  const data: DesignationDetail[] = await prisma.$queryRaw`select id from designations where name=${d}`;
  return data[0].id;
}

const pass = "1234";
const hashedPass = bcrypt.hashSync(pass, 10);
          

const designations = [1,2,3,4];
const randomDesignation = () => {
  return designations[Math.floor(Math.random()*designations.length)];
}
const employees_seeder = async () => {

    const fixedUsers = [
      {
        name: "Rakesh Kumar",
        designation: "Junior Engineer",
        email: "rakesh@gmail.com",
        user_id: "rakesh29",
      },
      {
        name: "Prince Kumar",
        designation: "Assistant Engineer",
        email: "prince@gmail.com",
        user_id: "prince29",
      },
      {
        name: "Krish Vishwakarma",
        designation: "Executive Engineer",
        email: "krish@gmail.com",
        user_id: "krish29"
      },
      {
        name: "Jaydeep Gupta",
        designation: "Executive Officer / AMC",
        email: 'jaydeep@gmail.com',
        user_id: "jaydeep29",
      },
      {
        name: "Prity Singh",
        designation: "Accounts Department – Accountant",
        email: 'prity@gmail.com',
        user_id: 'prity29',
      },
      {
        name: "Venu Amrutham",
        designation: "Accounts Department – Project Director",
        email: 'venuamrutham.av@gmail.com',
        user_id: "venu44",
      },
      {
        name: "Sanjiv Kumar",
        designation: "Accounts Department – Manager",
        email: 'sanjiv@gmail.com',
        user_id: "sanjiv36"
      },
      {
        name: "Bijoy Paitandi",
        designation: "Internal Auditor",
        email: 'bijoy@gmail.com',
        user_id: 'viizz29'
      }
    ];

    for(let i=0;i<fixedUsers.length;i++){
      console.log(fixedUsers[i].designation);
      await prisma.employees.create({
        data: {
          name: fixedUsers[i].name,
          email: fixedUsers[i].email,
          designation_id: await getDesignationID(fixedUsers[i].designation),
          password: hashedPass,
          user_id: fixedUsers[i].user_id,
          created_at: faker.date.past(),
          updated_at: faker.date.recent(),
      },
      });  
    }

    const file_path = "./prisma/data/sprint1/cheque_issuance.xlsx";

    readXlsxFile(file_path, { sheet: 'Payee names' }).then(async (rows) => {
        const n = rows.length;
      
        for (let i = 1; i < n; i++) {
          const user_id = 'userId'+i;
          const row = rows[i];
          await prisma.employees.create({
            data: {
                name: row[0].toString(),
                email: faker.internet.email(),
                designation_id: randomDesignation(),
                password: hashedPass,
                user_id: user_id,
                created_at: faker.date.past(),
                updated_at: faker.date.recent(),
            },
          });
        }
      });
};
export default employees_seeder;

