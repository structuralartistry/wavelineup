class CreateReceivables < ActiveRecord::Migration
  def change
    create_table :receivables do |t|
      t.integer :practice_id
      t.integer :invoice_id
      t.integer :amount
      t.integer :balance_due
      t.integer :accounting_category_id
      t.integer :billing_identity_id
      t.integer :attributed_sale_identity_id

      t.timestamps
    end
  end
end
