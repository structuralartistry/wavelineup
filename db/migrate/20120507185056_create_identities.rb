class CreateIdentities < ActiveRecord::Migration
  def change
    create_table :identities do |t|
      t.integer :practice_id
      t.integer :type_id
      t.string :last_name
      t.string :first_name
      t.string :middle_name
      t.string :company_name

      t.timestamps
    end
  end
end
