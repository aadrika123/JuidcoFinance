// Modify the modelDetails below
module.exports =  modelDetails = {
    name: "revised_budgets",
    fields: [
        {name: 'id', type: 'Int', constraint: '@id @default(autoincrement())'},
        {name: 'primary_acc_code_id', type: 'Int'},
        {name: 'approved_amount', type: 'Int'},
        {name: 'revised_amount', type: 'Float'},
        {name: 'remarks', type: 'String'},

        {name: 'created_at', type: 'DateTime', constraint: '@default(now()) @map("created_at")'},
        {name: 'updated_at', type: 'DateTime', constraint: '@updatedAt @map("updated_at")'},
    ]
};
