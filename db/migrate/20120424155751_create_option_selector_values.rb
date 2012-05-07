class CreateOptionSelectorValues < ActiveRecord::Migration
  def change
    create_table :option_selector_options do |t|
      t.integer :option_selector_id
      t.integer :practice_id
      t.string :key
      t.string :value
      t.string :options

      t.timestamps
    end
  end
end
