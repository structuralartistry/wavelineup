class CreateOptionSelectorValues < ActiveRecord::Migration
  def change
    create_table :option_selector_options do |t|
      t.integer :option_selector_id
      t.integer :practice_id
      t.string :value
      t.integer :default_price

      t.timestamps
    end
  end
end
