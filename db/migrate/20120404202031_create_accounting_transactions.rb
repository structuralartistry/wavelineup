class CreateAccountingTransactions < ActiveRecord::Migration
  def change
    create_table :accounting_transactions do |t|
      t.datetime :date_time
      t.string :credit_debit_key
      t.integer :amount
      t.string :category_key
      t.string :account_key
      t.string :note

      t.timestamps
    end
  end
end
