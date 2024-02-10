import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

const vendors_seeder = async () => {
  const number_of_vendors = 20;

  for (let i = 0; i < number_of_vendors; i++) {
    const record = {
      vendor_type_id: 1,
      vendor_no: faker.random.alphaNumeric(8),
      name: faker.person.fullName(),
      mobile_no: faker.phone.number(),
      tin_no: faker.finance.routingNumber(),
      pan_no: faker.finance.account(),
      bank_name: faker.company.name(),
      ifsc_code: faker.finance.routingNumber(),
      department_id: 1,
      email: faker.internet.email(),
      contact_address: faker.address.streetAddress(),
      gst_no: faker.finance.creditCardNumber(),
      aadhar_no: faker.finance.creditCardNumber(),
      bank_account_no: faker.finance.account(),
      bank_branch_name: faker.address.city(),
      authorized_date: null,
      is_authorized: false,
      created_at: faker.date.past(),
      updated_at: faker.date.recent(),
    };

    await prisma.vendor_masters.create({ data: record });
  }
};

export default vendors_seeder;
