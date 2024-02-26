// Modify the modelDetails below
module.exports =  modelDetails = {
    name: "opening_balances",
    fields: [
        {name: 'id', type: 'Int', constraint: '@id @default(autoincrement())'},
        {name: 'fin_year_id', type: 'Int'},
        {name: 'dr_cr', type: 'String'},
        {name: 'primary_acc_code_id', type: 'Int'},
        {name: 'amount', type: 'Float'},

        {name: 'created_at', type: 'DateTime', constraint: '@default(now()) @map("created_at")'},
        {name: 'updated_at', type: 'DateTime', constraint: '@updatedAt @map("updated_at")'},
    ]
};
