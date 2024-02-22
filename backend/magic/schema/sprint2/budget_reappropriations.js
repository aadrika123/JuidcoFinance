// Modify the modelDetails below
module.exports =  modelDetails = {
    name: "budget_reappropriations",
    fields: [
        {name: 'id', type: 'Int', constraint: '@id @default(autoincrement())'},
        {name: 'fin_year_id', type: 'Int'},
        {name: 'primary_acc_code_id', type: 'Int'},
        {name: 'transaction_date', type:'DateTime'},
        {name: 'budget_name_id', type: 'Int'},
        {name: 'actual_amount', type: 'Float'},
        {name: 'from_primary_acc_code_id', type: 'Int'},
        {name: 'approved_amount', type: 'Int'},
        {name: 'balance_amount', type: 'Int'},
        {name: 'transfer_amount', type: 'Float'},
        

        {name: 'remark', type: 'String'},
        {name: 'created_at', type: 'DateTime', constraint: '@default(now()) @map("created_at")'},
        {name: 'updated_at', type: 'DateTime', constraint: '@updatedAt @map("updated_at")'},
    ]
};
