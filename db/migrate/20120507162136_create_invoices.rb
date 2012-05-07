class CreateInvoices < ActiveRecord::Migration
  def change
    create_table :invoices do |t|
      t.integer :practice_id
      t.datetime :date_time
      t.integer :identity_id
      t.string :identity_write_in
      t.integer :visit_id
      t.datetime :visit_date_time
      t.text :note

      t.timestamps
    end
  end
end
