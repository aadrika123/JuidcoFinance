// Modify the modelDetails below
module.exports =  modelDetails = {
    name: "budget_appropriations",
    fields: [
        {name: 'id', type: 'Int', constraint: '@id @default(autoincrement())'},
        {name: 'fin_year_id', type: 'Int'},
        {name: 'primary_acc_code_id', type: 'Int'},
        {name: 'remark', type: 'String'},
        {name: 'from_primary_acc_code_id', type: 'Int'},
        {name: 'approved_amount', type: 'Int'},
        {name: 'transfer_amount', type: 'Float'},
        {name: 'created_at', type: 'DateTime', constraint: '@default(now()) @map("created_at")'},
        {name: 'updated_at', type: 'DateTime', constraint: '@updatedAt @map("updated_at")'},
    ]
};
