class CreateAccountingTransactions < ActiveRecord::Migration
  def change
    create_table :accounting_transactions do |t|
      t.integer :practice_id
      t.datetime :date_time
      t.string :income_expense
      t.integer :amount
      t.integer :accounting_category_id
      t.integer :accounting_account_id
      t.string :note
      t.integer :invoice_id
      t.integer :receivable_id

      t.timestamps
    end
  end
end
