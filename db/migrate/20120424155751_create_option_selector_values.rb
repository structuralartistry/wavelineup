class CreateOptionSelectorValues < ActiveRecord::Migration
  def change
    create_table :option_selector_values do |t|
      t.integer :option_selector_id
      t.string :key
      t.string :value

      t.timestamps
    end
  end
end
