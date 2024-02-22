// Modify the modelDetails below
module.exports =  modelDetails = {
    name: "balance_trackings",
    fields: [
        {name: 'id', type: 'Int', constraint: '@id @default(autoincrement())'},
        {name: 'primary_acc_code_id', type: 'Int'},
        {name: 'balance_amount', type: 'Float'},


        {name: 'created_at', type: 'DateTime', constraint: '@default(now()) @map("created_at")'},
        {name: 'updated_at', type: 'DateTime', constraint: '@updatedAt @map("updated_at")'},
    ]
};
