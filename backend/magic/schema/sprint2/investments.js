// Modify the modelDetails below
module.exports =  modelDetails = {
    name: "investments",
    fields: [
        {name: 'id', type: 'Int', constraint: '@id @default(autoincrement())'},
        {name: 'ulb_id', type: 'Int'},
        {name: 'primary_acc_code_id', type: 'Int'},
        {name: 'investment_no', type: 'String'},
        {name: 'authorization_date', type: 'DateTime'},
        {name: 'investment_date', type: 'DateTime'},
        {name: 'particulars', type: 'String'},
        {name: 'investment_type_id', type: 'Int'},
        {name: 'purchase_amount', type: 'Float'},
        {name: 'face_value_amount', type: 'Float'},
        {name: 'interest_due_date', type: "DateTime"},
        {name: 'interest_due_amount', type: 'Float'},
        {name: 'employee_id', type: 'Int'},
        {name: 'interest_recovered_amount', type: 'Float'},
        {name: 'interest_recovery_date', type: 'DateTime'},
        {name: 'acc_adj_recovery_date', type: 'DateTime'},
        {name: 'realization_final_amount', type: 'Float'},
        {name: 'realization_date', type: 'DateTime'},
        {name: 'acc_adj_realization_date', type: 'DateTime'},
        {name: 'remarks', type: 'String'},

        {name: 'created_at', type: 'DateTime', constraint: '@default(now()) @map("created_at")'},
        {name: 'updated_at', type: 'DateTime', constraint: '@updatedAt @map("updated_at")'},
    ]
};
