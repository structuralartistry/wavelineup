class CreateAccountingTransactions < ActiveRecord::Migration
  def change
    create_table :accounting_transactions do |t|
      t.integer :practice_id
      t.datetime :date_time
      t.string :credit_debit_key
      t.integer :amount
      t.string :category_key
      t.string :account_key
      t.string :note
      t.integer :invoice_id
      t.integer :receivable_id

      t.timestamps
    end
  end
end
