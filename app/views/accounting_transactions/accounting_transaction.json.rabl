object @accounting_transaction
attributes :id, :date_time, :income_expense, :amount, :category_id, :account_id, :note, :invoice_id, :receivable_id

node :errors do |o|
  o.errors
end
