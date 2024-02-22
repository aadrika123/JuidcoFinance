// Modify the modelDetails below
module.exports =  modelDetails = {
    name: "grant_entries",
    fields: [
        {name: 'id', type: 'Int', constraint: '@id @default(autoincrement())'},
        {name: 'ulb_id', type: 'Int'},
        {name: 'primary_acc_code_id', type: 'Int'},
        {name: 'grant_id', type: 'Int'},
        {name: 'sanction_number', type: 'String'},
        {name: 'grant_nature_id', type: 'Int'},
        {name: 'grant_from_date', type: 'DateTime'},
        {name: 'grant_to_date', type: 'DateTime'},
        {name: 'sanctioned_amount', type: 'Float'},
        {name: 'advance_rcving_date', type: 'DateTime'},
        {name: 'advance_amount', type: 'Float'},
        {name: 'expenditure_date', type: 'DateTime'},
        {name: 'voucher_id', type: 'Int'},
        {name: 'expndtre_nature_id', type: 'Int'},
        {name: 'blnce_trckng_id', type: 'Int'},
        {name: 'refund_date', type: 'DateTime'},
        {name: 'refund_amount', type: 'Float'},
        {name: 'employee_id', type: 'Int'},
        {name: 'signature', type: 'String'},

        {name: 'created_at', type: 'DateTime', constraint: '@default(now()) @map("created_at")'},
        {name: 'updated_at', type: 'DateTime', constraint: '@updatedAt @map("updated_at")'},
    ]
};
