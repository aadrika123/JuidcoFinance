// Modify the modelDetails below
module.exports =  modelDetails = {
    name: "cheque_issuances",
    fields: [
        {name: 'id', type: 'Int', constraint: '@id @default(autoincrement())'},
        {name: 'voucher_no', type: 'Int'},
        {name: 'voucher_date', type: 'DateTime'},
        {name: 'bill_type_id', type: 'Int'},
        {name: 'narration', type: 'String'},
        {name: 'admin_ward_id', type: 'Int'},
        {name: 'payee_id', type: 'Int'},
        {name: 'grant_id', type: 'Int'},
        {name: 'bank_id', type: 'Int'},
        {name: 'module_id', type: 'Int'},
        {name: 'issue_date', type: 'DateTime'},
        {name: 'cheque_no', type: 'String'},
        {name: 'amount', type: 'Float'},

        {name: 'created_at', type: 'DateTime', constraint: '@default(now()) @map("created_at")'},
        {name: 'updated_at', type: 'DateTime', constraint: '@updatedAt @map("updated_at")'},
    ]
};
