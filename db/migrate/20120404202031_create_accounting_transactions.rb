class CreateAccountingTransactions < ActiveRecord::Migration
  def change
    create_table :accounting_transactions do |t|
      t.datetime :date_time
      t.integer :credit_debit_key
      t.decimal :amount, :precision => 8, :scale => 2
      t.integer :category_key
      t.integer :account_key
      t.string :note

      t.timestamps
    end
  end
end
