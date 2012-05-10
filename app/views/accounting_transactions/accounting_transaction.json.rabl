object @accounting_transaction
attributes :id, :date_time, :credit_debit_key, :amount, :category_key, :account_key, :note, :invoice_id, :receivable_id

node :errors do |o|
  o.errors
end
