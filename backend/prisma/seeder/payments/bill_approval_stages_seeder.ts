import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const stages = [
    {id: 1, name: "Level 1: Approved By Junior Engineer"},
    {id: 2, name: "Level 2: Approved By Manager"},
];
const bill_approval_stages_seeder = async () => {
    console.log("Seeding bill approval stages.");

    stages.forEach(async (stage) => {
        await prisma.bill_approval_stages.create({data: stage});
    });
}

export default bill_approval_stages_seeder;