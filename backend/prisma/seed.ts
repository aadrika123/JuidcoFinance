import {
  PrismaClient,
  cheque_book_entries,
  dir_payment_entries,
} from "@prisma/client";
import { faker } from "@faker-js/faker";
import bill_payment_entry_seed from "./seeder/bill_payment_entry_seed";
import receipt_types_seeder from "./seeder/receipt_types_seeder";
import modules_seeder from "./seeder/modules_seeder";
import receipts_seeder from "./seeder/receipts_seeder";
import voucher_types_seed from "./seeder/voucher_types_seed";
import voucher_sub_types_seed from "./seeder/voucher_sub_type_seed";
import subledgers_seeder from "./seeder/subledger_list_seeder";
import voucher_entries_seed from "./seeder/voucher_entries_seed";
import bill_types_seeder from "./seeder/bill_types_seeder";
import bill_stages_seeder from "./seeder/bill_stages_seeder";
import bill_invoices_seeder from "./seeder/bill_invoices_seeder";
import vendors_seeder from "./seeder/vendors_seeder";
import vendor_types_seeder from "./seeder/vendor_types_seeder";
import cheque_issuances_seeder from "./seeder/cheque_issuances_seeder";
import banks_seeder from "./seeder/banks_seeder";
import budget_names_seeder from "./seeder/budgeting/budget_names_seeder";
import financial_years_seeder from "./seeder/budgeting/financial_years_seeder";
import budget_types_seeder from "./seeder/budgeting/budget_types_seeder"
import budget_appropriations_seeder from "./seeder/budgeting/budget_appropriations_seeder";
import receipt_budgets_seeder from "./seeder/budgeting/receipt_budgets_seeder";
import budget_reappropriations_seeder from "./seeder/budgeting/budget_reappropriations_seeder";
import opening_balances_seeder from "./seeder/budgeting/opening_balances_seeder";
import revised_budgets_seeder from "./seeder/budgeting/revised_budgets_seeder";
import investment_types_seeder from "./seeder/budgeting/investment_types_seeder";
import investments_seeder from "./seeder/budgeting/investments_seeder";
import expenditure_natures_seeder from "./seeder/budgeting/expenditure_natures_seeder";
import grant_natures_seeder from "./seeder/budgeting/grant_natures_seeder";
import balance_trackings_seeder from "./seeder/budgeting/balance_trackings_seeder";
import grant_entries_seeder from "./seeder/budgeting/grant_entries_seeder";
import grants_seeder from "./seeder/grants_seeder";
import employees_seeder from "./seeder/employees_seeder";
import municipality_codes_seeder from "./seeder/municipality_codes_seeder";
import departments_seeder from "./seeder/departments_seeder";
import admin_wards_seeder from "./seeder/admin_wards_seeder";
import payment_types_seeder from "./seeder/payment_types_seeder";
import drcr_seeder from "./seeder/budgeting/drcr_seeder";
import account_codes_seeder from "./seeder/account_codes_seeder";
import function_codes_seeder from "./seeder/function_codes_seeder";
import loan_management_seeder from "./seeder/budgeting/loan_management_seeder";
import advance_management_seeder from "./seeder/budgeting/advance_management_seeder";
import udhd_sub_departments_seeder from "./seeder/udhd_sub_departments_seeder";
import designations_seeder from "./seeder/designation_seeder";
import receipt_register_seeder from "./seeder/masters/receipt_register_seeder";
import receipt_modes_seeder from "./seeder/masters/receipt_modes_seeder";
import revenue_modules_seeder from "./seeder/masters/revenue_modules_seeder";
import bank_types_seeder from "./seeder/masters/bank_types_seeder";
import daily_receipt_balance_seeder from "./seeder/revenueCollection/daily_receipt_balances_seeder";
import accounting_code_types_seeder from "./seeder/masters/accounting_code_types_seeder";
import foreign_wrapper from "./seeder/foreign_wrappter";
import revenue_accounted_types_seeder from "./seeder/masters/revenue_accounted_types_seeder";

const prisma = new PrismaClient();


const seed_reference_tables = async() => {
  await bank_types_seeder();
  
  await udhd_sub_departments_seeder();

  await function_codes_seeder();

  await banks_seeder();

  await bill_types_seeder();
  await vendor_types_seeder();

  await receipt_modes_seeder();

  await revenue_modules_seeder();

  await accounting_code_types_seeder();
}


const seed_level1_dependent_tables = async () => {
  await account_codes_seeder();
}

async function main() {

  // await udhd_sub_departments_seeder();

  // setTimeout(async () => {
  //   await designations_seeder();


  // },1000);

  // setTimeout(async () => {
  //   await employees_seeder();
  // }, 2000);


  // return;

  await prisma.$queryRaw`DROP TABLE users cascade`;
  await prisma.$queryRaw`DROP TABLE wf_roles cascade`;
  await prisma.$queryRaw`DROP TABLE wf_roleusermaps cascade`;

  await seed_reference_tables();

  await revenue_accounted_types_seeder();

  setTimeout(async () => {
    seed_level1_dependent_tables();
  }, 500);

  setTimeout(async () => {
    await designations_seeder();
  },1000);

  setTimeout(async () => {
    await employees_seeder();
    await grants_seeder();
    await payment_types_seeder();
    await subledgers_seeder();
    await modules_seeder();
    await budget_names_seeder();
    await expenditure_natures_seeder();
    await drcr_seeder();


    await budget_types_seeder();
    await financial_years_seeder();
    await municipality_codes_seeder();
    await investment_types_seeder();
    await grant_natures_seeder();
    await expenditure_natures_seeder();
  
  
  
    await admin_wards_seeder();
    await departments_seeder();
    await voucher_types_seed();
    await voucher_sub_types_seed();
  
  
  
    
  
    ///////////////// Vendor Types ////////////////////////
  
    ///////////////// Employee ////////////////////////
  
  
    ///////////////// cheque_book_entry ////////////////////////
    function createRandomChequeBook(): cheque_book_entries {
      return {
        id: faker.datatype.number(),
        date: faker.date.recent(),
        bank_id: 1,
        bank_account_no: faker.finance.account(),
        cheque_no_from: faker.finance.creditCardNumber(),
        user_id: faker.datatype.number(),
        bank_branch: faker.address.city(),
        page_count: faker.datatype.number(), // assuming page_count is a string
        cheque_no_to: faker.finance.creditCardNumber(),
        issuer_name: faker.person.fullName(),
        cheque_book_return: faker.datatype.boolean(),
        cheque_book_return_date: faker.date.future(),
        remarks: faker.lorem.sentence(),
        created_at: faker.date.past(),
        updated_at: faker.date.recent(),
      };
    }
  
    const chequeBooks = faker.helpers.multiple(createRandomChequeBook, {
      count: 20,
    });
  
    for (const item of chequeBooks) {
      await prisma.cheque_book_entries.create({
        data: {
          id: item.id,
          date: item.date,
          
          bank_id: item.bank_id,
  
          bank_account_no: item.bank_account_no,
          cheque_no_from: item.cheque_no_from,
          user_id: 1, //item.employee_id,
          bank_branch: item.bank_branch,
          page_count: item.page_count,
          cheque_no_to: item.cheque_no_to,
          issuer_name: item.issuer_name,
          cheque_book_return: item.cheque_book_return,
          cheque_book_return_date: item.cheque_book_return_date,
          remarks: item.remarks,
          created_at: item.created_at,
          updated_at: item.updated_at,
        },
      });
    }
  
  }, 2000);




  setTimeout(async () => {

    ///////////////// Direct Payment Entry ////////////////////////
    function createRandomDirPaymentEntry(): dir_payment_entries {
      return {
        id: faker.datatype.number(),
        payment_no: `pn${faker.datatype.number(6)}`,
        payment_date: faker.date.recent(),
        payment_type_id: 1,
        payee_name_id: 1,
        narration: faker.lorem.sentence(),
        grant_id: 1,
        user_common_budget: faker.datatype.boolean(),
        adminis_ward_id: 2,
        address: faker.address.streetAddress(),
        department_id: 1,
        payment_mode: faker.internet.email(),
        subledger_id: 1,
        amount: faker.datatype.number(),
        created_at: faker.date.past(),
        updated_at: faker.date.recent(),
      };
    }

    const paymentEntries = faker.helpers.multiple(createRandomDirPaymentEntry, {
      count: 20,
    });

    await prisma.dir_payment_entries.createMany({
      data: paymentEntries,
    });


    await vendors_seeder();

  }, 4000);


  setTimeout(async () => {

    await voucher_entries_seed();

    await bill_payment_entry_seed();

    await balance_trackings_seeder();

    await receipt_types_seeder();

    await subledgers_seeder();

    await modules_seeder();

    await receipts_seeder();

    await bill_stages_seeder();

    await bill_invoices_seeder();

    await cheque_issuances_seeder();

    await budget_appropriations_seeder();

    await receipt_budgets_seeder();

    await budget_reappropriations_seeder();

    await opening_balances_seeder();

    await revised_budgets_seeder();

    await investments_seeder();

    await grant_entries_seeder();

    await loan_management_seeder();

    await advance_management_seeder();

    await receipt_register_seeder();

    await daily_receipt_balance_seeder();
  }, 8000);

  setTimeout(async() => {
    await foreign_wrapper();
  }, 9000)


}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    // process.exit(1)
  });
