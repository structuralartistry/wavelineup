class CreateOptionSelectorValues < ActiveRecord::Migration
  def change
    create_table :option_selector_options do |t|
      t.integer :option_selector_id
#      t.integer :account_id
      t.string :key
      t.string :value

      t.timestamps
    end
  end
end